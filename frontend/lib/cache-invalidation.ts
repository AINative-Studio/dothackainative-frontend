import { QueryClient } from '@tanstack/react-query'
import { QueryKeys } from './query-keys'

export function invalidateAfterHackathonCreate(queryClient: QueryClient): void {
  queryClient.invalidateQueries({ queryKey: QueryKeys.hackathons.all })
}

export function invalidateAfterHackathonUpdate(
  queryClient: QueryClient,
  hackathonId: string
): void {
  queryClient.invalidateQueries({ queryKey: QueryKeys.hackathons.all })
  queryClient.invalidateQueries({ queryKey: QueryKeys.hackathons.detail(hackathonId) })
}

export function invalidateAfterHackathonDelete(
  queryClient: QueryClient,
  hackathonId: string
): void {
  queryClient.invalidateQueries({ queryKey: QueryKeys.hackathons.all })
  queryClient.removeQueries({ queryKey: QueryKeys.hackathons.detail(hackathonId) })
}

export function invalidateAfterTrackCreate(
  queryClient: QueryClient,
  hackathonId: string
): void {
  queryClient.invalidateQueries({ queryKey: QueryKeys.tracks.all(hackathonId) })
}

export function invalidateAfterTrackUpdate(
  queryClient: QueryClient,
  hackathonId: string,
  trackId: string
): void {
  queryClient.invalidateQueries({ queryKey: QueryKeys.tracks.all(hackathonId) })
  queryClient.invalidateQueries({ queryKey: QueryKeys.tracks.detail(trackId) })
}

export function invalidateAfterTrackDelete(
  queryClient: QueryClient,
  hackathonId: string,
  trackId: string
): void {
  queryClient.invalidateQueries({ queryKey: QueryKeys.tracks.all(hackathonId) })
  queryClient.removeQueries({ queryKey: QueryKeys.tracks.detail(trackId) })
}

export function invalidateAfterParticipantEnroll(
  queryClient: QueryClient,
  hackathonId: string
): void {
  queryClient.invalidateQueries({ queryKey: QueryKeys.participants.all(hackathonId) })
}

export function invalidateAfterTeamCreate(
  queryClient: QueryClient,
  hackathonId: string
): void {
  queryClient.invalidateQueries({ queryKey: QueryKeys.teams.all(hackathonId) })
}

export function invalidateAfterTeamUpdate(
  queryClient: QueryClient,
  hackathonId: string,
  teamId: string
): void {
  queryClient.invalidateQueries({ queryKey: QueryKeys.teams.all(hackathonId) })
  queryClient.invalidateQueries({ queryKey: QueryKeys.teams.detail(teamId) })
}

export function invalidateAfterTeamMemberAdd(
  queryClient: QueryClient,
  hackathonId: string,
  teamId: string
): void {
  queryClient.invalidateQueries({ queryKey: QueryKeys.teams.all(hackathonId) })
  queryClient.invalidateQueries({ queryKey: QueryKeys.teams.members(teamId) })
}

export function invalidateAfterProjectCreate(
  queryClient: QueryClient,
  hackathonId: string,
  teamId: string
): void {
  queryClient.invalidateQueries({ queryKey: QueryKeys.projects.all(hackathonId) })
  queryClient.invalidateQueries({ queryKey: QueryKeys.projects.byTeam(teamId) })
}

export function invalidateAfterProjectUpdate(
  queryClient: QueryClient,
  hackathonId: string,
  projectId: string,
  teamId: string
): void {
  queryClient.invalidateQueries({ queryKey: QueryKeys.projects.all(hackathonId) })
  queryClient.invalidateQueries({ queryKey: QueryKeys.projects.detail(projectId) })
  queryClient.invalidateQueries({ queryKey: QueryKeys.projects.byTeam(teamId) })
}

export function invalidateAfterSubmission(
  queryClient: QueryClient,
  hackathonId: string,
  projectId: string
): void {
  queryClient.invalidateQueries({ queryKey: QueryKeys.submissions.all(hackathonId) })
  queryClient.invalidateQueries({ queryKey: QueryKeys.submissions.byProject(projectId) })
  queryClient.invalidateQueries({ queryKey: QueryKeys.projects.detail(projectId) })
}

export function invalidateAfterScoreSubmit(
  queryClient: QueryClient,
  hackathonId: string,
  submissionId: string
): void {
  queryClient.invalidateQueries({ queryKey: QueryKeys.scores.all(hackathonId) })
  queryClient.invalidateQueries({ queryKey: QueryKeys.scores.bySubmission(submissionId) })
  queryClient.invalidateQueries({ queryKey: QueryKeys.leaderboard.all(hackathonId) })
}

export function invalidateAfterRubricCreate(
  queryClient: QueryClient,
  hackathonId: string
): void {
  queryClient.invalidateQueries({ queryKey: QueryKeys.rubrics.all(hackathonId) })
}

export function invalidateAfterRubricUpdate(
  queryClient: QueryClient,
  hackathonId: string,
  rubricId: string
): void {
  queryClient.invalidateQueries({ queryKey: QueryKeys.rubrics.all(hackathonId) })
  queryClient.invalidateQueries({ queryKey: QueryKeys.rubrics.detail(rubricId) })
}

export function invalidateLeaderboard(
  queryClient: QueryClient,
  hackathonId: string,
  trackId?: string
): void {
  queryClient.invalidateQueries({ queryKey: QueryKeys.leaderboard.all(hackathonId) })
  if (trackId) {
    queryClient.invalidateQueries({
      queryKey: QueryKeys.leaderboard.byTrack(hackathonId, trackId),
    })
  }
}

export function invalidateAfterInvitationSend(
  queryClient: QueryClient,
  hackathonId: string
): void {
  queryClient.invalidateQueries({ queryKey: QueryKeys.invitations.all(hackathonId) })
}

export function invalidateAfterInvitationAccept(
  queryClient: QueryClient,
  hackathonId: string,
  invitationId: string
): void {
  queryClient.invalidateQueries({ queryKey: QueryKeys.invitations.all(hackathonId) })
  queryClient.invalidateQueries({ queryKey: QueryKeys.invitations.detail(invitationId) })
  queryClient.invalidateQueries({ queryKey: QueryKeys.participants.all(hackathonId) })
}
