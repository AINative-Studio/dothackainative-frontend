"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Code as Code2, Settings, Users, UsersRound, FolderKanban, FileCheck, Gavel, Trophy, Award, Key } from 'lucide-react'
import { useStore } from '@/lib/store'
import { UserRole } from '@/lib/types'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data, setCurrentRole } = useStore()
  const pathname = usePathname()

  const hackathonMatch = pathname.match(/\/hackathons\/([^\/]+)/)
  const hackathonId = hackathonMatch ? hackathonMatch[1] : null

  const navLinks = [
    { href: '/hackathons', label: 'Hackathons', icon: Code2, roles: ['ORGANIZER', 'BUILDER', 'JUDGE'] },
    { href: '/api-settings', label: 'API', icon: Key, roles: ['ORGANIZER'] },
  ]

  const hackathonLinks = hackathonId ? [
    { href: `/hackathons/${hackathonId}/setup`, label: 'Setup', icon: Settings, roles: ['ORGANIZER'] },
    { href: `/hackathons/${hackathonId}/participants`, label: 'Participants', icon: Users, roles: ['ORGANIZER'] },
    { href: `/hackathons/${hackathonId}/teams`, label: 'Teams', icon: UsersRound, roles: ['ORGANIZER', 'BUILDER'] },
    { href: `/hackathons/${hackathonId}/projects`, label: 'Projects', icon: FolderKanban, roles: ['ORGANIZER', 'BUILDER'] },
    { href: `/hackathons/${hackathonId}/submissions`, label: 'Submissions', icon: FileCheck, roles: ['ORGANIZER', 'BUILDER', 'JUDGE'] },
    { href: `/hackathons/${hackathonId}/judging`, label: 'Judging', icon: Gavel, roles: ['ORGANIZER', 'JUDGE'] },
    { href: `/hackathons/${hackathonId}/leaderboard`, label: 'Leaderboard', icon: Trophy, roles: ['ORGANIZER', 'BUILDER', 'JUDGE'] },
    { href: `/hackathons/${hackathonId}/prizes`, label: 'Prizes', icon: Award, roles: ['ORGANIZER'] },
  ] : []

  const visibleLinks = [...navLinks, ...hackathonLinks].filter(link =>
    link.roles.includes(data.currentRole)
  )

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-lg shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/hackathons" className="flex items-center gap-2 font-bold text-xl group">
              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-1.5 rounded-lg group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all">
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                DotHack
              </span>
            </Link>

            <div className="flex items-center gap-6">
              <nav className="hidden md:flex items-center gap-1">
                {visibleLinks.map((link) => {
                  const Icon = link.icon
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {link.label}
                    </Link>
                  )
                })}
              </nav>

              <Select
                value={data.currentRole}
                onValueChange={(value) => setCurrentRole(value as UserRole)}
              >
                <SelectTrigger className="w-[140px] border-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ORGANIZER">Organizer</SelectItem>
                  <SelectItem value="BUILDER">Builder</SelectItem>
                  <SelectItem value="JUDGE">Judge</SelectItem>
                </SelectContent>
              </Select>

              <Link href="/">
                <Button variant="outline" size="sm" className="border-2">
                  Marketing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}
