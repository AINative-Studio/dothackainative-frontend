import { QueryKeys } from '@/lib/query-keys'

describe('QueryKeys', () => {
  describe('hackathons', () => {
    it('generates all query key', () => {
      expect(QueryKeys.hackathons.all).toEqual(['hackathons'])
    })

    it('generates detail query key', () => {
      const id = 'test-id'
      expect(QueryKeys.hackathons.detail(id)).toEqual(['hackathons', id])
    })

    it('generates byStatus query key', () => {
      expect(QueryKeys.hackathons.byStatus('LIVE')).toEqual(['hackathons', 'status', 'LIVE'])
    })
  })

  describe('tracks', () => {
    it('generates all query key', () => {
      expect(QueryKeys.tracks.all('hackathon-1')).toEqual(['tracks', 'hackathon-1'])
    })

    it('generates detail query key', () => {
      expect(QueryKeys.tracks.detail('track-1')).toEqual(['tracks', 'detail', 'track-1'])
    })
  })

  describe('participants', () => {
    it('generates all query key', () => {
      expect(QueryKeys.participants.all('hackathon-1')).toEqual(['participants', 'hackathon-1'])
    })

    it('generates detail query key', () => {
      expect(QueryKeys.participants.detail('participant-1')).toEqual([
        'participants',
        'detail',
        'participant-1',
      ])
    })
  })

  describe('teams', () => {
    it('generates all query key', () => {
      expect(QueryKeys.teams.all('hackathon-1')).toEqual(['teams', 'hackathon-1'])
    })

    it('generates detail query key', () => {
      expect(QueryKeys.teams.detail('team-1')).toEqual(['teams', 'detail', 'team-1'])
    })

    it('generates members query key', () => {
      expect(QueryKeys.teams.members('team-1')).toEqual(['team-members', 'team-1'])
    })
  })

  describe('projects', () => {
    it('generates all query key', () => {
      expect(QueryKeys.projects.all('hackathon-1')).toEqual(['projects', 'hackathon-1'])
    })

    it('generates detail query key', () => {
      expect(QueryKeys.projects.detail('project-1')).toEqual(['projects', 'detail', 'project-1'])
    })

    it('generates byTeam query key', () => {
      expect(QueryKeys.projects.byTeam('team-1')).toEqual(['projects', 'team', 'team-1'])
    })
  })

  describe('submissions', () => {
    it('generates all query key', () => {
      expect(QueryKeys.submissions.all('hackathon-1')).toEqual(['submissions', 'hackathon-1'])
    })

    it('generates detail query key', () => {
      expect(QueryKeys.submissions.detail('submission-1')).toEqual([
        'submissions',
        'detail',
        'submission-1',
      ])
    })

    it('generates byProject query key', () => {
      expect(QueryKeys.submissions.byProject('project-1')).toEqual([
        'submissions',
        'project',
        'project-1',
      ])
    })
  })

  describe('rubrics', () => {
    it('generates all query key', () => {
      expect(QueryKeys.rubrics.all('hackathon-1')).toEqual(['rubrics', 'hackathon-1'])
    })

    it('generates detail query key', () => {
      expect(QueryKeys.rubrics.detail('rubric-1')).toEqual(['rubrics', 'detail', 'rubric-1'])
    })
  })

  describe('scores', () => {
    it('generates all query key', () => {
      expect(QueryKeys.scores.all('hackathon-1')).toEqual(['scores', 'hackathon-1'])
    })

    it('generates bySubmission query key', () => {
      expect(QueryKeys.scores.bySubmission('submission-1')).toEqual([
        'scores',
        'submission',
        'submission-1',
      ])
    })

    it('generates byJudge query key', () => {
      expect(QueryKeys.scores.byJudge('judge-1')).toEqual(['scores', 'judge', 'judge-1'])
    })
  })

  describe('leaderboard', () => {
    it('generates all query key', () => {
      expect(QueryKeys.leaderboard.all('hackathon-1')).toEqual(['leaderboard', 'hackathon-1'])
    })

    it('generates byTrack query key', () => {
      expect(QueryKeys.leaderboard.byTrack('hackathon-1', 'track-1')).toEqual([
        'leaderboard',
        'hackathon-1',
        'track',
        'track-1',
      ])
    })
  })

  describe('invitations', () => {
    it('generates all query key', () => {
      expect(QueryKeys.invitations.all('hackathon-1')).toEqual(['invitations', 'hackathon-1'])
    })

    it('generates detail query key', () => {
      expect(QueryKeys.invitations.detail('invitation-1')).toEqual([
        'invitations',
        'detail',
        'invitation-1',
      ])
    })
  })
})
