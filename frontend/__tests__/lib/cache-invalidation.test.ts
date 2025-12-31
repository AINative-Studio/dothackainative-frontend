import { QueryClient } from '@tanstack/react-query'
import {
  invalidateAfterHackathonCreate,
  invalidateAfterHackathonUpdate,
  invalidateAfterHackathonDelete,
  invalidateAfterTrackCreate,
  invalidateAfterParticipantEnroll,
  invalidateAfterTeamCreate,
  invalidateAfterTeamMemberAdd,
  invalidateAfterProjectCreate,
  invalidateAfterSubmission,
  invalidateAfterScoreSubmit,
  invalidateAfterRubricCreate,
  invalidateLeaderboard,
  invalidateAfterInvitationSend,
  invalidateAfterInvitationAccept,
} from '@/lib/cache-invalidation'
import { QueryKeys } from '@/lib/query-keys'

describe('cache-invalidation', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    })
    jest.spyOn(queryClient, 'invalidateQueries')
    jest.spyOn(queryClient, 'removeQueries')
  })

  afterEach(() => {
    queryClient.clear()
    jest.restoreAllMocks()
  })

  describe('invalidateAfterHackathonCreate', () => {
    it('invalidates hackathons list', () => {
      invalidateAfterHackathonCreate(queryClient)
      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.hackathons.all,
      })
    })
  })

  describe('invalidateAfterHackathonUpdate', () => {
    it('invalidates hackathons list and detail', () => {
      const hackathonId = 'hackathon-1'
      invalidateAfterHackathonUpdate(queryClient, hackathonId)

      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.hackathons.all,
      })
      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.hackathons.detail(hackathonId),
      })
    })
  })

  describe('invalidateAfterHackathonDelete', () => {
    it('invalidates list and removes detail query', () => {
      const hackathonId = 'hackathon-1'
      invalidateAfterHackathonDelete(queryClient, hackathonId)

      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.hackathons.all,
      })
      expect(queryClient.removeQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.hackathons.detail(hackathonId),
      })
    })
  })

  describe('invalidateAfterTrackCreate', () => {
    it('invalidates tracks for hackathon', () => {
      const hackathonId = 'hackathon-1'
      invalidateAfterTrackCreate(queryClient, hackathonId)

      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.tracks.all(hackathonId),
      })
    })
  })

  describe('invalidateAfterTrackUpdate', () => {
    it('invalidates tracks list and detail', () => {
      const hackathonId = 'hackathon-1'
      const trackId = 'track-1'
      const { invalidateAfterTrackUpdate } = require('@/lib/cache-invalidation')

      invalidateAfterTrackUpdate(queryClient, hackathonId, trackId)

      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.tracks.all(hackathonId),
      })
      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.tracks.detail(trackId),
      })
    })
  })

  describe('invalidateAfterTrackDelete', () => {
    it('invalidates list and removes detail', () => {
      const hackathonId = 'hackathon-1'
      const trackId = 'track-1'
      const { invalidateAfterTrackDelete } = require('@/lib/cache-invalidation')

      invalidateAfterTrackDelete(queryClient, hackathonId, trackId)

      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.tracks.all(hackathonId),
      })
      expect(queryClient.removeQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.tracks.detail(trackId),
      })
    })
  })

  describe('invalidateAfterTeamUpdate', () => {
    it('invalidates teams list and detail', () => {
      const hackathonId = 'hackathon-1'
      const teamId = 'team-1'
      const { invalidateAfterTeamUpdate } = require('@/lib/cache-invalidation')

      invalidateAfterTeamUpdate(queryClient, hackathonId, teamId)

      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.teams.all(hackathonId),
      })
      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.teams.detail(teamId),
      })
    })
  })

  describe('invalidateAfterProjectUpdate', () => {
    it('invalidates projects list, detail, and team projects', () => {
      const hackathonId = 'hackathon-1'
      const projectId = 'project-1'
      const teamId = 'team-1'
      const { invalidateAfterProjectUpdate } = require('@/lib/cache-invalidation')

      invalidateAfterProjectUpdate(queryClient, hackathonId, projectId, teamId)

      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.projects.all(hackathonId),
      })
      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.projects.detail(projectId),
      })
      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.projects.byTeam(teamId),
      })
    })
  })

  describe('invalidateAfterRubricUpdate', () => {
    it('invalidates rubrics list and detail', () => {
      const hackathonId = 'hackathon-1'
      const rubricId = 'rubric-1'
      const { invalidateAfterRubricUpdate } = require('@/lib/cache-invalidation')

      invalidateAfterRubricUpdate(queryClient, hackathonId, rubricId)

      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.rubrics.all(hackathonId),
      })
      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.rubrics.detail(rubricId),
      })
    })
  })

  describe('invalidateAfterParticipantEnroll', () => {
    it('invalidates participants for hackathon', () => {
      const hackathonId = 'hackathon-1'
      invalidateAfterParticipantEnroll(queryClient, hackathonId)

      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.participants.all(hackathonId),
      })
    })
  })

  describe('invalidateAfterTeamCreate', () => {
    it('invalidates teams for hackathon', () => {
      const hackathonId = 'hackathon-1'
      invalidateAfterTeamCreate(queryClient, hackathonId)

      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.teams.all(hackathonId),
      })
    })
  })

  describe('invalidateAfterTeamMemberAdd', () => {
    it('invalidates teams list and team members', () => {
      const hackathonId = 'hackathon-1'
      const teamId = 'team-1'
      invalidateAfterTeamMemberAdd(queryClient, hackathonId, teamId)

      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.teams.all(hackathonId),
      })
      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.teams.members(teamId),
      })
    })
  })

  describe('invalidateAfterProjectCreate', () => {
    it('invalidates projects list and team projects', () => {
      const hackathonId = 'hackathon-1'
      const teamId = 'team-1'
      invalidateAfterProjectCreate(queryClient, hackathonId, teamId)

      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.projects.all(hackathonId),
      })
      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.projects.byTeam(teamId),
      })
    })
  })

  describe('invalidateAfterSubmission', () => {
    it('invalidates submissions, project submissions, and project detail', () => {
      const hackathonId = 'hackathon-1'
      const projectId = 'project-1'
      invalidateAfterSubmission(queryClient, hackathonId, projectId)

      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.submissions.all(hackathonId),
      })
      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.submissions.byProject(projectId),
      })
      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.projects.detail(projectId),
      })
    })
  })

  describe('invalidateAfterScoreSubmit', () => {
    it('invalidates scores, submission scores, and leaderboard', () => {
      const hackathonId = 'hackathon-1'
      const submissionId = 'submission-1'
      invalidateAfterScoreSubmit(queryClient, hackathonId, submissionId)

      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.scores.all(hackathonId),
      })
      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.scores.bySubmission(submissionId),
      })
      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.leaderboard.all(hackathonId),
      })
    })
  })

  describe('invalidateAfterRubricCreate', () => {
    it('invalidates rubrics for hackathon', () => {
      const hackathonId = 'hackathon-1'
      invalidateAfterRubricCreate(queryClient, hackathonId)

      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.rubrics.all(hackathonId),
      })
    })
  })

  describe('invalidateLeaderboard', () => {
    it('invalidates leaderboard for hackathon', () => {
      const hackathonId = 'hackathon-1'
      invalidateLeaderboard(queryClient, hackathonId)

      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.leaderboard.all(hackathonId),
      })
    })

    it('invalidates track-specific leaderboard when trackId provided', () => {
      const hackathonId = 'hackathon-1'
      const trackId = 'track-1'
      invalidateLeaderboard(queryClient, hackathonId, trackId)

      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.leaderboard.all(hackathonId),
      })
      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.leaderboard.byTrack(hackathonId, trackId),
      })
    })
  })

  describe('invalidateAfterInvitationSend', () => {
    it('invalidates invitations for hackathon', () => {
      const hackathonId = 'hackathon-1'
      invalidateAfterInvitationSend(queryClient, hackathonId)

      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.invitations.all(hackathonId),
      })
    })
  })

  describe('invalidateAfterInvitationAccept', () => {
    it('invalidates invitations, invitation detail, and participants', () => {
      const hackathonId = 'hackathon-1'
      const invitationId = 'invitation-1'
      invalidateAfterInvitationAccept(queryClient, hackathonId, invitationId)

      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.invitations.all(hackathonId),
      })
      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.invitations.detail(invitationId),
      })
      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: QueryKeys.participants.all(hackathonId),
      })
    })
  })
})
