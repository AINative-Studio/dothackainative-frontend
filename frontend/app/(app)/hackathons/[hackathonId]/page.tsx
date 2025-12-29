"use client"

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store'
import { Settings, Users, UsersRound, FolderKanban, FileCheck, Gavel, Trophy } from 'lucide-react'

export default function HackathonOverviewPage({
  params,
}: {
  params: { hackathonId: string }
}) {
  const { data, getCurrentHackathonStatus } = useStore()
  const hackathon = getCurrentHackathonStatus(params.hackathonId)

  if (!hackathon) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-600">Hackathon not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const participantCount = data.hackathonParticipants.filter(
    hp => hp.hackathon_id === params.hackathonId
  ).length

  const teamCount = data.teams.filter(
    t => t.hackathon_id === params.hackathonId
  ).length

  const projectCount = data.projects.filter(
    p => p.hackathon_id === params.hackathonId
  ).length

  const submissionCount = data.submissions.filter(
    s => data.projects.find(p => p.project_id === s.project_id && p.hackathon_id === params.hackathonId)
  ).length

  const prizeCount = data.prizes.filter(
    p => p.hackathon_id === params.hackathonId
  ).length

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DRAFT': return 'bg-slate-100 text-slate-800 border-slate-300'
      case 'LIVE': return 'bg-emerald-100 text-emerald-800 border-emerald-300'
      case 'CLOSED': return 'bg-rose-100 text-rose-800 border-rose-300'
      default: return 'bg-slate-100 text-slate-800 border-slate-300'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">{hackathon.name}</h1>
          <Badge className={`${getStatusColor(hackathon.status)} border font-semibold text-base px-4 py-1.5`}>
            {hackathon.status}
          </Badge>
        </div>
        <p className="text-slate-600 mb-4 text-lg">{hackathon.description}</p>
        <div className="flex gap-6 text-sm text-slate-600">
          <span className="flex items-center gap-2">
            <span className="font-semibold">Start:</span> {new Date(hackathon.start_at).toLocaleString()}
          </span>
          <span className="flex items-center gap-2">
            <span className="font-semibold">End:</span> {new Date(hackathon.end_at).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <Card className="border-2 hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700">Participants</CardTitle>
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{participantCount}</div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700">Teams</CardTitle>
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <UsersRound className="h-5 w-5 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{teamCount}</div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700">Projects</CardTitle>
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <FolderKanban className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{projectCount}</div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700">Submissions</CardTitle>
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
              <FileCheck className="h-5 w-5 text-violet-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{submissionCount}</div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700">Prizes</CardTitle>
            <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
              <Trophy className="h-5 w-5 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{prizeCount}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href={`/hackathons/${params.hackathonId}/setup`}>
          <Card className="border-2 hover:border-blue-300 hover:shadow-xl transition-all cursor-pointer h-full group">
            <CardHeader>
              <div className="w-14 h-14 mb-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-xl group-hover:shadow-blue-500/40 transition-all">
                <Settings className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl">Setup</CardTitle>
              <CardDescription className="text-base">Configure tracks, rubrics, and status</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href={`/hackathons/${params.hackathonId}/participants`}>
          <Card className="border-2 hover:border-emerald-300 hover:shadow-xl transition-all cursor-pointer h-full group">
            <CardHeader>
              <div className="w-14 h-14 mb-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:shadow-xl group-hover:shadow-emerald-500/40 transition-all">
                <Users className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl">Participants</CardTitle>
              <CardDescription className="text-base">Manage participants and roles</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href={`/hackathons/${params.hackathonId}/teams`}>
          <Card className="border-2 hover:border-violet-300 hover:shadow-xl transition-all cursor-pointer h-full group">
            <CardHeader>
              <div className="w-14 h-14 mb-3 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-xl group-hover:shadow-violet-500/40 transition-all">
                <UsersRound className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl">Teams</CardTitle>
              <CardDescription className="text-base">Create and manage teams</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href={`/hackathons/${params.hackathonId}/projects`}>
          <Card className="border-2 hover:border-orange-300 hover:shadow-xl transition-all cursor-pointer h-full group">
            <CardHeader>
              <div className="w-14 h-14 mb-3 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:shadow-xl group-hover:shadow-orange-500/40 transition-all">
                <FolderKanban className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl">Projects</CardTitle>
              <CardDescription className="text-base">Track project progress</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href={`/hackathons/${params.hackathonId}/submissions`}>
          <Card className="border-2 hover:border-teal-300 hover:shadow-xl transition-all cursor-pointer h-full group">
            <CardHeader>
              <div className="w-14 h-14 mb-3 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/30 group-hover:shadow-xl group-hover:shadow-teal-500/40 transition-all">
                <FileCheck className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl">Submissions</CardTitle>
              <CardDescription className="text-base">View and search submissions</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href={`/hackathons/${params.hackathonId}/judging`}>
          <Card className="border-2 hover:border-rose-300 hover:shadow-xl transition-all cursor-pointer h-full group">
            <CardHeader>
              <div className="w-14 h-14 mb-3 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-500/30 group-hover:shadow-xl group-hover:shadow-rose-500/40 transition-all">
                <Gavel className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl">Judging</CardTitle>
              <CardDescription className="text-base">Score and evaluate projects</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href={`/hackathons/${params.hackathonId}/leaderboard`}>
          <Card className="border-2 hover:border-yellow-300 hover:shadow-xl transition-all cursor-pointer h-full group">
            <CardHeader>
              <div className="w-14 h-14 mb-3 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center shadow-lg shadow-yellow-500/30 group-hover:shadow-xl group-hover:shadow-yellow-500/40 transition-all">
                <Trophy className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl">Leaderboard</CardTitle>
              <CardDescription className="text-base">View rankings and results</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href={`/hackathons/${params.hackathonId}/prizes`}>
          <Card className="border-2 hover:border-amber-300 hover:shadow-xl transition-all cursor-pointer h-full group">
            <CardHeader>
              <div className="w-14 h-14 mb-3 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:shadow-xl group-hover:shadow-amber-500/40 transition-all">
                <Trophy className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl">Prizes</CardTitle>
              <CardDescription className="text-base">Manage prizes and rewards</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  )
}
