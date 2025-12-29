"use client"

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { useStore } from '@/lib/store'
import { Trophy, Download } from 'lucide-react'

type LeaderboardEntry = {
  rank: number
  projectTitle: string
  teamName: string
  trackName?: string
  averageScore: number
  scoreCount: number
}

export default function LeaderboardPage({
  params,
}: {
  params: { hackathonId: string }
}) {
  const { data, getCurrentHackathonStatus } = useStore()
  const hackathon = getCurrentHackathonStatus(params.hackathonId)
  const [selectedTrackId, setSelectedTrackId] = useState<string>('all')

  if (!hackathon) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-600">Hackathon not found</p>
      </div>
    )
  }

  const projects = data.projects.filter(p => p.hackathon_id === params.hackathonId)
  const teams = data.teams.filter(t => t.hackathon_id === params.hackathonId)
  const tracks = data.tracks.filter(t => t.hackathon_id === params.hackathonId)
  const submissions = data.submissions.filter(s =>
    projects.some(p => p.project_id === s.project_id)
  )

  const leaderboardData = useMemo(() => {
    const entries: LeaderboardEntry[] = []

    projects.forEach((project) => {
      const team = teams.find(t => t.team_id === project.team_id)
      const track = team?.track_id ? tracks.find(t => t.track_id === team.track_id) : undefined

      if (selectedTrackId !== 'all' && team?.track_id !== selectedTrackId) {
        return
      }

      const projectSubmission = submissions.find(s => s.project_id === project.project_id)
      if (!projectSubmission) return

      const projectScores = data.scores.filter(s => s.submission_id === projectSubmission.submission_id)
      if (projectScores.length === 0) return

      const averageScore =
        projectScores.reduce((sum, score) => sum + score.total_score, 0) / projectScores.length

      entries.push({
        rank: 0,
        projectTitle: project.title,
        teamName: team?.name || 'Unknown',
        trackName: track?.name,
        averageScore,
        scoreCount: projectScores.length,
      })
    })

    entries.sort((a, b) => b.averageScore - a.averageScore)
    entries.forEach((entry, index) => {
      entry.rank = index + 1
    })

    return entries
  }, [projects, teams, tracks, submissions, data.scores, selectedTrackId])

  const exportToCSV = () => {
    const headers = ['Rank', 'Project', 'Team', 'Track', 'Average Score', 'Score Count']
    const rows = leaderboardData.map(entry => [
      entry.rank,
      entry.projectTitle,
      entry.teamName,
      entry.trackName || 'N/A',
      entry.averageScore.toFixed(2),
      entry.scoreCount,
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${hackathon.name.replace(/\s+/g, '_')}_leaderboard.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getMedalIcon = (rank: number) => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Trophy className="h-8 w-8 text-yellow-600" />
              Leaderboard - {hackathon.name}
            </h1>
            <p className="text-gray-600">View rankings and results</p>
          </div>
          {leaderboardData.length > 0 && (
            <Button onClick={exportToCSV}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          )}
        </div>

        {tracks.length > 0 && (
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Filter by Track:</label>
            <Select value={selectedTrackId} onValueChange={setSelectedTrackId}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tracks</SelectItem>
                {tracks.map((track) => (
                  <SelectItem key={track.track_id} value={track.track_id}>
                    {track.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {leaderboardData.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-600">
              No scores yet. Projects need to be submitted and judged to appear on the leaderboard.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Rank</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Team</TableHead>
                {tracks.length > 0 && <TableHead>Track</TableHead>}
                <TableHead className="text-right">Average Score</TableHead>
                <TableHead className="text-right">Judges</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((entry) => {
                const medal = getMedalIcon(entry.rank)
                return (
                  <TableRow key={`${entry.projectTitle}-${entry.teamName}`}>
                    <TableCell className="font-bold text-lg">
                      {medal ? (
                        <span className="flex items-center gap-2">
                          {medal} {entry.rank}
                        </span>
                      ) : (
                        entry.rank
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{entry.projectTitle}</TableCell>
                    <TableCell>{entry.teamName}</TableCell>
                    {tracks.length > 0 && (
                      <TableCell>
                        {entry.trackName ? (
                          <Badge variant="outline">{entry.trackName}</Badge>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                    )}
                    <TableCell className="text-right font-semibold">
                      {entry.averageScore.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right text-gray-600">
                      {entry.scoreCount}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Card>
      )}

      {leaderboardData.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Top 3 Projects</CardTitle>
            <CardDescription>Congratulations to our winners!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {leaderboardData.slice(0, 3).map((entry) => (
                <div
                  key={`${entry.projectTitle}-${entry.teamName}`}
                  className="p-4 border rounded-lg bg-gradient-to-br from-gray-50 to-white"
                >
                  <div className="text-4xl mb-2 text-center">
                    {getMedalIcon(entry.rank)}
                  </div>
                  <h3 className="font-bold text-center mb-1">{entry.projectTitle}</h3>
                  <p className="text-sm text-gray-600 text-center mb-2">{entry.teamName}</p>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-blue-600">
                      {entry.averageScore.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-600 ml-1">avg score</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
