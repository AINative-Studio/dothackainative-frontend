'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Users, Trophy, FolderKanban, CheckCircle, Target, Award, Code, Zap, Building2, Rocket, ArrowRight, Globe, TrendingUp, Clock, Shield, BarChart } from 'lucide-react'
import HackathonsForYou from '@/components/homepage/HackathonsForYou'
import TopHackathonThemes from '@/components/homepage/TopHackathonThemes'

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNm0wIDEyYzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02bTAgMTJjMy4zMTQgMCA2IDIuNjg2IDYgNnMtMi42ODYgNi02IDYtNi0yLjY4Ni02LTYgMi42ODYtNiA2LTZNMjQgMThjMy4zMTQgMCA2IDIuNjg2IDYgNnMtMi42ODYgNi02IDYtNi0yLjY4NiA2LTYgMi42ODYtNiA2LTZtMCAxMmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNm0wIDEyYzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02TTEyIDE4YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02bTAgMTJjMy4zMTQgMCA2IDIuNjg2IDYgNnMtMi42ODYgNi02IDYtNi0yLjY4NiA2LTYgMi42ODYtNiA2LTZtMCAxMmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9Ii4xIiBvcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div className="text-center lg:text-left">
              <Badge className="mb-6 px-4 py-2 bg-blue-100 text-blue-700 border-blue-200 text-sm font-semibold hover:bg-blue-100">
                Trusted by leading companies worldwide
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-cyan-800 bg-clip-text text-transparent leading-tight">
                Run better public and internal hackathons
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
                Plan and manage your hackathons easily with DotHack's all-in-one software, services, and community.
              </p>
              <div className="flex gap-4 justify-center lg:justify-start flex-wrap mb-8">
                <Link href="/hackathons">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg">
                    Get Started Free <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-2">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl blur-3xl opacity-20"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg"
                  alt="Developers collaborating at a hackathon"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="border-2 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 group cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">Popular</Badge>
                </div>
                <CardTitle className="text-2xl mb-2">Host Public Hackathons</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Get your tools in the hands of developers around the world with DotHack.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/public-hackathons">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg group-hover:shadow-xl transition-all">
                    Host a public hackathon <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-emerald-300 hover:shadow-2xl transition-all duration-300 group cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200">For Teams</Badge>
                </div>
                <CardTitle className="text-2xl mb-2">Host Internal Hackathons</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Drive employee and customer innovation in less time with DotHack for Teams.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/internal-hackathons">
                  <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg group-hover:shadow-xl transition-all">
                    Host internal hackathons <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="text-center text-sm text-slate-500 mt-8">
            <Link href="/contact" className="hover:text-slate-700 transition-colors underline">
              Not sure which is right for you? Contact us for guidance
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-y">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">You're in good hands with DotHack</h2>
            <p className="text-slate-600 max-w-3xl mx-auto">
              We've been powering hackathons since 2009. Our solutions simplify hackathon management, elevate the participant experience, and drive greater business outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                4 million+
              </div>
              <div className="text-slate-600">developer community</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                10,000+
              </div>
              <div className="text-slate-600">hackathons powered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">
                14 years+
              </div>
              <div className="text-slate-600">of hackathon experience</div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-slate-500 mb-6">Join the leading companies that trust DotHack to power their hackathons</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
              <div className="text-2xl font-bold text-slate-400">Microsoft</div>
              <div className="text-2xl font-bold text-slate-400">Google</div>
              <div className="text-2xl font-bold text-slate-400">Meta</div>
              <div className="text-2xl font-bold text-slate-400">AWS</div>
              <div className="text-2xl font-bold text-slate-400">Atlassian</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <HackathonsForYou />
            </div>
            <div>
              <TopHackathonThemes />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <Badge className="mb-4 px-4 py-2 bg-blue-100 text-blue-700 border-blue-200">
                  Public Hackathons
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
                  Run online hackathons that reach more developers
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Maximize your impact with DotHack. Our team can help you create, manage, and market your competitions to ensure success.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 mb-1">Reach 4+ million developers</div>
                      <div className="text-slate-600">Connect with our global community of skilled developers</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 mb-1">Drive product adoption and awareness</div>
                      <div className="text-slate-600">Increase adoption, awareness, feedback, and ideation for your products</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 mb-1">Get end-to-end hackathon support</div>
                      <div className="text-slate-600">From planning to execution, our team is with you every step</div>
                    </div>
                  </div>
                </div>
                <Link href="/public-hackathons">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg">
                    Host a public hackathon <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>

              <div>
                <Badge className="mb-4 px-4 py-2 bg-emerald-100 text-emerald-700 border-emerald-200">
                  Internal Hackathons
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
                  Run internal hackathons that fuel corporate innovation
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  DotHack simplifies hackathon management so you can focus on what truly matters: innovation, collaboration, and employee retention.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 mb-1">Engage employees and customers</div>
                      <div className="text-slate-600">Foster creativity and collaboration across your organization</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 mb-1">Centralize your hackathon operations</div>
                      <div className="text-slate-600">Team building, project submissions, judging, and more in one place</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 mb-1">Increase participation and ROI</div>
                      <div className="text-slate-600">Proven to boost engagement while saving time and resources</div>
                    </div>
                  </div>
                </div>
                <Link href="/internal-hackathons">
                  <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg">
                    Host internal hackathons <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-violet-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-violet-600 mb-2">Microsoft</div>
                    <blockquote className="text-lg text-slate-700 leading-relaxed italic">
                      "We received 300% more submissions than I expected. I was impressed and happy with the results. The team was great to work with, very flexible and accommodating – because of this we ran a very successful hackathon."
                    </blockquote>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Complete hackathon management platform
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Everything you need to run successful hackathons from start to finish
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="border-2 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg">Participant Management</CardTitle>
              <CardDescription>
                Manage participants, assign roles, and organize teams efficiently
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-2 hover:border-emerald-200 hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                <FolderKanban className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg">Project Tracking</CardTitle>
              <CardDescription>
                Track project progress from idea to submission with full visibility
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-2 hover:border-violet-200 hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg">Submission Portal</CardTitle>
              <CardDescription>
                Centralized submission system with search and filtering
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-2 hover:border-orange-200 hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg">
                <Target className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg">Custom Rubrics</CardTitle>
              <CardDescription>
                Create custom judging rubrics with flexible criteria
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-2 hover:border-rose-200 hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-lg">
                <Award className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg">Judging System</CardTitle>
              <CardDescription>
                Streamlined judging workflow with criteria-based scoring
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-2 hover:border-yellow-200 hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center shadow-lg">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg">Live Leaderboard</CardTitle>
              <CardDescription>
                Real-time leaderboard with track filtering and CSV export
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Make a real impact on your business with hackathons
              </h2>
              <p className="text-lg text-slate-300">
                Here are the 5 challenges your business can solve with hackathons
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800 transition-all">
                <CardHeader>
                  <TrendingUp className="h-8 w-8 text-blue-400 mb-3" />
                  <CardTitle className="text-white text-lg">Drive Innovation</CardTitle>
                  <CardDescription className="text-slate-300">
                    Generate new ideas and solutions to business challenges
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800 transition-all">
                <CardHeader>
                  <Users className="h-8 w-8 text-emerald-400 mb-3" />
                  <CardTitle className="text-white text-lg">Boost Engagement</CardTitle>
                  <CardDescription className="text-slate-300">
                    Increase employee engagement and team collaboration
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800 transition-all">
                <CardHeader>
                  <Rocket className="h-8 w-8 text-violet-400 mb-3" />
                  <CardTitle className="text-white text-lg">Product Adoption</CardTitle>
                  <CardDescription className="text-slate-300">
                    Get developers building with your APIs and tools
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800 transition-all">
                <CardHeader>
                  <Clock className="h-8 w-8 text-orange-400 mb-3" />
                  <CardTitle className="text-white text-lg">Faster Time to Market</CardTitle>
                  <CardDescription className="text-slate-300">
                    Accelerate development and prototype validation
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800 transition-all">
                <CardHeader>
                  <Shield className="h-8 w-8 text-rose-400 mb-3" />
                  <CardTitle className="text-white text-lg">Talent Discovery</CardTitle>
                  <CardDescription className="text-slate-300">
                    Identify and recruit top developer talent
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800 transition-all">
                <CardHeader>
                  <BarChart className="h-8 w-8 text-cyan-400 mb-3" />
                  <CardTitle className="text-white text-lg">Brand Awareness</CardTitle>
                  <CardDescription className="text-slate-300">
                    Build your brand in the developer community
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
                Run your next great hackathon
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Fill out the form below to book your demo today
              </p>
            </div>

            <Card className="border-2 shadow-xl max-w-2xl mx-auto">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-semibold text-slate-700">
                        First Name *
                      </label>
                      <Input id="firstName" placeholder="John" className="border-2" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-semibold text-slate-700">
                        Last Name *
                      </label>
                      <Input id="lastName" placeholder="Doe" className="border-2" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                      Work Email *
                    </label>
                    <Input id="email" type="email" placeholder="john@company.com" className="border-2" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-semibold text-slate-700">
                      Company *
                    </label>
                    <Input id="company" placeholder="Your Company" className="border-2" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="hackathonType" className="text-sm font-semibold text-slate-700">
                      I'm interested in *
                    </label>
                    <select id="hackathonType" className="w-full px-3 py-2 border-2 rounded-md" required>
                      <option value="">Select an option</option>
                      <option value="public">Public Hackathons</option>
                      <option value="internal">Internal Hackathons</option>
                      <option value="both">Both</option>
                    </select>
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg">
                    Request Demo
                  </Button>
                  <p className="text-xs text-slate-500 text-center">
                    By submitting this form, you agree to our Terms of Service and Privacy Policy
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 hover:shadow-lg transition-all">
              <CardHeader>
                <Code className="h-10 w-10 text-blue-600 mb-3" />
                <CardTitle className="text-xl mb-2">Hackathon Planning Guides</CardTitle>
                <CardDescription>
                  Best practice guides for successful virtual and in-person hackathons
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/docs" className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center group">
                  Download guides <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-all">
              <CardHeader>
                <Zap className="h-10 w-10 text-emerald-600 mb-3" />
                <CardTitle className="text-xl mb-2">Latest Blog Posts</CardTitle>
                <CardDescription>
                  Get the latest news, updates, and tips for hackathon planning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/docs" className="text-emerald-600 hover:text-emerald-700 font-semibold inline-flex items-center group">
                  View the blog <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-all">
              <CardHeader>
                <Trophy className="h-10 w-10 text-violet-600 mb-3" />
                <CardTitle className="text-xl mb-2">Customer Success Stories</CardTitle>
                <CardDescription>
                  Don't take our word for it. See for yourself why customers love us
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/docs" className="text-violet-600 hover:text-violet-700 font-semibold inline-flex items-center group">
                  See customer stories <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to run your hackathon?
          </h2>
          <p className="text-xl mb-8 text-blue-50 max-w-2xl mx-auto">
            Join thousands of companies using DotHack to power successful hackathons
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/hackathons">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-slate-50 shadow-xl text-base px-8 py-6">
                Get Started Free <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-base px-8 py-6">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
