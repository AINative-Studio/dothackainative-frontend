"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useStore } from '@/lib/store'
import { Submission } from '@/lib/types'
import { Plus, Search, AlertCircle } from 'lucide-react'

export default function SubmissionsPage({
  params,
}: {
  params: { hackathonId: string }
}) {
  const { data, addSubmission, updateProject, getCurrentHackathonStatus } = useStore()
  const hackathon = getCurrentHackathonStatus(params.hackathonId)

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    project_id: '',
    submission_text: '',
    artifact_links_json: '',
  })
  const [searchQuery, setSearchQuery] = useState('')

  if (!hackathon) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-600">Hackathon not found</p>
      </div>
    )
  }

  const projects = data.projects.filter(p => p.hackathon_id === params.hackathonId)
  const allSubmissions = data.submissions.filter(s =>
    projects.some(p => p.project_id === s.project_id)
  )

  const filteredSubmissions = searchQuery
    ? allSubmissions.filter(s =>
        s.submission_text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.artifact_links_json.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allSubmissions

  const isClosed = hackathon.status === 'CLOSED'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isClosed) return

    const newSubmission: Submission = {
      submission_id: `sub_${Date.now()}`,
      project_id: formData.project_id,
      submitted_at: new Date().toISOString(),
      submission_text: formData.submission_text,
      artifact_links_json: formData.artifact_links_json,
    }
    addSubmission(newSubmission)
    updateProject(formData.project_id, { status: 'SUBMITTED' })
    setFormData({ project_id: '', submission_text: '', artifact_links_json: '' })
    setShowForm(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Submissions - {hackathon.name}</h1>
          <p className="text-gray-600">View and search project submissions</p>
        </div>
        {!showForm && !isClosed && (
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Submit Project
          </Button>
        )}
      </div>

      {isClosed && (
        <Alert className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            This hackathon is closed. Submissions are no longer accepted.
          </AlertDescription>
        </Alert>
      )}

      {showForm && !isClosed && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Submit Project</CardTitle>
            <CardDescription>Submit your team's work for judging</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project">Project</Label>
                <Select
                  value={formData.project_id}
                  onValueChange={(value) => setFormData({ ...formData, project_id: value })}
                >
                  <SelectTrigger id="project">
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects
                      .filter(p => p.status !== 'IDEA')
                      .map((project) => (
                        <SelectItem key={project.project_id} value={project.project_id}>
                          {project.title}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="submission_text">Submission Narrative</Label>
                <Textarea
                  id="submission_text"
                  placeholder="Describe your project, what you built, challenges faced, and outcomes..."
                  rows={8}
                  value={formData.submission_text}
                  onChange={(e) => setFormData({ ...formData, submission_text: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="artifact_links_json">Artifact Links (JSON)</Label>
                <Textarea
                  id="artifact_links_json"
                  placeholder='{"video": "https://youtube.com/...", "slides": "https://..."}'
                  rows={4}
                  value={formData.artifact_links_json}
                  onChange={(e) =>
                    setFormData({ ...formData, artifact_links_json: e.target.value })
                  }
                  required
                />
                <p className="text-xs text-gray-500">
                  Provide links to demo videos, slides, and other artifacts as JSON
                </p>
              </div>
              <div className="flex gap-2">
                <Button type="submit">Submit</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search submissions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {filteredSubmissions.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-600 mb-4">
              {searchQuery ? 'No submissions match your search' : 'No submissions yet'}
            </p>
            {!showForm && !isClosed && !searchQuery && (
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Submit First Project
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {filteredSubmissions.map((submission) => {
            const project = projects.find(p => p.project_id === submission.project_id)
            const team = project ? data.teams.find(t => t.team_id === project.team_id) : null

            return (
              <Card key={submission.submission_id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{project?.title}</CardTitle>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline">{team?.name}</Badge>
                        <Badge variant="secondary">
                          {new Date(submission.submitted_at).toLocaleString()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Narrative</h4>
                      <p className="text-sm text-gray-600 whitespace-pre-wrap">
                        {submission.submission_text}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Artifacts</h4>
                      <pre className="text-xs bg-gray-50 p-3 rounded overflow-x-auto">
                        {submission.artifact_links_json}
                      </pre>
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
