'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'

interface Theme {
  id: string
  theme_name: string
  hackathon_count: number
  total_prizes: number
  display_order: number
}

export default function TopHackathonThemes() {
  const [themes, setThemes] = useState<Theme[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchThemes() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('hackathon_themes')
        .select('*')
        .order('display_order')

      if (data) {
        setThemes(data)
      }
      setLoading(false)
    }

    fetchThemes()
  }, [])

  const formatPrize = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount)
  }

  if (loading) {
    return (
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-6">Top hackathon themes</h2>
        <Card className="overflow-hidden">
          <div className="animate-pulse">
            <div className="bg-slate-50 px-6 py-4 border-b">
              <div className="h-6 bg-slate-200 rounded w-1/2"></div>
            </div>
            <div className="divide-y">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="px-6 py-4 flex gap-4">
                  <div className="h-5 bg-slate-200 rounded w-8"></div>
                  <div className="h-5 bg-slate-200 rounded w-32"></div>
                  <div className="h-5 bg-slate-200 rounded w-16 ml-auto"></div>
                  <div className="h-5 bg-slate-200 rounded w-24"></div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-900 mb-6">Top hackathon themes</h2>

      <Card className="overflow-hidden border-2">
        <div className="bg-slate-50 px-6 py-4 border-b">
          <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-slate-600">
            <div className="col-span-1"></div>
            <div className="col-span-5">Theme</div>
            <div className="col-span-3 text-right">Hackathons</div>
            <div className="col-span-3 text-right">Total prizes</div>
          </div>
        </div>

        <div className="divide-y">
          {themes.map((theme, index) => (
            <Link
              key={theme.id}
              href="/public-hackathons"
              className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-slate-50 transition-colors items-center group"
            >
              <div className="col-span-1 text-slate-500 font-medium">
                {index + 1}.
              </div>

              <div className="col-span-5">
                <Badge
                  variant="secondary"
                  className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 cursor-pointer"
                >
                  {theme.theme_name}
                </Badge>
              </div>

              <div className="col-span-3 text-right font-semibold text-slate-900">
                {theme.hackathon_count}
              </div>

              <div className="col-span-2 text-right font-semibold text-slate-900">
                {formatPrize(theme.total_prizes)}
              </div>

              <div className="col-span-1 text-right">
                <ArrowRight className="h-4 w-4 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  )
}
