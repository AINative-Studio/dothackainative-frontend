"use client"

import { OrganizerDashboard } from './components/OrganizerDashboard'
import { BuilderDashboard } from './components/BuilderDashboard'
import { JudgeDashboard } from './components/JudgeDashboard'

export default function HackathonsPage() {
  // TODO: Replace with proper auth context when available
  // For now, default to OrganizerDashboard
  // Role-based routing will be implemented when auth is integrated
  const currentRole = 'ORGANIZER' // This should come from auth context

  if (currentRole === 'ORGANIZER') {
    return <OrganizerDashboard />
  }

  if (currentRole === 'BUILDER') {
    return <BuilderDashboard />
  }

  if (currentRole === 'JUDGE') {
    return <JudgeDashboard />
  }

  return <OrganizerDashboard />
}
