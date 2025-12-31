import {
  submitProjectWithDualWrite,
  retryEmbedding,
  cleanupOrphanedEmbedding,
  isSubmissionWorkflowError,
  type SubmissionWorkflowInput,
} from '@/lib/workflows/submission-workflow'
import * as submissionsApi from '@/lib/api/submissions'
import * as projectsApi from '@/lib/api/projects'
import * as hackathonsApi from '@/lib/api/hackathons'
import { zeroDBClient } from '@/lib/zerodb'

jest.mock('@/lib/api/submissions')
jest.mock('@/lib/api/projects')
jest.mock('@/lib/api/hackathons')
jest.mock('@/lib/zerodb', () => ({
  zeroDBClient: {
    embedAndStore: jest.fn(),
    insertRows: jest.fn(),
    queryRows: jest.fn(),
    search: jest.fn(),
  },
}))
jest.mock('@/lib/embeddings-namespace', () => ({
  EmbeddingNamespace: {
    submissions: (id: string) => `hackathons/${id}/submissions`,
    projects: (id: string) => `hackathons/${id}/projects`,
    judging: (id: string) => `hackathons/${id}/judging`,
  },
  DocumentId: {
    submission: (id: string) => `submission:${id}`,
    project: (id: string) => `project:${id}`,
  },
  validateNamespace: jest.fn(),
  validateDocumentId: jest.fn(),
  validateUUID: jest.fn(),
  parseNamespace: jest.fn(),
  parseDocumentId: jest.fn(),
}))

