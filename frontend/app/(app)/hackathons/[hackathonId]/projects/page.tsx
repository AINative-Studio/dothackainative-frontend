"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useHackathonById } from '@/hooks/use-hackathons'
import { useProjectsByHackathon, useCreateProject, useUpdateProject } from '@/hooks/use-projects'
import { useTeamsByHackathon } from '@/hooks/use-teams'
import { Plus, ExternalLink, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function ProjectsPage({
  params,
}: {
  params: { hackathonId: string }
}) {
  const { data: hackathon, isLoading: hackathonLoading } = useHackathonById(params.hackathonId)
  const { data: projects = [], isLoading: projectsLoading } = useProjectsByHackathon(params.hackathonId)
  const { data: teams = [], isLoading: teamsLoading } = useTeamsByHackathon(params.hackathonId)

  const createProject = useCreateProject()
  const updateProjectMutation = useUpdateProject()

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    team_id: '',
    title: '',
    one_liner: '',
    repo_url: '',
    demo_url: '',
  })

  if (hackathonLoading || projectsLoading || teamsLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </div>
    )
  }

  if (!hackathon) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-600">Hackathon not found</p>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createProject.mutateAsync({
        hackathon_id: params.hackathonId,
        team_id: formData.team_id,
        title: formData.title,
        one_liner: formData.one_liner || undefined,
        repo_url: formData.repo_url || undefined,
        demo_url: formData.demo_url || undefined,
      })
      toast.success('Project created successfully')
      setFormData({ team_id: '', title: '', one_liner: '', repo_url: '', demo_url: '' })
      setShowForm(false)
    } catch (error) {
      console.error('Failed to create project:', error)
      toast.error('Failed to create project', {
        description: error instanceof Error ? error.message : 'Please try again',
      })
    }
  }

  const handleStatusChange = async (projectId: string, status: 'IDEA' | 'BUILDING' | 'SUBMITTED') => {
    try {
      await updateProjectMutation.mutateAsync({
        project_id: projectId,
        status,
      })
      toast.success('Project status updated')
    } catch (error) {
      console.error('Failed to update project:', error)
      toast.error('Failed to update project', {
        description: error instanceof Error ? error.message : 'Please try again',
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'IDEA': return 'bg-gray-100 text-gray-800'
      case 'BUILDING': return 'bg-blue-100 text-blue-800'
      case 'SUBMITTED': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Projects - {hackathon.name}</h1>
          <p className="text-gray-600">Track project development</p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Project
          </Button>
        )}
      </div>

      {showForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create Project</CardTitle>
            <CardDescription>Register a new project for your team</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="team">Team</Label>
                <Select
                  value={formData.team_id}
                  onValueChange={(value) => setFormData({ ...formData, team_id: value })}
                >
                  <SelectTrigger id="team">
                    <SelectValue placeholder="Select a team" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map((team) => (
                      <SelectItem key={team.team_id} value={team.team_id}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  placeholder="AI-Powered Task Manager"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="one_liner">One-liner</Label>
                <Input
                  id="one_liner"
                  placeholder="Manage tasks smarter with AI"
                  value={formData.one_liner}
                  onChange={(e) => setFormData({ ...formData, one_liner: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="repo_url">Repository URL</Label>
                <Input
                  id="repo_url"
                  type="url"
                  placeholder="https://github.com/team/project"
                  value={formData.repo_url}
                  onChange={(e) => setFormData({ ...formData, repo_url: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="demo_url">Demo URL</Label>
                <Input
                  id="demo_url"
                  type="url"
                  placeholder="https://demo.example.com"
                  value={formData.demo_url}
                  onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={createProject.isPending}>
                  {createProject.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create'
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  disabled={createProject.isPending}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {projects.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-600 mb-4">No projects yet</p>
            {!showForm && (
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create First Project
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => {
            const team = teams.find(t => t.team_id === project.team_id)

            return (
              <Card key={project.project_id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle>{project.title}</CardTitle>
                      {project.one_liner && (
                        <CardDescription className="mt-1">{project.one_liner}</CardDescription>
                      )}
                      <div className="mt-2">
                        <Badge variant="outline">{team?.name}</Badge>
                      </div>
                    </div>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {project.repo_url && (
                      <a
                        href={project.repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Repository
                      </a>
                    )}
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Demo
                      </a>
                    )}

                    <div className="pt-3 border-t">
                      <Label className="text-xs text-gray-600 mb-2 block">Update Status</Label>
                      <Select
                        value={project.status}
                        onValueChange={(value: any) =>
                          handleStatusChange(project.project_id, value)
                        }
                        disabled={updateProjectMutation.isPending}
                      >
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="IDEA">Idea</SelectItem>
                          <SelectItem value="BUILDING">Building</SelectItem>
                          <SelectItem value="SUBMITTED">Submitted</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
