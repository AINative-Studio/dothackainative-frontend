"use client"

import { useStore } from '@/lib/store'
import { OrganizerDashboard } from './components/OrganizerDashboard'
import { BuilderDashboard } from './components/BuilderDashboard'
import { JudgeDashboard } from './components/JudgeDashboard'

export default function HackathonsPage() {
  const { data } = useStore()

  if (data.currentRole === 'ORGANIZER') {
    return <OrganizerDashboard />
  }

  if (data.currentRole === 'BUILDER') {
    return <BuilderDashboard />
  }

  if (data.currentRole === 'JUDGE') {
    return <JudgeDashboard />
  }

  return <OrganizerDashboard />
}
