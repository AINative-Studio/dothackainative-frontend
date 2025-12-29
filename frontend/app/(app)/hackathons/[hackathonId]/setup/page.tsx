"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useStore } from '@/lib/store'
import { Track, Rubric, HackathonStatus } from '@/lib/types'
import { Plus, X } from 'lucide-react'

export default function SetupPage({
  params,
}: {
  params: { hackathonId: string }
}) {
  const { data, getCurrentHackathonStatus, addTrack, addRubric, addHackathon } = useStore()
  const hackathon = getCurrentHackathonStatus(params.hackathonId)

  const [showTrackForm, setShowTrackForm] = useState(false)
  const [trackData, setTrackData] = useState({ name: '', description: '' })

  const [showRubricForm, setShowRubricForm] = useState(false)
  const [rubricData, setRubricData] = useState({ title: '', criteria_json: '' })

  const tracks = data.tracks.filter(t => t.hackathon_id === params.hackathonId)
  const rubrics = data.rubrics.filter(r => r.hackathon_id === params.hackathonId)

  if (!hackathon) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-600">Hackathon not found</p>
      </div>
    )
  }

  const handleAddTrack = (e: React.FormEvent) => {
    e.preventDefault()
    const newTrack: Track = {
      track_id: `track_${Date.now()}`,
      hackathon_id: params.hackathonId,
      name: trackData.name,
      description: trackData.description,
    }
    addTrack(newTrack)
    setTrackData({ name: '', description: '' })
    setShowTrackForm(false)
  }

  const handleAddRubric = (e: React.FormEvent) => {
    e.preventDefault()
    const newRubric: Rubric = {
      rubric_id: `rubric_${Date.now()}`,
      hackathon_id: params.hackathonId,
      title: rubricData.title,
      criteria_json: rubricData.criteria_json,
    }
    addRubric(newRubric)
    setRubricData({ title: '', criteria_json: '' })
    setShowRubricForm(false)
  }

  const handleStatusChange = (newStatus: HackathonStatus) => {
    addHackathon({
      ...hackathon,
      status: newStatus,
      created_at: new Date().toISOString(),
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DRAFT': return 'bg-gray-100 text-gray-800'
      case 'LIVE': return 'bg-green-100 text-green-800'
      case 'CLOSED': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Setup - {hackathon.name}</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Event Status</CardTitle>
                <CardDescription>Control the hackathon lifecycle</CardDescription>
              </div>
              <Badge className={getStatusColor(hackathon.status)}>
                {hackathon.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Status changes are append-only and tracked with history
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={hackathon.status === 'DRAFT' ? 'default' : 'outline'}
                  onClick={() => handleStatusChange('DRAFT')}
                >
                  Draft
                </Button>
                <Button
                  size="sm"
                  variant={hackathon.status === 'LIVE' ? 'default' : 'outline'}
                  onClick={() => handleStatusChange('LIVE')}
                >
                  Live
                </Button>
                <Button
                  size="sm"
                  variant={hackathon.status === 'CLOSED' ? 'default' : 'outline'}
                  onClick={() => handleStatusChange('CLOSED')}
                >
                  Closed
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Tracks</CardTitle>
                <CardDescription>Organize projects by theme or category</CardDescription>
              </div>
              {!showTrackForm && (
                <Button size="sm" onClick={() => setShowTrackForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Track
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {showTrackForm && (
              <form onSubmit={handleAddTrack} className="mb-6 p-4 border rounded-lg space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="track-name">Name</Label>
                  <Input
                    id="track-name"
                    placeholder="AI & Machine Learning"
                    value={trackData.name}
                    onChange={(e) => setTrackData({ ...trackData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="track-desc">Description</Label>
                  <Textarea
                    id="track-desc"
                    placeholder="Projects using AI/ML technologies..."
                    value={trackData.description}
                    onChange={(e) => setTrackData({ ...trackData, description: e.target.value })}
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" size="sm">Add</Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => setShowTrackForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}

            {tracks.length === 0 ? (
              <p className="text-sm text-gray-600">No tracks yet</p>
            ) : (
              <div className="space-y-3">
                {tracks.map((track) => (
                  <div key={track.track_id} className="p-3 border rounded-lg">
                    <h4 className="font-semibold">{track.name}</h4>
                    <p className="text-sm text-gray-600">{track.description}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Judging Rubrics</CardTitle>
                <CardDescription>Define evaluation criteria</CardDescription>
              </div>
              {!showRubricForm && (
                <Button size="sm" onClick={() => setShowRubricForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Rubric
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {showRubricForm && (
              <form onSubmit={handleAddRubric} className="mb-6 p-4 border rounded-lg space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="rubric-title">Title</Label>
                  <Input
                    id="rubric-title"
                    placeholder="Main Rubric"
                    value={rubricData.title}
                    onChange={(e) => setRubricData({ ...rubricData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rubric-criteria">Criteria (JSON)</Label>
                  <Textarea
                    id="rubric-criteria"
                    placeholder='{"innovation": {"weight": 30, "max": 10}, "execution": {"weight": 40, "max": 10}}'
                    value={rubricData.criteria_json}
                    onChange={(e) => setRubricData({ ...rubricData, criteria_json: e.target.value })}
                    rows={6}
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Enter criteria as JSON with weights and max scores
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" size="sm">Add</Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => setShowRubricForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}

            {rubrics.length === 0 ? (
              <p className="text-sm text-gray-600">No rubrics yet</p>
            ) : (
              <div className="space-y-3">
                {rubrics.map((rubric) => (
                  <div key={rubric.rubric_id} className="p-3 border rounded-lg">
                    <h4 className="font-semibold mb-2">{rubric.title}</h4>
                    <pre className="text-xs bg-gray-50 p-2 rounded overflow-x-auto">
                      {rubric.criteria_json}
                    </pre>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
