"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useStore } from '@/lib/store'
import { Participant, HackathonParticipant, Invitation } from '@/lib/types'
import { Plus, Mail } from 'lucide-react'

export default function ParticipantsPage({
  params,
}: {
  params: { hackathonId: string }
}) {
  const { data, addParticipant, addHackathonParticipant, addInvitation, getCurrentHackathonStatus } = useStore()
  const hackathon = getCurrentHackathonStatus(params.hackathonId)

  const [showForm, setShowForm] = useState(false)
  const [showInviteDialog, setShowInviteDialog] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    org: '',
    role: 'BUILDER' as 'BUILDER' | 'JUDGE' | 'MENTOR' | 'ORGANIZER' | 'SPONSOR',
  })
  const [inviteData, setInviteData] = useState({
    email: '',
    role: 'JUDGE' as 'JUDGE' | 'MENTOR' | 'SPONSOR',
    message: '',
  })

  if (!hackathon) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-600">Hackathon not found</p>
      </div>
    )
  }

  const hackathonParticipants = data.hackathonParticipants
    .filter(hp => hp.hackathon_id === params.hackathonId)
    .map(hp => {
      const participant = data.participants.find(p => p.participant_id === hp.participant_id)
      return { ...hp, participant }
    })

  const invitations = data.invitations.filter(inv => inv.hackathon_id === params.hackathonId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    let existingParticipant = data.participants.find(p => p.email === formData.email)

    if (!existingParticipant) {
      existingParticipant = {
        participant_id: `part_${Date.now()}`,
        name: formData.name,
        email: formData.email,
        org: formData.org || undefined,
      }
      addParticipant(existingParticipant)
    }

    const alreadyAdded = data.hackathonParticipants.find(
      hp => hp.hackathon_id === params.hackathonId && hp.participant_id === existingParticipant!.participant_id
    )

    if (!alreadyAdded) {
      const hp: HackathonParticipant = {
        hackathon_id: params.hackathonId,
        participant_id: existingParticipant.participant_id,
        role: formData.role,
      }
      addHackathonParticipant(hp)
    }

    setFormData({ name: '', email: '', org: '', role: 'BUILDER' })
    setShowForm(false)
  }

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()

    const newInvitation: Invitation = {
      invitation_id: `inv_${Date.now()}`,
      hackathon_id: params.hackathonId,
      email: inviteData.email,
      role: inviteData.role,
      status: 'PENDING',
      message: inviteData.message || undefined,
      created_at: new Date().toISOString(),
    }

    addInvitation(newInvitation)
    setInviteData({ email: '', role: 'JUDGE', message: '' })
    setShowInviteDialog(false)
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'ORGANIZER': return 'bg-blue-100 text-blue-800'
      case 'JUDGE': return 'bg-violet-100 text-violet-800'
      case 'MENTOR': return 'bg-emerald-100 text-emerald-800'
      case 'BUILDER': return 'bg-orange-100 text-orange-800'
      case 'SPONSOR': return 'bg-cyan-100 text-cyan-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-amber-100 text-amber-800'
      case 'ACCEPTED': return 'bg-emerald-100 text-emerald-800'
      case 'DECLINED': return 'bg-rose-100 text-rose-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Participants - {hackathon.name}
          </h1>
          <p className="text-slate-600 mt-2">Manage participants, invite judges, mentors, and sponsors</p>
        </div>
        <div className="flex gap-3">
          {!showForm && (
            <Button onClick={() => setShowForm(true)} variant="outline" className="border-2">
              <Plus className="h-4 w-4 mr-2" />
              Add Participant
            </Button>
          )}
          <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/30">
                <Mail className="h-4 w-4 mr-2" />
                Send Invitation
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Send Invitation</DialogTitle>
                <DialogDescription>Invite judges, mentors, or sponsors to this hackathon</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleInvite} className="space-y-4">
                <div>
                  <Label htmlFor="invite-email">Email Address</Label>
                  <Input
                    id="invite-email"
                    type="email"
                    value={inviteData.email}
                    onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                    placeholder="judge@example.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="invite-role">Role</Label>
                  <Select
                    value={inviteData.role}
                    onValueChange={(value: any) => setInviteData({ ...inviteData, role: value })}
                  >
                    <SelectTrigger id="invite-role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="JUDGE">Judge</SelectItem>
                      <SelectItem value="MENTOR">Mentor</SelectItem>
                      <SelectItem value="SPONSOR">Sponsor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="invite-message">Personal Message (Optional)</Label>
                  <Textarea
                    id="invite-message"
                    value={inviteData.message}
                    onChange={(e) => setInviteData({ ...inviteData, message: e.target.value })}
                    placeholder="Add a personal message to the invitation..."
                    rows={3}
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setShowInviteDialog(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600">
                    Send Invite
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {showForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add Participant</CardTitle>
            <CardDescription>Add a new participant to this hackathon</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org">Organization (Optional)</Label>
                <Input
                  id="org"
                  placeholder="Acme Corp"
                  value={formData.org}
                  onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value: any) => setFormData({ ...formData, role: value })}
                >
                  <SelectTrigger id="role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BUILDER">Builder</SelectItem>
                    <SelectItem value="JUDGE">Judge</SelectItem>
                    <SelectItem value="MENTOR">Mentor</SelectItem>
                    <SelectItem value="SPONSOR">Sponsor</SelectItem>
                    <SelectItem value="ORGANIZER">Organizer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button type="submit">Add</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="participants" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
          <TabsTrigger value="participants">Participants</TabsTrigger>
          <TabsTrigger value="invitations">
            Invitations
            {invitations.length > 0 && (
              <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                {invitations.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="participants">
          {hackathonParticipants.length === 0 ? (
            <Card className="border-2 border-dashed">
              <CardContent className="text-center py-12">
                <p className="text-slate-600 mb-4">No participants yet</p>
                {!showForm && (
                  <Button onClick={() => setShowForm(true)} variant="outline" className="border-2">
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Participant
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="border-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hackathonParticipants.map((hp) => (
                    <TableRow key={hp.participant_id}>
                      <TableCell className="font-medium">{hp.participant?.name}</TableCell>
                      <TableCell>{hp.participant?.email}</TableCell>
                      <TableCell>{hp.participant?.org || '-'}</TableCell>
                      <TableCell>
                        <Badge className={getRoleBadgeColor(hp.role)}>
                          {hp.role}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="invitations">
          {invitations.length === 0 ? (
            <Card className="border-2 border-dashed">
              <CardContent className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <p className="text-slate-600 mb-4">No invitations sent yet</p>
                <Button
                  onClick={() => setShowInviteDialog(true)}
                  variant="outline"
                  className="border-2"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send First Invitation
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sent</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invitations.map((inv) => (
                    <TableRow key={inv.invitation_id}>
                      <TableCell className="font-medium">{inv.email}</TableCell>
                      <TableCell>
                        <Badge className={getRoleBadgeColor(inv.role)}>
                          {inv.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(inv.status)}>
                          {inv.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {new Date(inv.created_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
