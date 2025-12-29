"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'
import {
  Hackathon,
  Track,
  Participant,
  HackathonParticipant,
  Team,
  TeamMember,
  Project,
  Submission,
  Rubric,
  Score,
  Prize,
  Invitation,
  UserRole,
} from './types'

type StoreData = {
  hackathons: Hackathon[]
  tracks: Track[]
  participants: Participant[]
  hackathonParticipants: HackathonParticipant[]
  teams: Team[]
  teamMembers: TeamMember[]
  projects: Project[]
  submissions: Submission[]
  rubrics: Rubric[]
  scores: Score[]
  prizes: Prize[]
  invitations: Invitation[]
  currentRole: UserRole
}

type StoreContextType = {
  data: StoreData
  setCurrentRole: (role: UserRole) => void
  addHackathon: (hackathon: Hackathon) => void
  addTrack: (track: Track) => void
  addParticipant: (participant: Participant) => void
  addHackathonParticipant: (hp: HackathonParticipant) => void
  addTeam: (team: Team) => void
  addTeamMember: (tm: TeamMember) => void
  addProject: (project: Project) => void
  updateProject: (projectId: string, updates: Partial<Project>) => void
  addSubmission: (submission: Submission) => void
  addRubric: (rubric: Rubric) => void
  addScore: (score: Score) => void
  addPrize: (prize: Prize) => void
  addInvitation: (invitation: Invitation) => void
  updateInvitation: (invitationId: string, updates: Partial<Invitation>) => void
  getCurrentHackathonStatus: (hackathonId: string) => Hackathon | undefined
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<StoreData>({
    hackathons: [],
    tracks: [],
    participants: [],
    hackathonParticipants: [],
    teams: [],
    teamMembers: [],
    projects: [],
    submissions: [],
    rubrics: [],
    scores: [],
    prizes: [],
    invitations: [],
    currentRole: 'ORGANIZER',
  })

  const setCurrentRole = (role: UserRole) => {
    setData(prev => ({ ...prev, currentRole: role }))
  }

  const addHackathon = (hackathon: Hackathon) => {
    setData(prev => ({ ...prev, hackathons: [...prev.hackathons, hackathon] }))
  }

  const addTrack = (track: Track) => {
    setData(prev => ({ ...prev, tracks: [...prev.tracks, track] }))
  }

  const addParticipant = (participant: Participant) => {
    setData(prev => ({ ...prev, participants: [...prev.participants, participant] }))
  }

  const addHackathonParticipant = (hp: HackathonParticipant) => {
    setData(prev => ({
      ...prev,
      hackathonParticipants: [...prev.hackathonParticipants, hp],
    }))
  }

  const addTeam = (team: Team) => {
    setData(prev => ({ ...prev, teams: [...prev.teams, team] }))
  }

  const addTeamMember = (tm: TeamMember) => {
    setData(prev => ({ ...prev, teamMembers: [...prev.teamMembers, tm] }))
  }

  const addProject = (project: Project) => {
    setData(prev => ({ ...prev, projects: [...prev.projects, project] }))
  }

  const updateProject = (projectId: string, updates: Partial<Project>) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p =>
        p.project_id === projectId ? { ...p, ...updates } : p
      ),
    }))
  }

  const addSubmission = (submission: Submission) => {
    setData(prev => ({ ...prev, submissions: [...prev.submissions, submission] }))
  }

  const addRubric = (rubric: Rubric) => {
    setData(prev => ({ ...prev, rubrics: [...prev.rubrics, rubric] }))
  }

  const addScore = (score: Score) => {
    setData(prev => ({ ...prev, scores: [...prev.scores, score] }))
  }

  const addPrize = (prize: Prize) => {
    setData(prev => ({ ...prev, prizes: [...prev.prizes, prize] }))
  }

  const addInvitation = (invitation: Invitation) => {
    setData(prev => ({ ...prev, invitations: [...prev.invitations, invitation] }))
  }

  const updateInvitation = (invitationId: string, updates: Partial<Invitation>) => {
    setData(prev => ({
      ...prev,
      invitations: prev.invitations.map(i =>
        i.invitation_id === invitationId ? { ...i, ...updates } : i
      ),
    }))
  }

  const getCurrentHackathonStatus = (hackathonId: string): Hackathon | undefined => {
    const hackathonEntries = data.hackathons
      .filter(h => h.hackathon_id === hackathonId)
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    return hackathonEntries[hackathonEntries.length - 1]
  }

  return (
    <StoreContext.Provider
      value={{
        data,
        setCurrentRole,
        addHackathon,
        addTrack,
        addParticipant,
        addHackathonParticipant,
        addTeam,
        addTeamMember,
        addProject,
        updateProject,
        addSubmission,
        addRubric,
        addScore,
        addPrize,
        addInvitation,
        updateInvitation,
        getCurrentHackathonStatus,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within StoreProvider')
  }
  return context
}