describe('submission-workflow', () => {
  const mockInput: SubmissionWorkflowInput = {
    hackathonId: '123e4567-e89b-12d3-a456-426614174000',
    projectId: 'a1b2c3d4-e5f6-4789-a9b0-c1d2e3f4a5b6',
    teamId: 'b2c3d4e5-f6a7-4819-a0b1-c2d3e4f5a6b7',
    submissionText: 'Test submission',
    artifactLinks: ['https://github.com/test/repo'],
  }

  const mockSubmission = {
    submission_id: 'sub-123',
    project_id: mockInput.projectId,
    submission_text: mockInput.submissionText,
    artifact_links_json: JSON.stringify(mockInput.artifactLinks),
    created_at: '2025-12-31T00:00:00Z',
  }

  const mockHackathon = {
    hackathon_id: mockInput.hackathonId,
    name: 'Test Hackathon',
    status: 'LIVE' as const,
    start_at: '2025-12-01T00:00:00Z',
    end_at: '2025-12-31T23:59:59Z',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('submitProjectWithDualWrite', () => {
    it('successfully completes dual-write workflow', async () => {
      jest.spyOn(hackathonsApi, 'getHackathonById').mockResolvedValue(mockHackathon)
      jest.spyOn(submissionsApi, 'createSubmission').mockResolvedValue(mockSubmission)
      jest.spyOn(zeroDBClient, 'embedAndStore').mockResolvedValue({ success: true })
      jest.spyOn(projectsApi, 'updateProject').mockResolvedValue({
        project_id: mockInput.projectId,
        status: 'SUBMITTED',
      } as any)

      const result = await submitProjectWithDualWrite(mockInput)

      expect(result.submission).toEqual(mockSubmission)
      expect(result.embeddingStored).toBe(true)
      expect(hackathonsApi.getHackathonById).toHaveBeenCalledWith(mockInput.hackathonId)
      expect(submissionsApi.createSubmission).toHaveBeenCalled()
      expect(zeroDBClient.embedAndStore).toHaveBeenCalled()
      expect(projectsApi.updateProject).toHaveBeenCalledWith({
        project_id: mockInput.projectId,
        status: 'SUBMITTED',
      })
    })

    it('throws validation error when hackathon not found', async () => {
      jest.spyOn(hackathonsApi, 'getHackathonById').mockResolvedValue(null)

      await expect(submitProjectWithDualWrite(mockInput)).rejects.toMatchObject({
        name: 'SubmissionWorkflowError',
        phase: 'validation',
        message: 'Hackathon not found',
        canRetry: false,
      })

      expect(submissionsApi.createSubmission).not.toHaveBeenCalled()
    })

    it('throws validation error when hackathon is CLOSED', async () => {
      jest.spyOn(hackathonsApi, 'getHackathonById').mockResolvedValue({
        ...mockHackathon,
        status: 'CLOSED',
      })

      await expect(submitProjectWithDualWrite(mockInput)).rejects.toMatchObject({
        name: 'SubmissionWorkflowError',
        phase: 'validation',
        message: 'Cannot submit to a closed hackathon',
        canRetry: false,
      })

      expect(submissionsApi.createSubmission).not.toHaveBeenCalled()
    })

    it('throws error when submission creation fails', async () => {
      jest.spyOn(hackathonsApi, 'getHackathonById').mockResolvedValue(mockHackathon)
      jest
        .spyOn(submissionsApi, 'createSubmission')
        .mockRejectedValue(new Error('Database error'))

      await expect(submitProjectWithDualWrite(mockInput)).rejects.toMatchObject({
        name: 'SubmissionWorkflowError',
        phase: 'submission_create',
        canRetry: true,
      })

      expect(zeroDBClient.embedAndStore).not.toHaveBeenCalled()
    })

    it('throws error with submission ID when embedding fails', async () => {
      jest.spyOn(hackathonsApi, 'getHackathonById').mockResolvedValue(mockHackathon)
      jest.spyOn(submissionsApi, 'createSubmission').mockResolvedValue(mockSubmission)
      jest.spyOn(zeroDBClient, 'embedAndStore').mockRejectedValue(new Error('Embedding failed'))

      await expect(submitProjectWithDualWrite(mockInput)).rejects.toMatchObject({
        name: 'SubmissionWorkflowError',
        phase: 'embedding',
        canRetry: true,
        submissionId: mockSubmission.submission_id,
      })

      expect(projectsApi.updateProject).not.toHaveBeenCalled()
    })

    it('throws error when project update fails', async () => {
      jest.spyOn(hackathonsApi, 'getHackathonById').mockResolvedValue(mockHackathon)
      jest.spyOn(submissionsApi, 'createSubmission').mockResolvedValue(mockSubmission)
      jest.spyOn(zeroDBClient, 'embedAndStore').mockResolvedValue({ success: true })
      jest.spyOn(projectsApi, 'updateProject').mockRejectedValue(new Error('Update failed'))

      await expect(submitProjectWithDualWrite(mockInput)).rejects.toMatchObject({
        name: 'SubmissionWorkflowError',
        phase: 'project_update',
        canRetry: true,
        submissionId: mockSubmission.submission_id,
      })
    })

    it('uses correct namespace and document ID format', async () => {
      jest.spyOn(hackathonsApi, 'getHackathonById').mockResolvedValue(mockHackathon)
      jest.spyOn(submissionsApi, 'createSubmission').mockResolvedValue(mockSubmission)
      jest.spyOn(zeroDBClient, 'embedAndStore').mockResolvedValue({ success: true })
      jest.spyOn(projectsApi, 'updateProject').mockResolvedValue({} as any)

      await submitProjectWithDualWrite(mockInput)

      expect(zeroDBClient.embedAndStore).toHaveBeenCalledWith({
        documents: [
          {
            id: `submission:${mockSubmission.submission_id}`,
            text: mockInput.submissionText,
            metadata: expect.objectContaining({
              hackathon_id: mockInput.hackathonId,
              project_id: mockInput.projectId,
              team_id: mockInput.teamId,
              submission_id: mockSubmission.submission_id,
            }),
          },
        ],
        namespace: `hackathons/${mockInput.hackathonId}/submissions`,
      })
    })
  })

  describe('retryEmbedding', () => {
    it('successfully retries embedding with correct parameters', async () => {
      jest.spyOn(zeroDBClient, 'embedAndStore').mockResolvedValue({ success: true })

      await retryEmbedding(
        'sub-123',
        mockInput.hackathonId,
        mockInput.projectId,
        mockInput.teamId,
        mockInput.submissionText
      )

      expect(zeroDBClient.embedAndStore).toHaveBeenCalledWith({
        documents: [
          {
            id: 'submission:sub-123',
            text: mockInput.submissionText,
            metadata: expect.objectContaining({
              hackathon_id: mockInput.hackathonId,
              project_id: mockInput.projectId,
              team_id: mockInput.teamId,
              submission_id: 'sub-123',
            }),
          },
        ],
        namespace: `hackathons/${mockInput.hackathonId}/submissions`,
      })
    })

    it('throws APIError when retry fails', async () => {
      jest.spyOn(zeroDBClient, 'embedAndStore').mockRejectedValue(new Error('Retry failed'))

      await expect(
        retryEmbedding(
          'sub-123',
          mockInput.hackathonId,
          mockInput.projectId,
          mockInput.teamId,
          mockInput.submissionText
        )
      ).rejects.toThrow('Failed to retry embedding')
    })
  })

  describe('cleanupOrphanedEmbedding', () => {
    it('logs warning about manual cleanup', async () => {
      const consoleWarn = jest.spyOn(console, 'warn').mockImplementation()

      await cleanupOrphanedEmbedding('sub-123', mockInput.hackathonId)

      expect(consoleWarn).toHaveBeenCalledWith(
        expect.stringContaining('Orphaned embedding cleanup not implemented')
      )

      consoleWarn.mockRestore()
    })
  })

  describe('isSubmissionWorkflowError', () => {
    it('returns true for SubmissionWorkflowError', () => {
      const error = new Error('Test') as any
      error.name = 'SubmissionWorkflowError'
      error.phase = 'validation'
      error.canRetry = false

      expect(isSubmissionWorkflowError(error)).toBe(true)
    })

    it('returns false for regular Error', () => {
      const error = new Error('Test')
      expect(isSubmissionWorkflowError(error)).toBe(false)
    })

    it('returns false for non-Error values', () => {
      expect(isSubmissionWorkflowError('string')).toBe(false)
      expect(isSubmissionWorkflowError(null)).toBe(false)
      expect(isSubmissionWorkflowError(undefined)).toBe(false)
    })
  })
})
