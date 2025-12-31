import {
  createTeamWithProject,
  addMemberToExistingTeam,
  isTeamFormationError,
  type TeamFormationInput,
} from '@/lib/workflows/team-formation'
import * as participantsApi from '@/lib/api/participants'
import * as teamsApi from '@/lib/api/teams'
import * as projectsApi from '@/lib/api/projects'

jest.mock('@/lib/api/participants')
jest.mock('@/lib/api/teams')
jest.mock('@/lib/api/projects')

describe('team-formation', () => {
  const mockParticipant = {
    participant_id: 'participant-123',
    name: 'John Doe',
    email: 'john@example.com',
  }

  const mockEnrollment = {
    hackathon_id: 'hackathon-123',
    participant_id: 'participant-123',
    role: 'BUILDER' as const,
  }

  const mockTeam = {
    team_id: 'team-123',
    hackathon_id: 'hackathon-123',
    name: 'Test Team',
    track_id: 'track-123',
  }

  const mockTeamMembers = [
    {
      team_member_id: 'member-1',
      team_id: 'team-123',
      participant_id: 'participant-123',
      role: 'LEAD' as const,
    },
    {
      team_member_id: 'member-2',
      team_id: 'team-123',
      participant_id: 'participant-456',
      role: 'MEMBER' as const,
    },
  ]

  const mockProject = {
    project_id: 'project-123',
    hackathon_id: 'hackathon-123',
    team_id: 'team-123',
    title: 'Test Project',
    status: 'DRAFT' as const,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('createTeamWithProject', () => {
    const validInput: TeamFormationInput = {
      hackathonId: 'hackathon-123',
      participant: {
        name: 'John Doe',
        email: 'john@example.com',
      },
      role: 'BUILDER',
      team: {
        name: 'Test Team',
      },
      project: {
        title: 'Test Project',
        description: 'Test Description',
      },
      trackId: 'track-123',
      additionalMembers: [
        {
          participantId: 'participant-456',
          role: 'MEMBER',
        },
      ],
    }

    it('successfully creates team with project for new participant', async () => {
      jest.spyOn(participantsApi, 'createParticipant').mockResolvedValue(mockParticipant)
      jest.spyOn(participantsApi, 'enrollParticipant').mockResolvedValue(mockEnrollment)
      jest.spyOn(teamsApi, 'createTeam').mockResolvedValue(mockTeam)
      jest
        .spyOn(teamsApi, 'addTeamMember')
        .mockResolvedValueOnce(mockTeamMembers[0])
        .mockResolvedValueOnce(mockTeamMembers[1])
      jest.spyOn(projectsApi, 'createProject').mockResolvedValue(mockProject)

      const result = await createTeamWithProject(validInput)

      expect(result.participant).toEqual(mockParticipant)
      expect(result.enrollment).toEqual(mockEnrollment)
      expect(result.team).toEqual(mockTeam)
      expect(result.teamMembers).toEqual(mockTeamMembers)
      expect(result.project).toEqual(mockProject)

      expect(participantsApi.createParticipant).toHaveBeenCalled()
      expect(participantsApi.enrollParticipant).toHaveBeenCalledWith({
        hackathon_id: 'hackathon-123',
        participant_id: 'participant-123',
        role: 'BUILDER',
      })
      expect(teamsApi.createTeam).toHaveBeenCalledWith({
        name: 'Test Team',
        hackathon_id: 'hackathon-123',
        track_id: 'track-123',
      })
      expect(teamsApi.addTeamMember).toHaveBeenCalledTimes(2)
      expect(projectsApi.createProject).toHaveBeenCalledWith({
        title: 'Test Project',
        description: 'Test Description',
        hackathon_id: 'hackathon-123',
        team_id: 'team-123',
        status: 'DRAFT',
      })
    })

    it('throws validation error when participant email is empty', async () => {
      const input: TeamFormationInput = {
        ...validInput,
        participant: { ...validInput.participant, email: '' },
      }

      await expect(createTeamWithProject(input)).rejects.toMatchObject({
        name: 'TeamFormationError',
        phase: 'validation',
        message: 'Participant email is required',
        canRetry: false,
      })

      expect(participantsApi.createParticipant).not.toHaveBeenCalled()
    })

    it('throws validation error when participant name is empty', async () => {
      const input: TeamFormationInput = {
        ...validInput,
        participant: { ...validInput.participant, name: '' },
      }

      await expect(createTeamWithProject(input)).rejects.toMatchObject({
        name: 'TeamFormationError',
        phase: 'validation',
        message: 'Participant name is required',
        canRetry: false,
      })

      expect(participantsApi.createParticipant).not.toHaveBeenCalled()
    })

    it('throws validation error when team name is empty', async () => {
      const input: TeamFormationInput = {
        ...validInput,
        team: { name: '' },
      }

      await expect(createTeamWithProject(input)).rejects.toMatchObject({
        name: 'TeamFormationError',
        phase: 'validation',
        message: 'Team name is required',
        canRetry: false,
      })
    })

    it('throws validation error when project title is empty', async () => {
      const input: TeamFormationInput = {
        ...validInput,
        project: { ...validInput.project, title: '' },
      }

      await expect(createTeamWithProject(input)).rejects.toMatchObject({
        name: 'TeamFormationError',
        phase: 'validation',
        message: 'Project title is required',
        canRetry: false,
      })
    })

    it('throws error when participant creation fails', async () => {
      jest.spyOn(participantsApi, 'createParticipant').mockRejectedValue(new Error('DB error'))

      await expect(createTeamWithProject(validInput)).rejects.toMatchObject({
        name: 'TeamFormationError',
        phase: 'participant_create',
        canRetry: true,
      })

      expect(participantsApi.enrollParticipant).not.toHaveBeenCalled()
    })

    it('throws error with participant ID when enrollment fails', async () => {
      jest.spyOn(participantsApi, 'createParticipant').mockResolvedValue(mockParticipant)
      jest
        .spyOn(participantsApi, 'enrollParticipant')
        .mockRejectedValue(new Error('Enrollment failed'))

      await expect(createTeamWithProject(validInput)).rejects.toMatchObject({
        name: 'TeamFormationError',
        phase: 'enrollment',
        canRetry: true,
        participantId: 'participant-123',
      })

      expect(teamsApi.createTeam).not.toHaveBeenCalled()
    })

    it('throws error with participant ID when team creation fails', async () => {
      jest.spyOn(participantsApi, 'createParticipant').mockResolvedValue(mockParticipant)
      jest.spyOn(participantsApi, 'enrollParticipant').mockResolvedValue(mockEnrollment)
      jest.spyOn(teamsApi, 'createTeam').mockRejectedValue(new Error('Team creation failed'))

      await expect(createTeamWithProject(validInput)).rejects.toMatchObject({
        name: 'TeamFormationError',
        phase: 'team_create',
        canRetry: true,
        participantId: 'participant-123',
      })

      expect(teamsApi.addTeamMember).not.toHaveBeenCalled()
    })

    it('throws error when adding team members fails', async () => {
      jest.spyOn(participantsApi, 'createParticipant').mockResolvedValue(mockParticipant)
      jest.spyOn(participantsApi, 'enrollParticipant').mockResolvedValue(mockEnrollment)
      jest.spyOn(teamsApi, 'createTeam').mockResolvedValue(mockTeam)
      jest
        .spyOn(teamsApi, 'addTeamMember')
        .mockResolvedValueOnce(mockTeamMembers[0])
        .mockRejectedValueOnce(new Error('Add member failed'))

      await expect(createTeamWithProject(validInput)).rejects.toMatchObject({
        name: 'TeamFormationError',
        phase: 'members_add',
        canRetry: true,
        teamId: 'team-123',
        createdMembers: [mockTeamMembers[0]],
      })

      expect(projectsApi.createProject).not.toHaveBeenCalled()
    })

    it('throws error when project creation fails', async () => {
      jest.spyOn(participantsApi, 'createParticipant').mockResolvedValue(mockParticipant)
      jest.spyOn(participantsApi, 'enrollParticipant').mockResolvedValue(mockEnrollment)
      jest.spyOn(teamsApi, 'createTeam').mockResolvedValue(mockTeam)
      jest
        .spyOn(teamsApi, 'addTeamMember')
        .mockResolvedValueOnce(mockTeamMembers[0])
        .mockResolvedValueOnce(mockTeamMembers[1])
      jest.spyOn(projectsApi, 'createProject').mockRejectedValue(new Error('Project failed'))

      await expect(createTeamWithProject(validInput)).rejects.toMatchObject({
        name: 'TeamFormationError',
        phase: 'project_create',
        canRetry: true,
        teamId: 'team-123',
        createdMembers: mockTeamMembers,
      })
    })
  })

  describe('addMemberToExistingTeam', () => {
    it('successfully adds member to team', async () => {
      jest.spyOn(teamsApi, 'addTeamMember').mockResolvedValue(mockTeamMembers[1])

      const result = await addMemberToExistingTeam('team-123', 'participant-456', 'MEMBER')

      expect(result).toEqual(mockTeamMembers[1])
      expect(teamsApi.addTeamMember).toHaveBeenCalledWith({
        team_id: 'team-123',
        participant_id: 'participant-456',
        role: 'MEMBER',
      })
    })

    it('defaults to MEMBER role when not specified', async () => {
      jest.spyOn(teamsApi, 'addTeamMember').mockResolvedValue(mockTeamMembers[1])

      await addMemberToExistingTeam('team-123', 'participant-456')

      expect(teamsApi.addTeamMember).toHaveBeenCalledWith({
        team_id: 'team-123',
        participant_id: 'participant-456',
        role: 'MEMBER',
      })
    })

    it('throws APIError when add member fails', async () => {
      jest.spyOn(teamsApi, 'addTeamMember').mockRejectedValue(new Error('Add failed'))

      await expect(addMemberToExistingTeam('team-123', 'participant-456')).rejects.toThrow(
        'Failed to add member to team'
      )
    })
  })

  describe('isTeamFormationError', () => {
    it('returns true for TeamFormationError', () => {
      const error = new Error('Test') as any
      error.name = 'TeamFormationError'
      error.phase = 'validation'
      error.canRetry = false

      expect(isTeamFormationError(error)).toBe(true)
    })

    it('returns false for regular Error', () => {
      const error = new Error('Test')
      expect(isTeamFormationError(error)).toBe(false)
    })

    it('returns false for non-Error values', () => {
      expect(isTeamFormationError('string')).toBe(false)
      expect(isTeamFormationError(null)).toBe(false)
      expect(isTeamFormationError(undefined)).toBe(false)
    })
  })
})
