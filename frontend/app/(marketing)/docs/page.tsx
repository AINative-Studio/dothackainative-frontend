import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Code, Key, Book, Zap } from 'lucide-react'

export default function DocsPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-12">
          <div className="inline-block mb-4 px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-semibold">
            API Documentation
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Developer Documentation
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl">
            Build powerful integrations with the DotHack API. Access hackathons, participants, projects, submissions, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="border-2 hover:shadow-xl transition-all">
            <CardHeader>
              <div className="w-12 h-12 mb-3 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Key className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Authentication</CardTitle>
              <CardDescription className="text-base">
                Secure your API requests with API keys
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-slate-600">
                Get your API key from the organizer dashboard and include it in all requests:
              </p>
              <div className="bg-slate-950 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`Authorization: Bearer YOUR_API_KEY`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-xl transition-all">
            <CardHeader>
              <div className="w-12 h-12 mb-3 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Quick Start</CardTitle>
              <CardDescription className="text-base">
                Make your first API request in minutes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-950 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre className="whitespace-pre-wrap break-words">{`curl https://api.dothack.io/v1/hackathons \\
  -H "Authorization: Bearer YOUR_KEY"`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 mb-12">
          <CardHeader>
            <div className="w-12 h-12 mb-3 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
              <Book className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl">API Endpoints</CardTitle>
            <CardDescription className="text-base">
              Available REST API endpoints for managing hackathons
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-mono">GET</span>
                Hackathons
              </h3>
              <div className="space-y-3 ml-4 border-l-2 border-slate-200 pl-4">
                <div>
                  <code className="text-sm bg-slate-100 px-2 py-1 rounded">GET /v1/hackathons</code>
                  <p className="text-sm text-slate-600 mt-1">List all hackathons</p>
                </div>
                <div>
                  <code className="text-sm bg-slate-100 px-2 py-1 rounded">GET /v1/hackathons/:id</code>
                  <p className="text-sm text-slate-600 mt-1">Get hackathon by ID</p>
                </div>
                <div>
                  <code className="text-sm bg-slate-100 px-2 py-1 rounded">POST /v1/hackathons</code>
                  <p className="text-sm text-slate-600 mt-1">Create a new hackathon</p>
                </div>
                <div>
                  <code className="text-sm bg-slate-100 px-2 py-1 rounded">PATCH /v1/hackathons/:id</code>
                  <p className="text-sm text-slate-600 mt-1">Update hackathon details</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-mono">GET</span>
                Participants
              </h3>
              <div className="space-y-3 ml-4 border-l-2 border-slate-200 pl-4">
                <div>
                  <code className="text-sm bg-slate-100 px-2 py-1 rounded">GET /v1/hackathons/:id/participants</code>
                  <p className="text-sm text-slate-600 mt-1">List hackathon participants</p>
                </div>
                <div>
                  <code className="text-sm bg-slate-100 px-2 py-1 rounded">POST /v1/hackathons/:id/participants</code>
                  <p className="text-sm text-slate-600 mt-1">Add participant to hackathon</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-mono">GET</span>
                Projects & Submissions
              </h3>
              <div className="space-y-3 ml-4 border-l-2 border-slate-200 pl-4">
                <div>
                  <code className="text-sm bg-slate-100 px-2 py-1 rounded">GET /v1/hackathons/:id/projects</code>
                  <p className="text-sm text-slate-600 mt-1">List all projects</p>
                </div>
                <div>
                  <code className="text-sm bg-slate-100 px-2 py-1 rounded">GET /v1/hackathons/:id/submissions</code>
                  <p className="text-sm text-slate-600 mt-1">List all submissions</p>
                </div>
                <div>
                  <code className="text-sm bg-slate-100 px-2 py-1 rounded">POST /v1/projects/:id/submissions</code>
                  <p className="text-sm text-slate-600 mt-1">Create submission</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="px-2 py-1 bg-violet-100 text-violet-700 rounded text-xs font-mono">GET</span>
                Judging & Scores
              </h3>
              <div className="space-y-3 ml-4 border-l-2 border-slate-200 pl-4">
                <div>
                  <code className="text-sm bg-slate-100 px-2 py-1 rounded">GET /v1/hackathons/:id/scores</code>
                  <p className="text-sm text-slate-600 mt-1">List all scores</p>
                </div>
                <div>
                  <code className="text-sm bg-slate-100 px-2 py-1 rounded">POST /v1/submissions/:id/scores</code>
                  <p className="text-sm text-slate-600 mt-1">Submit a score</p>
                </div>
                <div>
                  <code className="text-sm bg-slate-100 px-2 py-1 rounded">GET /v1/hackathons/:id/leaderboard</code>
                  <p className="text-sm text-slate-600 mt-1">Get leaderboard</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 bg-gradient-to-br from-slate-50 to-blue-50">
          <CardHeader>
            <div className="w-12 h-12 mb-3 rounded-lg bg-gradient-to-br from-slate-800 to-slate-600 flex items-center justify-center">
              <Code className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl">SDKs & Libraries</CardTitle>
            <CardDescription className="text-base">
              Official client libraries for popular languages
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white border-2 rounded-lg">
                <h4 className="font-semibold mb-2">TypeScript</h4>
                <code className="text-sm bg-slate-100 px-2 py-1 rounded block">npm install @dothack/sdk</code>
              </div>
              <div className="p-4 bg-white border-2 rounded-lg">
                <h4 className="font-semibold mb-2">Python</h4>
                <code className="text-sm bg-slate-100 px-2 py-1 rounded block">pip install dothack</code>
              </div>
              <div className="p-4 bg-white border-2 rounded-lg">
                <h4 className="font-semibold mb-2">Go</h4>
                <code className="text-sm bg-slate-100 px-2 py-1 rounded block">go get github.com/dothack/go</code>
              </div>
            </div>
            <div className="bg-slate-950 text-green-400 p-6 rounded-lg font-mono text-sm overflow-x-auto">
              <pre className="whitespace-pre-wrap break-words">{`// TypeScript Example
import { DotHack } from '@dothack/sdk';

const client = new DotHack({
  apiKey: process.env.DOTHACK_API_KEY
});

// Create a hackathon
const hackathon = await client.hackathons.create({
  name: "Summer Hackathon 2024",
  description: "Build amazing projects",
  startDate: "2024-07-01T00:00:00Z",
  endDate: "2024-07-03T23:59:59Z"
});

// List participants
const participants = await client.participants.list(
  hackathon.id
);

// Get leaderboard
const leaderboard = await client.leaderboard.get(
  hackathon.id,
  { track: "AI/ML" }
);`}</pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
