'use client'

import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Settings, Users, UsersRound, FolderKanban, FileCheck, Gavel, Trophy } from 'lucide-react'

export default function FeaturesPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
            alt="Developers coding at hackathon"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Everything you need to run successful hackathons
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Complete platform for managing participants, teams, projects, submissions, judging, and leaderboards
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">

        <div className="max-w-5xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Settings className="h-8 w-8 text-blue-600" />
                <div>
                  <CardTitle>Setup & Configuration</CardTitle>
                  <CardDescription>Complete control over your hackathon setup</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="tracks">
                  <AccordionTrigger>Tracks</AccordionTrigger>
                  <AccordionContent>
                    Create multiple tracks for your hackathon to organize projects by theme, technology, or category. Each track can have its own description and criteria.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="rubrics">
                  <AccordionTrigger>Custom Rubrics</AccordionTrigger>
                  <AccordionContent>
                    Design custom judging rubrics with flexible criteria. Define scoring dimensions, point scales, and evaluation guidelines to ensure consistent and fair judging.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="status">
                  <AccordionTrigger>Event Status Management</AccordionTrigger>
                  <AccordionContent>
                    Control your hackathon lifecycle with status management: DRAFT for planning, LIVE for active events, and CLOSED when complete. Status changes are tracked with append-only history.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-green-600" />
                <div>
                  <CardTitle>Participants</CardTitle>
                  <CardDescription>Comprehensive participant management</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="registration">
                  <AccordionTrigger>Registration</AccordionTrigger>
                  <AccordionContent>
                    Add participants with essential information including name, email, and organization. Track all participants in one centralized location.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="roles">
                  <AccordionTrigger>Role Assignment</AccordionTrigger>
                  <AccordionContent>
                    Assign roles to participants: BUILDER for hackers, JUDGE for evaluators, MENTOR for advisors, and ORGANIZER for event managers. Roles control access and capabilities.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <UsersRound className="h-8 w-8 text-purple-600" />
                <div>
                  <CardTitle>Teams</CardTitle>
                  <CardDescription>Flexible team organization</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Create and manage teams with optional track assignment. Add team members from registered participants and designate team leads. Teams can collaborate on projects and submit work together.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <FolderKanban className="h-8 w-8 text-orange-600" />
                <div>
                  <CardTitle>Projects</CardTitle>
                  <CardDescription>Track project development</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="creation">
                  <AccordionTrigger>Project Creation</AccordionTrigger>
                  <AccordionContent>
                    Teams create projects with title, one-liner description, and links to repositories and demos. Track project status from IDEA to BUILDING to SUBMITTED.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="tracking">
                  <AccordionTrigger>Progress Tracking</AccordionTrigger>
                  <AccordionContent>
                    Monitor all projects in real-time. View project details, track status changes, and see which projects are ready for submission.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <FileCheck className="h-8 w-8 text-teal-600" />
                <div>
                  <CardTitle>Submissions</CardTitle>
                  <CardDescription>Centralized submission management</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="portal">
                  <AccordionTrigger>Submission Portal</AccordionTrigger>
                  <AccordionContent>
                    Teams submit their work with narrative descriptions and artifact links. Submissions are automatically timestamped and linked to projects.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="search">
                  <AccordionTrigger>Search & Filter</AccordionTrigger>
                  <AccordionContent>
                    Built-in search functionality to quickly find submissions by text content. Filter and organize submissions to streamline the judging process.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="deadline">
                  <AccordionTrigger>Deadline Enforcement</AccordionTrigger>
                  <AccordionContent>
                    When hackathon status changes to CLOSED, the submission form is automatically disabled to enforce deadlines and prevent late submissions.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Gavel className="h-8 w-8 text-red-600" />
                <div>
                  <CardTitle>Judging</CardTitle>
                  <CardDescription>Structured evaluation workflow</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="scoring">
                  <AccordionTrigger>Criteria-Based Scoring</AccordionTrigger>
                  <AccordionContent>
                    Judges evaluate submissions using the defined rubric criteria. Score each criterion individually and add qualitative feedback for teams.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="feedback">
                  <AccordionTrigger>Feedback System</AccordionTrigger>
                  <AccordionContent>
                    Provide detailed feedback alongside scores to help teams understand their evaluation and improve future projects.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Trophy className="h-8 w-8 text-yellow-600" />
                <div>
                  <CardTitle>Leaderboard</CardTitle>
                  <CardDescription>Real-time rankings and results</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="rankings">
                  <AccordionTrigger>Automatic Rankings</AccordionTrigger>
                  <AccordionContent>
                    Scores are automatically aggregated per project/team. Rankings are calculated based on average total scores across all judges.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="filtering">
                  <AccordionTrigger>Track Filtering</AccordionTrigger>
                  <AccordionContent>
                    Filter leaderboard results by track to see winners in each category. View overall rankings or focus on specific tracks.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="export">
                  <AccordionTrigger>CSV Export</AccordionTrigger>
                  <AccordionContent>
                    Export complete leaderboard data as CSV for further analysis, reporting, or archiving. Download results with all scores and rankings.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
        </div>
      </section>
    </div>
  )
}
