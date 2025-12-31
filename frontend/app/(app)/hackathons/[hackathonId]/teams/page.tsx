"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useHackathonById } from '@/hooks/use-hackathons'
import { useTeamsByHackathon, useCreateTeam, useAddTeamMember, useMembersByTeam } from '@/hooks/use-teams'
import { useTracksByHackathon } from '@/hooks/use-tracks'
import { useParticipantsByHackathon } from '@/hooks/use-participants'
import { Plus, Users, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import type { Team, Participant, Track } from '@/lib/types'

interface TeamCardProps {
  team: Team
  tracks: Track[]
  participants: Participant[]
  showMemberForm: string | null
  setShowMemberForm: (teamId: string | null) => void
  memberData: { participant_id: string; role: 'LEAD' | 'MEMBER' }
  setMemberData: (data: { participant_id: string; role: 'LEAD' | 'MEMBER' }) => void
  handleAddMember: (e: React.FormEvent) => void
  addMemberPending: boolean
}

function TeamCard({
  team,
  tracks,
  participants,
  showMemberForm,
  setShowMemberForm,
  memberData,
  setMemberData,
  handleAddMember,
  addMemberPending,
}: TeamCardProps) {
  const { data: members = [], isLoading: membersLoading } = useMembersByTeam(team.team_id)
  const track = team.track_id ? tracks.find(t => t.track_id === team.track_id) : null

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              {team.name}
            </CardTitle>
            {track && (
              <Badge variant="outline" className="mt-2">
                {track.name}
              </Badge>
            )}
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowMemberForm(team.team_id)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Member
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {showMemberForm === team.team_id && (
          <form onSubmit={handleAddMember} className="mb-4 p-3 border rounded-lg space-y-3">
            <div className="space-y-2">
              <Label htmlFor={`participant-${team.team_id}`}>Participant</Label>
              <Select
                value={memberData.participant_id}
                onValueChange={(value) =>
                  setMemberData({ ...memberData, participant_id: value })
                }
              >
                <SelectTrigger id={`participant-${team.team_id}`}>
                  <SelectValue placeholder="Select participant" />
                </SelectTrigger>
                <SelectContent>
                  {participants.map((p) => (
                    <SelectItem key={p.participant_id} value={p.participant_id}>
                      {p.name} ({p.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`role-${team.team_id}`}>Role</Label>
              <Select
                value={memberData.role}
                onValueChange={(value: any) =>
                  setMemberData({ ...memberData, role: value })
                }
              >
                <SelectTrigger id={`role-${team.team_id}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LEAD">Lead</SelectItem>
                  <SelectItem value="MEMBER">Member</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button type="submit" size="sm" disabled={addMemberPending}>
                {addMemberPending ? (
                  <>
                    <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                    Adding...
                  </>
                ) : (
                  'Add'
                )}
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setShowMemberForm(null)}
                disabled={addMemberPending}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

        {membersLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
          </div>
        ) : members.length === 0 ? (
          <p className="text-sm text-gray-600">No members yet</p>
        ) : (
          <div className="space-y-2">
            {members.map((member) => {
              const participant = participants.find(p => p.participant_id === member.participant_id)
              return (
                <div
                  key={member.participant_id}
                  className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded"
                >
                  <span>{participant?.name}</span>
                  <Badge variant={member.role === 'LEAD' ? 'default' : 'secondary'}>
                    {member.role}
                  </Badge>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function TeamsPage({
  params,
}: {
  params: { hackathonId: string }
}) {
  const { data: hackathon, isLoading: hackathonLoading } = useHackathonById(params.hackathonId)
  const { data: teams = [], isLoading: teamsLoading } = useTeamsByHackathon(params.hackathonId)
  const { data: tracks = [], isLoading: tracksLoading } = useTracksByHackathon(params.hackathonId)
  const { data: participants = [], isLoading: participantsLoading } = useParticipantsByHackathon(params.hackathonId)

  const createTeam = useCreateTeam()
  const addMemberMutation = useAddTeamMember()

  const [showTeamForm, setShowTeamForm] = useState(false)
  const [teamData, setTeamData] = useState({
    name: '',
    track_id: '',
  })

  const [showMemberForm, setShowMemberForm] = useState<string | null>(null)
  const [memberData, setMemberData] = useState({
    participant_id: '',
    role: 'MEMBER' as 'LEAD' | 'MEMBER',
  })

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createTeam.mutateAsync({
        hackathon_id: params.hackathonId,
        name: teamData.name,
        track_id: teamData.track_id || undefined,
      })
      toast.success('Team created successfully')
      setTeamData({ name: '', track_id: '' })
      setShowTeamForm(false)
    } catch (error) {
      console.error('Failed to create team:', error)
      toast.error('Failed to create team', {
        description: error instanceof Error ? error.message : 'Please try again',
      })
    }
  }

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!showMemberForm) return

    try {
      await addMemberMutation.mutateAsync({
        team_id: showMemberForm,
        participant_id: memberData.participant_id,
        role: memberData.role,
      })
      toast.success('Member added successfully')
      setMemberData({ participant_id: '', role: 'MEMBER' })
      setShowMemberForm(null)
    } catch (error) {
      console.error('Failed to add member:', error)
      toast.error('Failed to add member', {
        description: error instanceof Error ? error.message : 'Please try again',
      })
    }
  }

  if (hackathonLoading || teamsLoading || tracksLoading || participantsLoading) {
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Teams - {hackathon.name}</h1>
          <p className="text-gray-600">Create and manage teams</p>
        </div>
        {!showTeamForm && (
          <Button onClick={() => setShowTeamForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Team
          </Button>
        )}
      </div>

      {showTeamForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create Team</CardTitle>
            <CardDescription>Set up a new team for this hackathon</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateTeam} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="team-name">Team Name</Label>
                <Input
                  id="team-name"
                  placeholder="Team Awesome"
                  value={teamData.name}
                  onChange={(e) => setTeamData({ ...teamData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="track">Track (Optional)</Label>
                <Select
                  value={teamData.track_id}
                  onValueChange={(value) => setTeamData({ ...teamData, track_id: value })}
                >
                  <SelectTrigger id="track">
                    <SelectValue placeholder="Select a track" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No track</SelectItem>
                    {tracks.map((track) => (
                      <SelectItem key={track.track_id} value={track.track_id}>
                        {track.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={createTeam.isPending}>
                  {createTeam.isPending ? (
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
                  onClick={() => setShowTeamForm(false)}
                  disabled={createTeam.isPending}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {teams.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-600 mb-4">No teams yet</p>
            {!showTeamForm && (
              <Button onClick={() => setShowTeamForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create First Team
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teams.map((team) => (
            <TeamCard
              key={team.team_id}
              team={team}
              tracks={tracks}
              participants={participants}
              showMemberForm={showMemberForm}
              setShowMemberForm={setShowMemberForm}
              memberData={memberData}
              setMemberData={setMemberData}
              handleAddMember={handleAddMember}
              addMemberPending={addMemberMutation.isPending}
            />
          ))}
        </div>
      )}
    </div>
  )
}
