"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { useHackathons, useCreateHackathon } from '@/hooks/use-hackathons'
import { useHackathonParticipants } from '@/hooks/use-participants'
import { useProjects } from '@/hooks/use-projects'
import { Plus, Calendar, ArrowRight, Users, Trophy, FolderKanban, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export function OrganizerDashboard() {
  const router = useRouter()
  const { data: hackathons = [], isLoading: hackathonsLoading } = useHackathons()
  const { data: allParticipants = [], isLoading: participantsLoading } = useHackathonParticipants()
  const { data: allProjects = [], isLoading: projectsLoading } = useProjects()

  const createHackathon = useCreateHackathon()

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    start_at: '',
    end_at: '',
  })

  if (hackathonsLoading || participantsLoading || projectsLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </div>
    )
  }

  const liveHackathons = hackathons.filter(h => h.status === 'LIVE')
  const totalParticipants = allParticipants.length
  const totalProjects = allProjects.length

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await createHackathon.mutateAsync({
        name: formData.name,
        description: formData.description,
        start_at: formData.start_at,
        end_at: formData.end_at,
      })
      toast.success('Hackathon created successfully')
      setFormData({ name: '', description: '', start_at: '', end_at: '' })
      setShowForm(false)
      router.push(`/hackathons/${result.hackathon_id}`)
    } catch (error) {
      console.error('Failed to create hackathon:', error)
      toast.error('Failed to create hackathon', {
        description: error instanceof Error ? error.message : 'Please try again',
      })
    }
  }

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Organizer Dashboard
          </h1>
          <p className="text-slate-600">Manage your hackathon events</p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Create Hackathon
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="border-2 hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700">Total Hackathons</CardTitle>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Calendar className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{hackathons.length}</div>
            <p className="text-xs text-slate-600 mt-1">{liveHackathons.length} live</p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700">Total Participants</CardTitle>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Users className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{totalParticipants}</div>
            <p className="text-xs text-slate-600 mt-1">Across all events</p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700">Total Projects</CardTitle>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <FolderKanban className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{totalProjects}</div>
            <p className="text-xs text-slate-600 mt-1">Submitted projects</p>
          </CardContent>
        </Card>
      </div>

      {showForm && (
        <Card className="mb-8 border-2 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardTitle className="text-2xl">Create New Hackathon</CardTitle>
            <CardDescription>Set up a new hackathon event</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-semibold">Name</Label>
                <Input
                  id="name"
                  placeholder="Spring Hackathon 2024"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border-2"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-base font-semibold">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your hackathon..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="border-2"
                  rows={4}
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_at" className="text-base font-semibold">Start Date</Label>
                  <Input
                    id="start_at"
                    type="datetime-local"
                    value={formData.start_at}
                    onChange={(e) => setFormData({ ...formData, start_at: e.target.value })}
                    className="border-2"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end_at" className="text-base font-semibold">End Date</Label>
                  <Input
                    id="end_at"
                    type="datetime-local"
                    value={formData.end_at}
                    onChange={(e) => setFormData({ ...formData, end_at: e.target.value })}
                    className="border-2"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  disabled={createHackathon.isPending}
                >
                  {createHackathon.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Hackathon'
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className="border-2"
                  disabled={createHackathon.isPending}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {hackathons.length === 0 ? (
        <Card className="border-2 shadow-lg">
          <CardContent className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
              <Calendar className="h-8 w-8 text-slate-400" />
            </div>
            <p className="text-slate-600 mb-6 text-lg">No hackathons yet</p>
            {!showForm && (
              <Button onClick={() => setShowForm(true)} className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/30">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Hackathon
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="border-2 shadow-lg overflow-hidden">
          <CardHeader className="bg-slate-50">
            <CardTitle>Your Hackathons</CardTitle>
          </CardHeader>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50">
                  <TableHead className="font-bold">Name</TableHead>
                  <TableHead className="font-bold">Status</TableHead>
                  <TableHead className="font-bold hidden sm:table-cell">Start Date</TableHead>
                  <TableHead className="font-bold hidden md:table-cell">End Date</TableHead>
                  <TableHead className="font-bold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hackathons.map((hackathon) => (
                  <TableRow key={hackathon.hackathon_id} className="hover:bg-slate-50/50 transition-colors">
                    <TableCell className="font-semibold text-slate-900">{hackathon.name}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(hackathon.status)} border font-semibold`}>
                        {hackathon.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-600 hidden sm:table-cell">{new Date(hackathon.start_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-slate-600 hidden md:table-cell">{new Date(hackathon.end_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        onClick={() => router.push(`/hackathons/${hackathon.hackathon_id}`)}
                        className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-md hover:shadow-lg transition-all"
                      >
                        Manage <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}
    </div>
  )
}
