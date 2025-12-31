import { createSubmission, type CreateSubmissionInput, type Submission } from '@/lib/api/submissions'
import { updateProject } from '@/lib/api/projects'
import { getHackathonById } from '@/lib/api/hackathons'
import { EmbeddingNamespace, DocumentId } from '@/lib/embeddings-namespace'
import { zeroDBClient } from '@/lib/zerodb'
import { APIError } from '@/lib/error-handling'

export interface SubmissionWorkflowInput {
  hackathonId: string
  projectId: string
  teamId: string
  submissionText: string
  artifactLinks: string[]
}

export interface SubmissionWorkflowResult {
  submission: Submission
  embeddingStored: boolean
}

export interface SubmissionWorkflowError extends Error {
  phase: 'validation' | 'submission_create' | 'embedding' | 'project_update'
  submissionId?: string
  canRetry: boolean
}

export async function submitProjectWithDualWrite(
  input: SubmissionWorkflowInput
): Promise<SubmissionWorkflowResult> {
  const { hackathonId, projectId, teamId, submissionText, artifactLinks } = input

  try {
    const hackathon = await getHackathonById(hackathonId)
    if (!hackathon) {
      throw createWorkflowError(
        'validation',
        'Hackathon not found',
        false
      )
    }

    if (hackathon.status === 'CLOSED') {
      throw createWorkflowError(
        'validation',
        'Cannot submit to a closed hackathon',
        false
      )
    }
  } catch (error) {
    if (error instanceof Error && error.name === 'SubmissionWorkflowError') {
      throw error
    }
    throw createWorkflowError(
      'validation',
      `Failed to validate hackathon status: ${error instanceof Error ? error.message : 'Unknown error'}`,
      true
    )
  }

  let submission: Submission | null = null

  try {
    const submissionInput: CreateSubmissionInput = {
      project_id: projectId,
      submission_text: submissionText,
      artifact_links_json: JSON.stringify(artifactLinks),
    }

    submission = await createSubmission(submissionInput)
  } catch (error) {
    throw createWorkflowError(
      'submission_create',
      `Failed to create submission row: ${error instanceof Error ? error.message : 'Unknown error'}`,
      true
    )
  }

  let embeddingStored = false

  try {
    const namespace = EmbeddingNamespace.submissions(hackathonId)
    const documentId = DocumentId.submission(submission.submission_id)

    const embeddingResponse = await zeroDBClient.embedAndStore({
      documents: [
        {
          id: documentId,
          text: submissionText,
          metadata: {
            hackathon_id: hackathonId,
            project_id: projectId,
            team_id: teamId,
            submission_id: submission.submission_id,
            submitted_at: submission.created_at,
          },
        },
      ],
      namespace,
    })

    if (!embeddingResponse.success) {
      throw new Error(embeddingResponse.error || 'Unknown embedding error')
    }

    embeddingStored = true
  } catch (error) {
    const workflowError = createWorkflowError(
      'embedding',
      `Submission created but embedding failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      true,
      submission.submission_id
    )
    throw workflowError
  }

  try {
    await updateProject({
      project_id: projectId,
      status: 'SUBMITTED',
    })
  } catch (error) {
    throw createWorkflowError(
      'project_update',
      `Submission and embedding stored, but project status update failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      true,
      submission.submission_id
    )
  }

  return {
    submission,
    embeddingStored,
  }
}

export async function retryEmbedding(
  submissionId: string,
  hackathonId: string,
  projectId: string,
  teamId: string,
  submissionText: string
): Promise<void> {
  try {
    const namespace = EmbeddingNamespace.submissions(hackathonId)
    const documentId = DocumentId.submission(submissionId)

    const response = await zeroDBClient.embedAndStore({
      documents: [
        {
          id: documentId,
          text: submissionText,
          metadata: {
            hackathon_id: hackathonId,
            project_id: projectId,
            team_id: teamId,
            submission_id: submissionId,
            submitted_at: new Date().toISOString(),
          },
        },
      ],
      namespace,
    })

    if (!response.success) {
      throw new Error(response.error || 'Unknown error')
    }
  } catch (error) {
    throw new APIError(
      `Failed to retry embedding: ${error instanceof Error ? error.message : 'Unknown error'}`,
      500
    )
  }
}

export async function cleanupOrphanedEmbedding(
  submissionId: string,
  hackathonId: string
): Promise<void> {
  console.warn(
    `Orphaned embedding cleanup not implemented for submission ${submissionId} in hackathon ${hackathonId}. Manual cleanup may be required.`
  )
}

function createWorkflowError(
  phase: SubmissionWorkflowError['phase'],
  message: string,
  canRetry: boolean,
  submissionId?: string
): SubmissionWorkflowError {
  const error = new Error(message) as SubmissionWorkflowError
  error.name = 'SubmissionWorkflowError'
  error.phase = phase
  error.canRetry = canRetry
  error.submissionId = submissionId
  return error
}

export function isSubmissionWorkflowError(error: unknown): error is SubmissionWorkflowError {
  return error instanceof Error && error.name === 'SubmissionWorkflowError'
}
