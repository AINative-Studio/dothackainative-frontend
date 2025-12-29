"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { useStore } from '@/lib/store'
import { Score } from '@/lib/types'
import { Gavel } from 'lucide-react'

export default function JudgingPage({
  params,
}: {
  params: { hackathonId: string }
}) {
  const { data, addScore, getCurrentHackathonStatus } = useStore()
  const hackathon = getCurrentHackathonStatus(params.hackathonId)

  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null)
  const [scores, setScores] = useState<Record<string, number>>({})
  const [feedback, setFeedback] = useState('')

  if (!hackathon) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-600">Hackathon not found</p>
      </div>
    )
  }

  const projects = data.projects.filter(p => p.hackathon_id === params.hackathonId)
  const submissions = data.submissions.filter(s =>
    projects.some(p => p.project_id === s.project_id)
  )
  const rubrics = data.rubrics.filter(r => r.hackathon_id === params.hackathonId)

  const handleSubmitScore = (submissionId: string) => {
    const totalScore = Object.values(scores).reduce((sum, val) => sum + val, 0)

    const newScore: Score = {
      score_id: `score_${Date.now()}`,
      submission_id: submissionId,
      judge_participant_id: 'judge_demo',
      score_json: JSON.stringify(scores),
      total_score: totalScore,
      feedback: feedback || undefined,
    }

    addScore(newScore)
    setSelectedSubmission(null)
    setScores({})
    setFeedback('')
  }

  const getSubmissionScores = (submissionId: string) => {
    return data.scores.filter(s => s.submission_id === submissionId)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Judging - {hackathon.name}</h1>
        <p className="text-gray-600">Score and evaluate submissions</p>
      </div>

      {rubrics.length === 0 ? (
        <Card className="mb-8">
          <CardContent className="text-center py-12">
            <p className="text-gray-600">No rubrics defined. Please create a rubric in Setup first.</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Judging Rubrics</CardTitle>
            <CardDescription>Evaluation criteria for this hackathon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rubrics.map((rubric) => (
                <div key={rubric.rubric_id} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">{rubric.title}</h4>
                  <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                    {rubric.criteria_json}
                  </pre>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {submissions.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-600">No submissions to judge yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {submissions.map((submission) => {
            const project = projects.find(p => p.project_id === submission.project_id)
            const team = project ? data.teams.find(t => t.team_id === project.team_id) : null
            const existingScores = getSubmissionScores(submission.submission_id)
            const isScoring = selectedSubmission === submission.submission_id

            let rubricCriteria: Record<string, any> = {}
            if (rubrics.length > 0) {
              try {
                rubricCriteria = JSON.parse(rubrics[0].criteria_json)
              } catch (e) {
                rubricCriteria = {}
              }
            }

            return (
              <Card key={submission.submission_id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Gavel className="h-5 w-5" />
                        {project?.title}
                      </CardTitle>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline">{team?.name}</Badge>
                        <Badge variant="secondary">
                          {existingScores.length} score{existingScores.length !== 1 ? 's' : ''}
                        </Badge>
                      </div>
                    </div>
                    {!isScoring && (
                      <Button
                        size="sm"
                        onClick={() => setSelectedSubmission(submission.submission_id)}
                      >
                        Score Submission
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Submission</h4>
                      <p className="text-sm text-gray-600 whitespace-pre-wrap line-clamp-3">
                        {submission.submission_text}
                      </p>
                    </div>

                    {existingScores.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Previous Scores</h4>
                        <div className="space-y-2">
                          {existingScores.map((score) => (
                            <div key={score.score_id} className="text-sm p-3 bg-gray-50 rounded">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium">Total: {score.total_score}</span>
                                <Badge variant="outline">Judge</Badge>
                              </div>
                              {score.feedback && (
                                <p className="text-gray-600 text-xs">{score.feedback}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {isScoring && (
                      <div className="border-t pt-4 space-y-4">
                        <h4 className="font-semibold">Score this submission</h4>

                        {Object.keys(rubricCriteria).length === 0 ? (
                          <div className="space-y-3">
                            <div className="space-y-2">
                              <Label htmlFor={`score-${submission.submission_id}`}>
                                Overall Score
                              </Label>
                              <Input
                                id={`score-${submission.submission_id}`}
                                type="number"
                                min="0"
                                max="100"
                                value={scores['overall'] || ''}
                                onChange={(e) =>
                                  setScores({ ...scores, overall: Number(e.target.value) })
                                }
                                placeholder="0-100"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {Object.entries(rubricCriteria).map(([criterion, config]: [string, any]) => (
                              <div key={criterion} className="space-y-2">
                                <Label htmlFor={`${submission.submission_id}-${criterion}`}>
                                  {criterion.charAt(0).toUpperCase() + criterion.slice(1)}
                                  {config.max && ` (max: ${config.max})`}
                                  {config.weight && ` - weight: ${config.weight}%`}
                                </Label>
                                <Input
                                  id={`${submission.submission_id}-${criterion}`}
                                  type="number"
                                  min="0"
                                  max={config.max || 100}
                                  value={scores[criterion] || ''}
                                  onChange={(e) =>
                                    setScores({ ...scores, [criterion]: Number(e.target.value) })
                                  }
                                  placeholder={`0-${config.max || 100}`}
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label htmlFor={`feedback-${submission.submission_id}`}>
                            Feedback (Optional)
                          </Label>
                          <Textarea
                            id={`feedback-${submission.submission_id}`}
                            placeholder="Provide constructive feedback..."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            rows={4}
                          />
                        </div>

                        <div className="flex gap-2">
                          <Button onClick={() => handleSubmitScore(submission.submission_id)}>
                            Submit Score
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSelectedSubmission(null)
                              setScores({})
                              setFeedback('')
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
