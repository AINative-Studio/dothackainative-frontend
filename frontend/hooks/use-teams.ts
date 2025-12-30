import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Team, TeamMember } from '../lib/types'
import {
  createTeam,
  addTeamMember,
  createTeamWithMembers,
  listTeams,
  listTeamMembers,
  getTeamsByHackathon,
  getTeamsByTrack,
  getMembersByTeam,
  getTeamsByParticipant,
  type CreateTeamInput,
  type AddTeamMemberInput,
  type ListTeamsParams,
  type ListTeamMembersParams
} from '../lib/api/teams'

export const TEAMS_QUERY_KEY = 'teams'
export const TEAM_MEMBERS_QUERY_KEY = 'team_members'

export function useTeams(params: ListTeamsParams = {}) {
  return useQuery({
    queryKey: [TEAMS_QUERY_KEY, params],
    queryFn: () => listTeams(params)
  })
}

export function useTeamsByHackathon(hackathonId: string) {
  return useQuery({
    queryKey: [TEAMS_QUERY_KEY, { hackathon_id: hackathonId }],
    queryFn: () => getTeamsByHackathon(hackathonId),
    enabled: !!hackathonId
  })
}

export function useTeamsByTrack(hackathonId: string, trackId: string) {
  return useQuery({
    queryKey: [TEAMS_QUERY_KEY, { hackathon_id: hackathonId, track_id: trackId }],
    queryFn: () => getTeamsByTrack(hackathonId, trackId),
    enabled: !!hackathonId && !!trackId
  })
}

export function useTeamMembers(params: ListTeamMembersParams = {}) {
  return useQuery({
    queryKey: [TEAM_MEMBERS_QUERY_KEY, params],
    queryFn: () => listTeamMembers(params)
  })
}

export function useMembersByTeam(teamId: string) {
  return useQuery({
    queryKey: [TEAM_MEMBERS_QUERY_KEY, { team_id: teamId }],
    queryFn: () => getMembersByTeam(teamId),
    enabled: !!teamId
  })
}

export function useTeamsByParticipant(participantId: string) {
  return useQuery({
    queryKey: [TEAM_MEMBERS_QUERY_KEY, { participant_id: participantId }],
    queryFn: () => getTeamsByParticipant(participantId),
    enabled: !!participantId
  })
}

export function useCreateTeam() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateTeamInput) => createTeam(input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [TEAMS_QUERY_KEY] })
      queryClient.invalidateQueries({
        queryKey: [TEAMS_QUERY_KEY, { hackathon_id: data.hackathon_id }]
      })
    }
  })
}

export function useAddTeamMember() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: AddTeamMemberInput) => addTeamMember(input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [TEAM_MEMBERS_QUERY_KEY] })
      queryClient.invalidateQueries({
        queryKey: [TEAM_MEMBERS_QUERY_KEY, { team_id: data.team_id }]
      })
      queryClient.invalidateQueries({
        queryKey: [TEAM_MEMBERS_QUERY_KEY, { participant_id: data.participant_id }]
      })
    }
  })
}

export function useCreateTeamWithMembers() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: {
      team: CreateTeamInput
      members: Omit<AddTeamMemberInput, 'team_id'>[]
    }) => createTeamWithMembers(input.team, input.members),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [TEAMS_QUERY_KEY] })
      queryClient.invalidateQueries({
        queryKey: [TEAMS_QUERY_KEY, { hackathon_id: data.team.hackathon_id }]
      })
      queryClient.invalidateQueries({ queryKey: [TEAM_MEMBERS_QUERY_KEY] })
      queryClient.invalidateQueries({
        queryKey: [TEAM_MEMBERS_QUERY_KEY, { team_id: data.team.team_id }]
      })
    }
  })
}
