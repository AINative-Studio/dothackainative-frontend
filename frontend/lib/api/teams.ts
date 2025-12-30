import { zeroDBClient } from '../zerodb'
import type { Team, TeamMember } from '../types'

export interface CreateTeamInput {
  hackathon_id: string
  name: string
  track_id?: string
}

export interface AddTeamMemberInput {
  team_id: string
  participant_id: string
  role: 'LEAD' | 'MEMBER'
}

export interface ListTeamsParams {
  hackathon_id?: string
  track_id?: string
  limit?: number
  offset?: number
}

export interface ListTeamMembersParams {
  team_id?: string
  participant_id?: string
  role?: 'LEAD' | 'MEMBER'
  limit?: number
  offset?: number
}

export async function createTeam(input: CreateTeamInput): Promise<Team> {
  const team: Partial<Team> = {
    team_id: crypto.randomUUID(),
    hackathon_id: input.hackathon_id,
    name: input.name,
    track_id: input.track_id
  }

  const response = await zeroDBClient.insertRows<Partial<Team>>('teams', [team])

  if (!response.success) {
    throw new Error(response.error || 'Failed to create team')
  }

  return team as Team
}

export async function addTeamMember(input: AddTeamMemberInput): Promise<TeamMember> {
  const teamMember: TeamMember = {
    team_id: input.team_id,
    participant_id: input.participant_id,
    role: input.role
  }

  const response = await zeroDBClient.insertRows<TeamMember>('team_members', [teamMember])

  if (!response.success) {
    throw new Error(response.error || 'Failed to add team member')
  }

  return teamMember
}

export async function createTeamWithMembers(
  teamInput: CreateTeamInput,
  members: Omit<AddTeamMemberInput, 'team_id'>[]
): Promise<{ team: Team; members: TeamMember[] }> {
  const team = await createTeam(teamInput)

  const teamMembers = await Promise.all(
    members.map(member => addTeamMember({ ...member, team_id: team.team_id }))
  )

  return { team, members: teamMembers }
}

export async function listTeams(params: ListTeamsParams = {}): Promise<Team[]> {
  const filter: Record<string, any> = {}

  if (params.hackathon_id) {
    filter.hackathon_id = params.hackathon_id
  }

  if (params.track_id) {
    filter.track_id = params.track_id
  }

  const response = await zeroDBClient.queryRows<Team>('teams', {
    filter: Object.keys(filter).length > 0 ? filter : undefined,
    limit: params.limit || 100,
    offset: params.offset || 0
  })

  if (!response.success) {
    throw new Error(response.error || 'Failed to list teams')
  }

  return response.rows || []
}

export async function listTeamMembers(params: ListTeamMembersParams = {}): Promise<TeamMember[]> {
  const filter: Record<string, any> = {}

  if (params.team_id) {
    filter.team_id = params.team_id
  }

  if (params.participant_id) {
    filter.participant_id = params.participant_id
  }

  if (params.role) {
    filter.role = params.role
  }

  const response = await zeroDBClient.queryRows<TeamMember>('team_members', {
    filter: Object.keys(filter).length > 0 ? filter : undefined,
    limit: params.limit || 100,
    offset: params.offset || 0
  })

  if (!response.success) {
    throw new Error(response.error || 'Failed to list team members')
  }

  return response.rows || []
}

export async function getTeamsByHackathon(hackathonId: string): Promise<Team[]> {
  return listTeams({ hackathon_id: hackathonId })
}

export async function getTeamsByTrack(hackathonId: string, trackId: string): Promise<Team[]> {
  return listTeams({ hackathon_id: hackathonId, track_id: trackId })
}

export async function getMembersByTeam(teamId: string): Promise<TeamMember[]> {
  return listTeamMembers({ team_id: teamId })
}

export async function getTeamsByParticipant(participantId: string): Promise<TeamMember[]> {
  return listTeamMembers({ participant_id: participantId })
}
