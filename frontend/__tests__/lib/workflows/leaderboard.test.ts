import {
  generateLeaderboard,
  exportLeaderboardToCSV,
  filterByTrack,
  getTopEntries,
  getLeaderboardStats,
  type LeaderboardEntry,
} from '@/lib/workflows/leaderboard'
import type { Score } from '@/lib/types'
import type { Submission } from '@/lib/api/submissions'
import type { Project } from '@/lib/api/projects'
import type { Team } from '@/lib/api/teams'

describe('leaderboard', () => {
  const mockScores: Score[] = [
    {
      score_id: 'score-1',
      submission_id: 'sub-1',
      judge_id: 'judge-1',
      score_json: '{}',
      total_score: 90,
    },
    {
      score_id: 'score-2',
      submission_id: 'sub-1',
      judge_id: 'judge-2',
      score_json: '{}',
      total_score: 85,
    },
    {
      score_id: 'score-3',
      submission_id: 'sub-2',
      judge_id: 'judge-1',
      score_json: '{}',
      total_score: 95,
    },
    {
      score_id: 'score-4',
      submission_id: 'sub-2',
      judge_id: 'judge-2',
      score_json: '{}',
      total_score: 92,
    },
    {
      score_id: 'score-5',
      submission_id: 'sub-3',
      judge_id: 'judge-1',
      score_json: '{}',
      total_score: 75,
    },
  ]

  const mockSubmissions: Submission[] = [
    {
      submission_id: 'sub-1',
      project_id: 'proj-1',
      submission_text: 'Submission 1',
      artifact_links_json: '[]',
      created_at: '2025-12-31T00:00:00Z',
    },
    {
      submission_id: 'sub-2',
      project_id: 'proj-2',
      submission_text: 'Submission 2',
      artifact_links_json: '[]',
      created_at: '2025-12-31T00:00:00Z',
    },
    {
      submission_id: 'sub-3',
      project_id: 'proj-3',
      submission_text: 'Submission 3',
      artifact_links_json: '[]',
      created_at: '2025-12-31T00:00:00Z',
    },
  ]

  const mockProjects: Project[] = [
    {
      project_id: 'proj-1',
      hackathon_id: 'hack-1',
      team_id: 'team-1',
      title: 'Project Alpha',
      status: 'SUBMITTED',
      track_id: 'track-1',
    },
    {
      project_id: 'proj-2',
      hackathon_id: 'hack-1',
      team_id: 'team-2',
      title: 'Project Beta',
      status: 'SUBMITTED',
      track_id: 'track-1',
    },
    {
      project_id: 'proj-3',
      hackathon_id: 'hack-1',
      team_id: 'team-3',
      title: 'Project Gamma',
      status: 'SUBMITTED',
      track_id: 'track-2',
    },
  ]

  const mockTeams: Team[] = [
    {
      team_id: 'team-1',
      hackathon_id: 'hack-1',
      name: 'Team Alpha',
      track_id: 'track-1',
    },
    {
      team_id: 'team-2',
      hackathon_id: 'hack-1',
      name: 'Team Beta',
      track_id: 'track-1',
    },
    {
      team_id: 'team-3',
      hackathon_id: 'hack-1',
      name: 'Team Gamma',
      track_id: 'track-2',
    },
  ]

  describe('generateLeaderboard', () => {
    it('generates leaderboard with correct rankings', () => {
      const leaderboard = generateLeaderboard(
        mockScores,
        mockSubmissions,
        mockProjects,
        mockTeams
      )

      expect(leaderboard).toHaveLength(3)
      expect(leaderboard[0].rank).toBe(1)
      expect(leaderboard[0].projectTitle).toBe('Project Beta')
      expect(leaderboard[0].averageScore).toBe(93.5)
      expect(leaderboard[1].rank).toBe(2)
      expect(leaderboard[1].projectTitle).toBe('Project Alpha')
      expect(leaderboard[1].averageScore).toBe(87.5)
      expect(leaderboard[2].rank).toBe(3)
      expect(leaderboard[2].projectTitle).toBe('Project Gamma')
      expect(leaderboard[2].averageScore).toBe(75)
    })

    it('includes judge count for each entry', () => {
      const leaderboard = generateLeaderboard(
        mockScores,
        mockSubmissions,
        mockProjects,
        mockTeams
      )

      expect(leaderboard[0].judgeCount).toBe(2)
      expect(leaderboard[1].judgeCount).toBe(2)
      expect(leaderboard[2].judgeCount).toBe(1)
    })

    it('filters by track when specified', () => {
      const leaderboard = generateLeaderboard(
        mockScores,
        mockSubmissions,
        mockProjects,
        mockTeams,
        { trackId: 'track-1' }
      )

      expect(leaderboard).toHaveLength(2)
      expect(leaderboard.every((e) => e.trackId === 'track-1')).toBe(true)
    })

    it('filters by minimum judges when specified', () => {
      const leaderboard = generateLeaderboard(
        mockScores,
        mockSubmissions,
        mockProjects,
        mockTeams,
        { minJudges: 2 }
      )

      expect(leaderboard).toHaveLength(2)
      expect(leaderboard.every((e) => e.judgeCount >= 2)).toBe(true)
    })

    it('returns empty array when no submissions match criteria', () => {
      const leaderboard = generateLeaderboard([], mockSubmissions, mockProjects, mockTeams)

      expect(leaderboard).toHaveLength(0)
    })

    it('skips submissions with missing project', () => {
      const submissionsWithInvalid: Submission[] = [
        ...mockSubmissions,
        {
          submission_id: 'sub-4',
          project_id: 'proj-nonexistent',
          submission_text: 'Invalid',
          artifact_links_json: '[]',
          created_at: '2025-12-31T00:00:00Z',
        },
      ]

      const leaderboard = generateLeaderboard(
        mockScores,
        submissionsWithInvalid,
        mockProjects,
        mockTeams
      )

      expect(leaderboard).toHaveLength(3)
    })

    it('skips submissions with missing team', () => {
      const projectsWithInvalidTeam: Project[] = [
        ...mockProjects,
        {
          project_id: 'proj-4',
          hackathon_id: 'hack-1',
          team_id: 'team-nonexistent',
          title: 'Project Invalid',
          status: 'SUBMITTED',
        },
      ]

      const submissionsWithInvalid: Submission[] = [
        ...mockSubmissions,
        {
          submission_id: 'sub-4',
          project_id: 'proj-4',
          submission_text: 'Invalid',
          artifact_links_json: '[]',
          created_at: '2025-12-31T00:00:00Z',
        },
      ]

      const leaderboard = generateLeaderboard(
        mockScores,
        submissionsWithInvalid,
        projectsWithInvalidTeam,
        mockTeams
      )

      expect(leaderboard).toHaveLength(3)
    })
  })

  describe('exportLeaderboardToCSV', () => {
    it('generates CSV with correct headers', () => {
      const leaderboard = generateLeaderboard(
        mockScores,
        mockSubmissions,
        mockProjects,
        mockTeams
      )

      const csv = exportLeaderboardToCSV(leaderboard)

      expect(csv).toContain('Rank,Project,Team,Track,Score,Judges')
    })

    it('generates CSV with correct data rows', () => {
      const leaderboard = generateLeaderboard(
        mockScores,
        mockSubmissions,
        mockProjects,
        mockTeams
      )

      const csv = exportLeaderboardToCSV(leaderboard)
      const lines = csv.split('\n')

      expect(lines[1]).toContain('1,Project Beta,Team Beta,track-1,93.50,2')
      expect(lines[2]).toContain('2,Project Alpha,Team Alpha,track-1,87.50,2')
      expect(lines[3]).toContain('3,Project Gamma,Team Gamma,track-2,75.00,1')
    })

    it('escapes CSV values with commas', () => {
      const entries: LeaderboardEntry[] = [
        {
          rank: 1,
          submissionId: 'sub-1',
          projectId: 'proj-1',
          projectTitle: 'Project, with comma',
          teamId: 'team-1',
          teamName: 'Team Name',
          averageScore: 90,
          judgeCount: 2,
          scores: [],
        },
      ]

      const csv = exportLeaderboardToCSV(entries)

      expect(csv).toContain('"Project, with comma"')
    })

    it('escapes CSV values with quotes', () => {
      const entries: LeaderboardEntry[] = [
        {
          rank: 1,
          submissionId: 'sub-1',
          projectId: 'proj-1',
          projectTitle: 'Project "quoted"',
          teamId: 'team-1',
          teamName: 'Team Name',
          averageScore: 90,
          judgeCount: 2,
          scores: [],
        },
      ]

      const csv = exportLeaderboardToCSV(entries)

      expect(csv).toContain('"Project ""quoted"""')
    })

    it('handles entries without track ID', () => {
      const entries: LeaderboardEntry[] = [
        {
          rank: 1,
          submissionId: 'sub-1',
          projectId: 'proj-1',
          projectTitle: 'Project Title',
          teamId: 'team-1',
          teamName: 'Team Name',
          averageScore: 90,
          judgeCount: 2,
          scores: [],
        },
      ]

      const csv = exportLeaderboardToCSV(entries)

      expect(csv).toContain('N/A')
    })
  })

  describe('filterByTrack', () => {
    const leaderboard = generateLeaderboard(mockScores, mockSubmissions, mockProjects, mockTeams)

    it('filters entries by track ID', () => {
      const filtered = filterByTrack(leaderboard, 'track-1')

      expect(filtered).toHaveLength(2)
      expect(filtered.every((e) => e.trackId === 'track-1')).toBe(true)
    })

    it('recalculates ranks after filtering', () => {
      const filtered = filterByTrack(leaderboard, 'track-1')

      expect(filtered[0].rank).toBe(1)
      expect(filtered[1].rank).toBe(2)
    })

    it('returns all entries when trackId is null', () => {
      const filtered = filterByTrack(leaderboard, null)

      expect(filtered).toHaveLength(3)
    })
  })

  describe('getTopEntries', () => {
    const leaderboard = generateLeaderboard(mockScores, mockSubmissions, mockProjects, mockTeams)

    it('returns top N entries', () => {
      const top2 = getTopEntries(leaderboard, 2)

      expect(top2).toHaveLength(2)
      expect(top2[0].rank).toBe(1)
      expect(top2[1].rank).toBe(2)
    })

    it('returns all entries when count exceeds length', () => {
      const top10 = getTopEntries(leaderboard, 10)

      expect(top10).toHaveLength(3)
    })

    it('returns empty array when count is 0', () => {
      const top0 = getTopEntries(leaderboard, 0)

      expect(top0).toHaveLength(0)
    })
  })

  describe('getLeaderboardStats', () => {
    const leaderboard = generateLeaderboard(mockScores, mockSubmissions, mockProjects, mockTeams)

    it('calculates correct statistics', () => {
      const stats = getLeaderboardStats(leaderboard)

      expect(stats.totalSubmissions).toBe(3)
      expect(stats.averageScore).toBeCloseTo(85.33, 2)
      expect(stats.highestScore).toBe(93.5)
      expect(stats.lowestScore).toBe(75)
      expect(stats.totalJudges).toBe(2)
    })

    it('returns zero stats for empty leaderboard', () => {
      const stats = getLeaderboardStats([])

      expect(stats.totalSubmissions).toBe(0)
      expect(stats.averageScore).toBe(0)
      expect(stats.highestScore).toBe(0)
      expect(stats.lowestScore).toBe(0)
      expect(stats.totalJudges).toBe(0)
    })
  })
})
