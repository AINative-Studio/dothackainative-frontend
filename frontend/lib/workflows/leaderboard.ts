import type { Score } from '@/lib/types'
import type { Submission } from '@/lib/api/submissions'
import type { Project } from '@/lib/api/projects'
import type { Team } from '@/lib/api/teams'

export interface LeaderboardEntry {
  rank: number
  submissionId: string
  projectId: string
  projectTitle: string
  teamId: string
  teamName: string
  trackId?: string
  averageScore: number
  judgeCount: number
  scores: Score[]
}

export interface LeaderboardOptions {
  trackId?: string
  minJudges?: number
}

export function generateLeaderboard(
  scores: Score[],
  submissions: Submission[],
  projects: Project[],
  teams: Team[],
  options: LeaderboardOptions = {}
): LeaderboardEntry[] {
  const { trackId, minJudges = 1 } = options

  const scoresBySubmission = new Map<string, Score[]>()
  scores.forEach((score) => {
    const existing = scoresBySubmission.get(score.submission_id) || []
    scoresBySubmission.set(score.submission_id, [...existing, score])
  })

  const entries: LeaderboardEntry[] = []

  submissions.forEach((submission) => {
    const project = projects.find((p) => p.project_id === submission.project_id)
    if (!project) return

    if (trackId && project.track_id !== trackId) return

    const team = teams.find((t) => t.team_id === project.team_id)
    if (!team) return

    const submissionScores = scoresBySubmission.get(submission.submission_id) || []

    if (submissionScores.length < minJudges) return

    const averageScore =
      submissionScores.reduce((sum, score) => sum + score.total_score, 0) /
      submissionScores.length

    entries.push({
      rank: 0,
      submissionId: submission.submission_id,
      projectId: project.project_id,
      projectTitle: project.title,
      teamId: team.team_id,
      teamName: team.name,
      trackId: project.track_id,
      averageScore,
      judgeCount: submissionScores.length,
      scores: submissionScores,
    })
  })

  entries.sort((a, b) => b.averageScore - a.averageScore)

  entries.forEach((entry, index) => {
    entry.rank = index + 1
  })

  return entries
}

export function exportLeaderboardToCSV(entries: LeaderboardEntry[]): string {
  const headers = ['Rank', 'Project', 'Team', 'Track', 'Score', 'Judges']

  const rows = entries.map((entry) => [
    entry.rank.toString(),
    escapeCSVValue(entry.projectTitle),
    escapeCSVValue(entry.teamName),
    entry.trackId || 'N/A',
    entry.averageScore.toFixed(2),
    entry.judgeCount.toString(),
  ])

  const csvLines = [headers.join(','), ...rows.map((row) => row.join(','))]

  return csvLines.join('\n')
}

export function downloadCSV(csv: string, filename: string): void {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
}

function escapeCSVValue(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

export function filterByTrack(
  entries: LeaderboardEntry[],
  trackId: string | null
): LeaderboardEntry[] {
  if (!trackId) return entries

  const filtered = entries.filter((entry) => entry.trackId === trackId)

  filtered.forEach((entry, index) => {
    entry.rank = index + 1
  })

  return filtered
}

export function getTopEntries(entries: LeaderboardEntry[], count: number): LeaderboardEntry[] {
  return entries.slice(0, count)
}

export function getLeaderboardStats(entries: LeaderboardEntry[]): {
  totalSubmissions: number
  averageScore: number
  highestScore: number
  lowestScore: number
  totalJudges: number
} {
  if (entries.length === 0) {
    return {
      totalSubmissions: 0,
      averageScore: 0,
      highestScore: 0,
      lowestScore: 0,
      totalJudges: 0,
    }
  }

  const scores = entries.map((e) => e.averageScore)
  const judgeSet = new Set<string>()

  entries.forEach((entry) => {
    entry.scores.forEach((score) => {
      judgeSet.add(score.judge_id)
    })
  })

  return {
    totalSubmissions: entries.length,
    averageScore: scores.reduce((a, b) => a + b, 0) / scores.length,
    highestScore: Math.max(...scores),
    lowestScore: Math.min(...scores),
    totalJudges: judgeSet.size,
  }
}
