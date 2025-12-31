import {
  createParticipant,
  enrollParticipant,
  type CreateParticipantInput,
  type EnrollParticipantInput,
  type Participant,
  type HackathonParticipant,
} from '@/lib/api/participants'
import {
  createTeam,
  addTeamMember,
  type CreateTeamInput,
  type AddTeamMemberInput,
  type Team,
  type TeamMember,
} from '@/lib/api/teams'
import { createProject, type CreateProjectInput, type Project } from '@/lib/api/projects'
import { APIError } from '@/lib/error-handling'

export interface TeamFormationInput {
  hackathonId: string
  participant: CreateParticipantInput
  role: 'BUILDER' | 'JUDGE' | 'MENTOR' | 'ORGANIZER' | 'SPONSOR'
  team: Omit<CreateTeamInput, 'hackathon_id'>
  additionalMembers?: Array<{
    participantId: string
    role: 'MEMBER' | 'LEAD'
  }>
  project: Omit<CreateProjectInput, 'hackathon_id' | 'team_id'>
  trackId?: string
}

export interface TeamFormationResult {
  participant: Participant
  enrollment: HackathonParticipant
  team: Team
  teamMembers: TeamMember[]
  project: Project
}

export interface TeamFormationError extends Error {
  phase:
    | 'validation'
    | 'participant_create'
    | 'enrollment'
    | 'team_create'
    | 'members_add'
    | 'project_create'
  participantId?: string
  teamId?: string
  createdMembers?: TeamMember[]
  canRetry: boolean
}

export async function createTeamWithProject(
  input: TeamFormationInput
): Promise<TeamFormationResult> {
  const {
    hackathonId,
    participant: participantInput,
    role,
    team: teamInput,
    additionalMembers = [],
    project: projectInput,
    trackId,
  } = input

  if (!participantInput.email?.trim()) {
    throw createFormationError('validation', 'Participant email is required', false)
  }

  if (!participantInput.name?.trim()) {
    throw createFormationError('validation', 'Participant name is required', false)
  }

  if (!teamInput.name?.trim()) {
    throw createFormationError('validation', 'Team name is required', false)
  }

  if (!projectInput.title?.trim()) {
    throw createFormationError('validation', 'Project title is required', false)
  }

  let participant: Participant

  try {
    participant = await createParticipant(participantInput)
  } catch (error) {
    throw createFormationError(
      'participant_create',
      `Failed to create participant: ${error instanceof Error ? error.message : 'Unknown error'}`,
      true
    )
  }

  let enrollment: HackathonParticipant

  try {
    enrollment = await enrollParticipant({
      hackathon_id: hackathonId,
      participant_id: participant.participant_id,
      role,
    })
  } catch (error) {
    throw createFormationError(
      'enrollment',
      `Failed to enroll participant: ${error instanceof Error ? error.message : 'Unknown error'}`,
      true,
      participant.participant_id
    )
  }

  let team: Team

  try {
    team = await createTeam({
      ...teamInput,
      hackathon_id: hackathonId,
      track_id: trackId,
    })
  } catch (error) {
    throw createFormationError(
      'team_create',
      `Failed to create team: ${error instanceof Error ? error.message : 'Unknown error'}`,
      true,
      participant.participant_id
    )
  }

  const teamMembers: TeamMember[] = []

  try {
    const leadMember = await addTeamMember({
      team_id: team.team_id,
      participant_id: participant.participant_id,
      role: 'LEAD',
    })
    teamMembers.push(leadMember)

    for (const member of additionalMembers) {
      const teamMember = await addTeamMember({
        team_id: team.team_id,
        participant_id: member.participantId,
        role: member.role,
      })
      teamMembers.push(teamMember)
    }
  } catch (error) {
    throw createFormationError(
      'members_add',
      `Failed to add team members: ${error instanceof Error ? error.message : 'Unknown error'}`,
      true,
      participant.participant_id,
      team.team_id,
      teamMembers
    )
  }

  let project: Project

  try {
    project = await createProject({
      ...projectInput,
      hackathon_id: hackathonId,
      team_id: team.team_id,
      status: 'DRAFT',
    })
  } catch (error) {
    throw createFormationError(
      'project_create',
      `Failed to create project: ${error instanceof Error ? error.message : 'Unknown error'}`,
      true,
      participant.participant_id,
      team.team_id,
      teamMembers
    )
  }

  return {
    participant,
    enrollment,
    team,
    teamMembers,
    project,
  }
}

export async function addMemberToExistingTeam(
  teamId: string,
  participantId: string,
  role: 'MEMBER' | 'LEAD' = 'MEMBER'
): Promise<TeamMember> {
  try {
    return await addTeamMember({
      team_id: teamId,
      participant_id: participantId,
      role,
    })
  } catch (error) {
    throw new APIError(
      `Failed to add member to team: ${error instanceof Error ? error.message : 'Unknown error'}`,
      500
    )
  }
}

function createFormationError(
  phase: TeamFormationError['phase'],
  message: string,
  canRetry: boolean,
  participantId?: string,
  teamId?: string,
  createdMembers?: TeamMember[]
): TeamFormationError {
  const error = new Error(message) as TeamFormationError
  error.name = 'TeamFormationError'
  error.phase = phase
  error.canRetry = canRetry
  error.participantId = participantId
  error.teamId = teamId
  error.createdMembers = createdMembers
  return error
}

export function isTeamFormationError(error: unknown): error is TeamFormationError {
  return error instanceof Error && error.name === 'TeamFormationError'
}
