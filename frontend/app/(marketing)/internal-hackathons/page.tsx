'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Lightbulb, Clock, TrendingUp, DollarSign, ArrowRight, Users, Award, BarChart3, Shield, CheckCircle, FileText, Newspaper, BookOpen } from 'lucide-react'

export default function InternalHackathonsPage() {
  return (
    <div>
      <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNm0wIDEyYzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02bTAgMTJjMy4zMTQgMCA2IDIuNjg2IDYgNnMtMi42ODYgNi02IDYtNi0yLjY4Ni02LTYgMi42ODYtNiA2LTZNMjQgMThjMy4zMTQgMCA2IDIuNjg2IDYgNnMtMi42ODYgNi02IDYtNi0yLjY4Ni02LTYgMi42ODYtNiA2LTZtMCAxMmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNm0wIDEyYzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02TTEyIDE4YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02bTAgMTJjMy4zMTQgMCA2IDIuNjg2IDYgNnMtMi42ODYgNi02IDYtNi0yLjY4Ni02LTYgMi42ODYtNiA2LTZtMCAxMmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9Ii4xIiBvcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-emerald-800 to-teal-800 bg-clip-text text-transparent leading-tight">
              A better way to manage your internal hackathons
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-10 leading-relaxed max-w-3xl mx-auto">
              Set up, manage, and streamline private employee and customer hackathons with DotHack for Teams
            </p>
            <div className="flex gap-4 justify-center flex-wrap mb-12">
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg text-lg px-8 py-6">
                  Book a demo <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
            <p className="text-sm text-slate-500 mb-8">Join the leading companies that trust DotHack to power their hackathons</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
              <div className="text-2xl font-bold text-slate-400">Microsoft</div>
              <div className="text-2xl font-bold text-slate-400">Google</div>
              <div className="text-2xl font-bold text-slate-400">Meta</div>
              <div className="text-2xl font-bold text-slate-400">AWS</div>
              <div className="text-2xl font-bold text-slate-400">Okta</div>
              <div className="text-2xl font-bold text-slate-400">Atlassian</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 px-4 py-2 bg-emerald-100 text-emerald-700 border-emerald-200">
                  Powerful Platform
                </Badge>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
                  Run seamless internal hackathons with an all-in-one platform
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  From registration and team building to collecting and judging submissions. Do it all effortlessly in a unified online hackathon platform.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-md">
                      <Lightbulb className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 mb-1">Foster innovation</div>
                      <div className="text-sm text-slate-600">Inspire creative solutions</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-md">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 mb-1">Save organizer time</div>
                      <div className="text-sm text-slate-600">Automate workflows</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-md">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 mb-1">Increase participation</div>
                      <div className="text-sm text-slate-600">Boost engagement</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0 shadow-md">
                      <DollarSign className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 mb-1">Boost event ROI</div>
                      <div className="text-sm text-slate-600">Maximize value</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-2xl blur-3xl opacity-20"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"
                    alt="Team collaboration during internal hackathon"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-slate-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl blur-3xl opacity-20"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src="https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg"
                    alt="Hackathon template picker interface"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <Badge className="mb-4 px-4 py-2 bg-blue-100 text-blue-700 border-blue-200">
                  Hackathon Templates
                </Badge>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
                  Publish complete hackathons in just a few clicks
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Get your hackathon ready in minutes with our library of hackathon-planning templates.
                </p>
                <Link href="/contact">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg">
                    Book a demo <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 px-4 py-2 bg-violet-100 text-violet-700 border-violet-200">
                  Feature Spotlight
                </Badge>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
                  Generative AI hackathon template
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Quickly set up AI hackathons and empower participants to start building and innovating with AI.
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-400 to-purple-400 rounded-2xl blur-3xl opacity-20"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src="https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg"
                    alt="AI-powered hackathon setup"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-2xl blur-3xl opacity-20"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg"
                    alt="Participants collaborating and submitting projects"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <Badge className="mb-4 px-4 py-2 bg-emerald-100 text-emerald-700 border-emerald-200">
                  Participant Experience
                </Badge>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
                  Drive greater participation and innovation
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Participants can join hackathons, find teams, and submit projects on DotHack's online hackathon platform—in just a few clicks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-900 via-slate-900 to-emerald-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 mb-12 border border-white/20">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-1 h-24 bg-gradient-to-b from-emerald-400 to-teal-400 rounded-full"></div>
                <div>
                  <p className="text-xl md:text-2xl leading-relaxed mb-4">
                    "Over 50% of the submitted projects had immediate production capacity after switching to DotHack for Teams...It blew me away and it blew our executives away."
                  </p>
                  <p className="text-emerald-300 font-semibold">– David Green, VP of INNOVATION</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl blur-3xl opacity-20"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-800">
                  <Image
                    src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                    alt="Hackathon judging interface"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              <div>
                <Badge className="mb-4 px-4 py-2 bg-blue-100 text-blue-700 border-blue-200">
                  Judging
                </Badge>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  Delight your hackathon judges
                </h2>
                <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                  Deliver a seamless judging experience with a hackathon platform that makes it easy to view, assess, and award great projects.
                </p>
                <Link href="/contact">
                  <Button size="lg" variant="secondary" className="bg-white text-slate-900 hover:bg-slate-50 shadow-xl">
                    Book a demo <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 px-4 py-2 bg-orange-100 text-orange-700 border-orange-200">
                  Reporting
                </Badge>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
                  Measure and track ROI of your internal hackathons
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Quantify the results of your efforts and share them across your organization.
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-400 rounded-2xl blur-3xl opacity-20"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg"
                    alt="Analytics dashboard showing hackathon metrics"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 px-4 py-2 bg-slate-100 text-slate-700 border-slate-200">
              Security
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
              Rest easy with DotHack's enterprise-grade security
            </h2>
            <p className="text-lg text-slate-600 mb-12 leading-relaxed">
              Get peace of mind knowing this hackathon platform is ISO 27001 and SOC 2 compliant and adheres to stringent security best practices.
            </p>
            <div className="flex justify-center gap-8 flex-wrap">
              <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Shield className="h-12 w-12 text-white" />
                </div>
                <div className="text-xl font-bold text-slate-900">ISO 27001</div>
                <div className="text-slate-600">Certified</div>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                  <CheckCircle className="h-12 w-12 text-white" />
                </div>
                <div className="text-xl font-bold text-slate-900">SOC 2 Type 2</div>
                <div className="text-slate-600">Compliant</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 px-4 py-2 bg-emerald-100 text-emerald-700 border-emerald-200">
                Featured Resources
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">
                Learn more about internal hackathons
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-2 hover:shadow-xl transition-all group">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="mb-2 w-fit px-3 py-1 bg-blue-100 text-blue-700 border-blue-200">
                    Hackathon planning
                  </Badge>
                  <CardTitle className="text-xl mb-2">10 Key DotHack for Teams product features</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Learn about the features that help internal hackathon organizers save time, increase participation, and showcase results.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/docs">
                    <Button variant="outline" className="w-full group-hover:bg-blue-50 group-hover:border-blue-300">
                      Read more <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-xl transition-all group">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="mb-2 w-fit px-3 py-1 bg-emerald-100 text-emerald-700 border-emerald-200">
                    Guide
                  </Badge>
                  <CardTitle className="text-xl mb-2">Internal company hackathon template and planning kit</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Download this hackathon planning guide to see how to organize your next internal hackathon.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/docs">
                    <Button variant="outline" className="w-full group-hover:bg-emerald-50 group-hover:border-emerald-300">
                      Read more <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-xl transition-all group">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg">
                    <Newspaper className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="mb-2 w-fit px-3 py-1 bg-violet-100 text-violet-700 border-violet-200">
                    Customer stories
                  </Badge>
                  <CardTitle className="text-xl mb-2">How Okta Engaged More Employees With DotHack for Teams</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Find out why Okta chooses DotHack to help power its internal hackathons.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/docs">
                    <Button variant="outline" className="w-full group-hover:bg-violet-50 group-hover:border-violet-300">
                      Read more <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  Run your next great hackathon
                </h2>
                <p className="text-xl mb-8 text-emerald-50 leading-relaxed">
                  For companies: Fill out the form below to book your DotHack for Teams demo today.
                </p>
                <p className="text-lg text-emerald-100 mb-8">
                  For students: Click here to begin hosting your hackathon on DotHack.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <Link href="/contact">
                    <Button size="lg" variant="secondary" className="bg-white text-emerald-600 hover:bg-slate-50 shadow-xl text-base px-8 py-6">
                      Book a demo <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/hackathons">
                    <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-base px-8 py-6">
                      Start as student
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-4">Learn how to plan an internal hackathon for your company</h3>
                <p className="text-emerald-100 mb-6">Get our best practices guide.</p>
                <Link href="/docs">
                  <Button size="lg" variant="secondary" className="w-full bg-white text-emerald-600 hover:bg-slate-50 shadow-xl">
                    Download now <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
