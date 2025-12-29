"use client"

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useStore } from '@/lib/store'
import { Calendar, ArrowRight, FileCheck, Award, CheckCircle } from 'lucide-react'

export function JudgeDashboard() {
  const router = useRouter()
  const { data, getCurrentHackathonStatus } = useStore()

  const uniqueHackathons = Array.from(
    new Map(data.hackathons.map(h => [h.hackathon_id, h])).values()
  ).map(h => getCurrentHackathonStatus(h.hackathon_id)!)

  const liveHackathons = uniqueHackathons.filter(h => h.status === 'LIVE')
  const totalSubmissions = data.submissions.length
  const myScores = data.scores.length
  const scoredSubmissions = new Set(data.scores.map(s => s.submission_id)).size

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DRAFT': return 'bg-slate-100 text-slate-800 border-slate-300'
      case 'LIVE': return 'bg-emerald-100 text-emerald-800 border-emerald-300'
      case 'CLOSED': return 'bg-rose-100 text-rose-800 border-rose-300'
      default: return 'bg-slate-100 text-slate-800 border-slate-300'
    }
  }

  const getProgressPercentage = () => {
    if (totalSubmissions === 0) return 0
    return Math.round((scoredSubmissions / totalSubmissions) * 100)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          Judge Dashboard
        </h1>
        <p className="text-slate-600">Evaluate submissions and provide feedback</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-2 hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700">Active Events</CardTitle>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Calendar className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{liveHackathons.length}</div>
            <p className="text-xs text-slate-600 mt-1">Judging now</p>
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
            <div className="text-3xl font-bold text-slate-900">{totalSubmissions}</div>
            <p className="text-xs text-slate-600 mt-1">To review</p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700">Scored</CardTitle>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{scoredSubmissions}</div>
            <p className="text-xs text-slate-600 mt-1">Completed reviews</p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700">Total Scores</CardTitle>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Award className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{myScores}</div>
            <p className="text-xs text-slate-600 mt-1">Criteria scored</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 shadow-lg mb-8 bg-gradient-to-br from-violet-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-xl">Judging Progress</CardTitle>
          <CardDescription>Your overall judging completion</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>{scoredSubmissions} of {totalSubmissions} submissions reviewed</span>
              <span>{getProgressPercentage()}%</span>
            </div>
            <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-600 to-purple-600 transition-all"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
          <CardTitle className="text-2xl">Hackathons to Judge</CardTitle>
          <CardDescription>Select a hackathon to view and score submissions</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {uniqueHackathons.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                <Calendar className="h-8 w-8 text-slate-400" />
              </div>
              <p className="text-slate-600 mb-2 text-lg">No hackathons assigned</p>
              <p className="text-sm text-slate-500">You will be notified when judging begins</p>
            </div>
          ) : (
            <div className="space-y-4">
              {uniqueHackathons.map((hackathon) => {
                const hackathonSubmissions = data.submissions.filter(s => {
                  const project = data.projects.find(p => p.project_id === s.project_id)
                  return project?.hackathon_id === hackathon.hackathon_id
                }).length
                const hackathonScored = data.scores.filter(s => {
                  const submission = data.submissions.find(sub => sub.submission_id === s.submission_id)
                  if (!submission) return false
                  const project = data.projects.find(p => p.project_id === submission.project_id)
                  return project?.hackathon_id === hackathon.hackathon_id
                }).length

                return (
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
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-600">Judging Progress</span>
                            <span className="font-semibold text-slate-900">
                              {hackathonSubmissions > 0 ? Math.round((hackathonScored / hackathonSubmissions) * 100) : 0}%
                            </span>
                          </div>
                          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-violet-600 to-purple-600 transition-all"
                              style={{ width: `${hackathonSubmissions > 0 ? (hackathonScored / hackathonSubmissions) * 100 : 0}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <FileCheck className="h-4 w-4" />
                            {hackathonSubmissions} submissions
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Ends {new Date(hackathon.end_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Button
                        onClick={() => router.push(`/hackathons/${hackathon.hackathon_id}/judging`)}
                        className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all w-full sm:w-auto"
                      >
                        Start Judging <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
