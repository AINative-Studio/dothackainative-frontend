"use client"

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useStore } from '@/lib/store'
import { Calendar, ArrowRight, Users, FolderKanban, FileCheck } from 'lucide-react'

export function BuilderDashboard() {
  const router = useRouter()
  const { data, getCurrentHackathonStatus } = useStore()

  const uniqueHackathons = Array.from(
    new Map(data.hackathons.map(h => [h.hackathon_id, h])).values()
  ).map(h => getCurrentHackathonStatus(h.hackathon_id)!)

  const liveHackathons = uniqueHackathons.filter(h => h.status === 'LIVE')

  const myTeams = data.teams.length
  const myProjects = data.projects.length
  const mySubmissions = data.submissions.length

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
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          Builder Dashboard
        </h1>
        <p className="text-slate-600">Your hackathon journey</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-2 hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700">Active Hackathons</CardTitle>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Calendar className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{liveHackathons.length}</div>
            <p className="text-xs text-slate-600 mt-1">Happening now</p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700">My Teams</CardTitle>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Users className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{myTeams}</div>
            <p className="text-xs text-slate-600 mt-1">Joined teams</p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700">My Projects</CardTitle>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <FolderKanban className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{myProjects}</div>
            <p className="text-xs text-slate-600 mt-1">In progress</p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700">Submissions</CardTitle>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <FileCheck className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{mySubmissions}</div>
            <p className="text-xs text-slate-600 mt-1">Completed</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 shadow-lg mb-8">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50">
          <CardTitle className="text-2xl">Available Hackathons</CardTitle>
          <CardDescription>Browse and join hackathons to start building</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {uniqueHackathons.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                <Calendar className="h-8 w-8 text-slate-400" />
              </div>
              <p className="text-slate-600 mb-2 text-lg">No hackathons available</p>
              <p className="text-sm text-slate-500">Check back soon for new events</p>
            </div>
          ) : (
            <div className="space-y-4">
              {uniqueHackathons.map((hackathon) => (
                <div key={hackathon.hackathon_id} className="p-4 sm:p-6 border-2 rounded-lg hover:shadow-md transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900">{hackathon.name}</h3>
                        <Badge className={`${getStatusColor(hackathon.status)} border font-semibold`}>
                          {hackathon.status}
                        </Badge>
                      </div>
                      <p className="text-slate-600 mb-3">{hackathon.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(hackathon.start_at).toLocaleDateString()} - {new Date(hackathon.end_at).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {data.hackathonParticipants.filter(hp => hp.hackathon_id === hackathon.hackathon_id).length} participants
                        </span>
                        <span className="flex items-center gap-1">
                          <FolderKanban className="h-4 w-4" />
                          {data.projects.filter(p => p.hackathon_id === hackathon.hackathon_id).length} projects
                        </span>
                      </div>
                    </div>
                    <Button
                      onClick={() => router.push(`/hackathons/${hackathon.hackathon_id}`)}
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md hover:shadow-lg transition-all w-full sm:w-auto"
                    >
                      View Details <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
