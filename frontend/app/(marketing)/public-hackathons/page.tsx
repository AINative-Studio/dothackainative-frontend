'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, Globe, Code2, Trophy, ArrowRight, CheckCircle, Sparkles, Target, MessageSquare, BarChart3, Lightbulb, BookOpen } from 'lucide-react'

export default function PublicHackathonsPage() {
  return (
    <div>
      <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNm0wIDEyYzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02bTAgMTJjMy4zMTQgMCA2IDIuNjg2IDYgNnMtMi42ODYgNi02IDYtNi0yLjY4Ni02LTYgMi42ODYtNiA2LTZNMjQgMThjMy4zMTQgMCA2IDIuNjg2IDYgNnMtMi42ODYgNi02IDYtNi0yLjY4Ni02LTYgMi42ODYtNiA2LTZtMCAxMmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNm0wIDEyYzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02TTEyIDE4YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02bTAgMTJjMy4zMTQgMCA2IDIuNjg2IDYgNnMtMi42ODYgNi02IDYtNi0yLjY4Ni02LTYgMi42ODYtNiA2LTZtMCAxMmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9Ii4xIiBvcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-cyan-800 bg-clip-text text-transparent leading-tight">
              Grow your developer ecosystem with DotHack
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-10 leading-relaxed max-w-3xl mx-auto">
              Inspire developers to build with your tools through hackathons managed by DotHack.
            </p>
            <div className="flex gap-4 justify-center flex-wrap mb-12">
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg text-lg px-8 py-6">
                  Get started <ArrowRight className="h-5 w-5 ml-2" />
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
                <Badge className="mb-4 px-4 py-2 bg-blue-100 text-blue-700 border-blue-200">
                  Developer Community
                </Badge>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
                  Reach an experienced, global community
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Get access to an engaged worldwide community of technology professionals using the latest tools, languages, and frameworks.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                      4M+
                    </div>
                    <div className="text-slate-600">users</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                      84
                    </div>
                    <div className="text-slate-600">countries represented</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">
                      220K+
                    </div>
                    <div className="text-slate-600">project submissions</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl blur-3xl opacity-20"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg"
                    alt="Diverse developer community"
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
            <div className="text-center mb-12">
              <Badge className="mb-4 px-4 py-2 bg-blue-100 text-blue-700 border-blue-200">
                Hackathon Platform
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
                The world's leading online hackathon platform
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Powering 80% of the world's hackathons. Built with intuitive features to reduce your workload and increase participation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Card className="border-2 hover:border-blue-300 hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Team-building</CardTitle>
                  <CardDescription className="text-base">
                    Help participants find teammates and form teams effortlessly with our built-in team formation tools
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-emerald-300 hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Participant communication</CardTitle>
                  <CardDescription className="text-base">
                    Keep participants engaged with announcements, updates, and direct messaging capabilities
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-violet-300 hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Judging and public voting</CardTitle>
                  <CardDescription className="text-base">
                    Streamline evaluations with custom rubrics, judge assignments, and optional public voting
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-orange-300 hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Project showcase gallery</CardTitle>
                  <CardDescription className="text-base">
                    Beautiful project galleries that showcase participant work and celebrate innovation
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="text-center">
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                  Book a demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-400 to-purple-400 rounded-2xl blur-3xl opacity-20"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg"
                    alt="AI-powered idea generation"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <Badge className="mb-4 px-4 py-2 bg-violet-100 text-violet-700 border-violet-200">
                  Feature Spotlight
                </Badge>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
                  DotHack AI idea generator
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Coming up with an idea is one of the biggest barriers to participation. DotHack's AI-powered idea generator sparks more project ideas and submissions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 px-4 py-2 bg-blue-100 text-blue-700 border-blue-200">
                  End-to-End Support
                </Badge>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  Excel with hackathon experts by your side
                </h2>
                <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                  Our experienced services team will work with you at every step of the way to make your competition a success.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-blue-50">Consultation & project management</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-blue-50">Legal rules & prize fulfillment</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-blue-50">Hackathon marketing</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-blue-50">Participant & judging support</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl blur-3xl opacity-20"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-800">
                  <Image
                    src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg"
                    alt="Expert hackathon support team"
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
            <div className="text-center mb-12">
              <Badge className="mb-4 px-4 py-2 bg-blue-100 text-blue-700 border-blue-200">
                Hackathons we've run
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">
                Featured DotHack hackathons
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-2 hover:shadow-xl transition-all">
                <CardHeader>
                  <CardTitle className="text-2xl mb-2">AWS PartyRock Hackathon</CardTitle>
                  <div className="flex items-center gap-2 text-slate-600 mb-4">
                    <Users className="h-5 w-5" />
                    <span className="text-lg font-semibold">5,102 participants</span>
                  </div>
                  <CardDescription className="text-base">
                    Build innovative generative AI applications using AWS PartyRock and compete for amazing prizes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/hackathons">
                    <Button variant="outline" className="w-full">
                      View hackathon <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-xl transition-all">
                <CardHeader>
                  <CardTitle className="text-2xl mb-2">Global Gamers Challenge</CardTitle>
                  <div className="flex items-center gap-2 text-slate-600 mb-4">
                    <Users className="h-5 w-5" />
                    <span className="text-lg font-semibold">3,163 participants</span>
                  </div>
                  <CardDescription className="text-base">
                    Create the next generation of gaming experiences with cutting-edge technologies and tools.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/hackathons">
                    <Button variant="outline" className="w-full">
                      View hackathon <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-xl transition-all">
                <CardHeader>
                  <CardTitle className="text-2xl mb-2">Microsoft AI Classroom</CardTitle>
                  <div className="flex items-center gap-2 text-slate-600 mb-4">
                    <Users className="h-5 w-5" />
                    <span className="text-lg font-semibold">3,496 participants</span>
                  </div>
                  <CardDescription className="text-base">
                    Transform education with AI-powered learning tools and innovative classroom solutions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/hackathons">
                    <Button variant="outline" className="w-full">
                      View hackathon <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-xl transition-all">
                <CardHeader>
                  <CardTitle className="text-2xl mb-2">Chainlink Spring 2023</CardTitle>
                  <div className="flex items-center gap-2 text-slate-600 mb-4">
                    <Users className="h-5 w-5" />
                    <span className="text-lg font-semibold">2,423 participants</span>
                  </div>
                  <CardDescription className="text-base">
                    Build decentralized applications leveraging Chainlink oracles and smart contract technology.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/hackathons">
                    <Button variant="outline" className="w-full">
                      View hackathon <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
                Start your hackathon today
              </h2>
              <p className="text-xl text-slate-600">
                What kind of hackathon do you want to run?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="border-2 hover:border-blue-300 hover:shadow-2xl transition-all">
                <CardHeader>
                  <Badge className="mb-4 w-fit px-4 py-1 bg-blue-100 text-blue-700 border-blue-200">
                    For Companies
                  </Badge>
                  <CardTitle className="text-2xl mb-2">Online hackathons for companies</CardTitle>
                  <CardDescription className="text-base mb-6">
                    Reach developers globally. Get planning and marketing support.
                  </CardDescription>
                  <Link href="/contact">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                      Host online <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-emerald-300 hover:shadow-2xl transition-all">
                <CardHeader>
                  <Badge className="mb-4 w-fit px-4 py-1 bg-blue-100 text-blue-700 border-blue-200">
                    For Companies
                  </Badge>
                  <CardTitle className="text-2xl mb-2">In-person hackathon for companies</CardTitle>
                  <CardDescription className="text-base mb-6">
                    Manage your registrations and project submissions with DotHack.
                  </CardDescription>
                  <Link href="/contact">
                    <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                      Host in-person <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-violet-300 hover:shadow-2xl transition-all">
                <CardHeader>
                  <Badge className="mb-4 w-fit px-4 py-1 bg-violet-100 text-violet-700 border-violet-200">
                    For Students
                  </Badge>
                  <CardTitle className="text-2xl mb-2">Student hackathons</CardTitle>
                  <CardDescription className="text-base mb-6">
                    Students can run all their hackathons for free on DotHack.
                  </CardDescription>
                  <div className="space-y-3">
                    <Link href="/contact">
                      <Button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
                        Host online <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button variant="outline" className="w-full border-2 border-violet-600 text-violet-600 hover:bg-violet-50">
                        Host in-person
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-orange-300 hover:shadow-2xl transition-all bg-gradient-to-br from-orange-50 to-amber-50">
                <CardHeader>
                  <BookOpen className="h-12 w-12 text-orange-600 mb-4" />
                  <CardTitle className="text-2xl mb-2">Learn how to run successful hackathons</CardTitle>
                  <CardDescription className="text-base mb-6">
                    Get our best practices guides for online and in-person hackathons.
                  </CardDescription>
                  <Link href="/docs">
                    <Button variant="outline" className="w-full border-2 border-orange-600 text-orange-600 hover:bg-orange-100">
                      Download now <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to launch your hackathon?
          </h2>
          <p className="text-xl mb-8 text-blue-50 max-w-2xl mx-auto">
            Join thousands of companies using DotHack to power successful developer hackathons
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-slate-50 shadow-xl text-base px-8 py-6">
                Get Started <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link href="/features">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-base px-8 py-6">
                Explore Features
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
