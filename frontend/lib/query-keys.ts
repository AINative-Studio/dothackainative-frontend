export const QueryKeys = {
  hackathons: {
    all: ['hackathons'] as const,
    detail: (id: string) => ['hackathons', id] as const,
    byStatus: (status: string) => ['hackathons', 'status', status] as const,
  },

  tracks: {
    all: (hackathonId: string) => ['tracks', hackathonId] as const,
    detail: (trackId: string) => ['tracks', 'detail', trackId] as const,
  },

  participants: {
    all: (hackathonId: string) => ['participants', hackathonId] as const,
    detail: (participantId: string) => ['participants', 'detail', participantId] as const,
  },

  teams: {
    all: (hackathonId: string) => ['teams', hackathonId] as const,
    detail: (teamId: string) => ['teams', 'detail', teamId] as const,
    members: (teamId: string) => ['team-members', teamId] as const,
  },

  projects: {
    all: (hackathonId: string) => ['projects', hackathonId] as const,
    detail: (projectId: string) => ['projects', 'detail', projectId] as const,
    byTeam: (teamId: string) => ['projects', 'team', teamId] as const,
  },

  submissions: {
    all: (hackathonId: string) => ['submissions', hackathonId] as const,
    detail: (submissionId: string) => ['submissions', 'detail', submissionId] as const,
    byProject: (projectId: string) => ['submissions', 'project', projectId] as const,
  },

  rubrics: {
    all: (hackathonId: string) => ['rubrics', hackathonId] as const,
    detail: (rubricId: string) => ['rubrics', 'detail', rubricId] as const,
  },

  scores: {
    all: (hackathonId: string) => ['scores', hackathonId] as const,
    bySubmission: (submissionId: string) => ['scores', 'submission', submissionId] as const,
    byJudge: (judgeId: string) => ['scores', 'judge', judgeId] as const,
  },

  leaderboard: {
    all: (hackathonId: string) => ['leaderboard', hackathonId] as const,
    byTrack: (hackathonId: string, trackId: string) =>
      ['leaderboard', hackathonId, 'track', trackId] as const,
  },

  invitations: {
    all: (hackathonId: string) => ['invitations', hackathonId] as const,
    detail: (invitationId: string) => ['invitations', 'detail', invitationId] as const,
  },
}
