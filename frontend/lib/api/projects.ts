import { zeroDBClient } from '../zerodb'
import type { Project } from '../types'

export interface CreateProjectInput {
  hackathon_id: string
  team_id: string
  title: string
  one_liner?: string
  status?: 'IDEA' | 'BUILDING' | 'SUBMITTED'
  repo_url?: string
  demo_url?: string
}

export interface UpdateProjectInput {
  project_id: string
  title?: string
  one_liner?: string
  status?: 'IDEA' | 'BUILDING' | 'SUBMITTED'
  repo_url?: string
  demo_url?: string
}

export interface ListProjectsParams {
  hackathon_id?: string
  team_id?: string
  status?: 'IDEA' | 'BUILDING' | 'SUBMITTED'
  limit?: number
  offset?: number
}

function validateUrl(url: string | undefined): boolean {
  if (!url) return true
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export async function createProject(input: CreateProjectInput): Promise<Project> {
  if (!validateUrl(input.repo_url)) {
    throw new Error('Invalid repository URL')
  }

  if (!validateUrl(input.demo_url)) {
    throw new Error('Invalid demo URL')
  }

  const project: Partial<Project> = {
    project_id: crypto.randomUUID(),
    hackathon_id: input.hackathon_id,
    team_id: input.team_id,
    title: input.title,
    one_liner: input.one_liner,
    status: input.status || 'IDEA',
    repo_url: input.repo_url,
    demo_url: input.demo_url
  }

  const response = await zeroDBClient.insertRows<Partial<Project>>('projects', [project])

  if (!response.success) {
    throw new Error(response.error || 'Failed to create project')
  }

  return project as Project
}

export async function updateProject(input: UpdateProjectInput): Promise<Project> {
  if (input.repo_url && !validateUrl(input.repo_url)) {
    throw new Error('Invalid repository URL')
  }

  if (input.demo_url && !validateUrl(input.demo_url)) {
    throw new Error('Invalid demo URL')
  }

  const existingProjects = await zeroDBClient.queryRows<Project>('projects', {
    filter: { project_id: input.project_id },
    limit: 1
  })

  if (!existingProjects.success || !existingProjects.rows || existingProjects.rows.length === 0) {
    throw new Error('Project not found')
  }

  const existingProject = existingProjects.rows[0]

  const updatedProject: Partial<Project> = {
    ...existingProject,
    title: input.title ?? existingProject.title,
    one_liner: input.one_liner ?? existingProject.one_liner,
    status: input.status ?? existingProject.status,
    repo_url: input.repo_url ?? existingProject.repo_url,
    demo_url: input.demo_url ?? existingProject.demo_url
  }

  const response = await zeroDBClient.insertRows<Partial<Project>>('projects', [updatedProject])

  if (!response.success) {
    throw new Error(response.error || 'Failed to update project')
  }

  return updatedProject as Project
}

export async function listProjects(params: ListProjectsParams = {}): Promise<Project[]> {
  const filter: Record<string, any> = {}

  if (params.hackathon_id) {
    filter.hackathon_id = params.hackathon_id
  }

  if (params.team_id) {
    filter.team_id = params.team_id
  }

  if (params.status) {
    filter.status = params.status
  }

  const response = await zeroDBClient.queryRows<Project>('projects', {
    filter: Object.keys(filter).length > 0 ? filter : undefined,
    limit: params.limit || 100,
    offset: params.offset || 0
  })

  if (!response.success) {
    throw new Error(response.error || 'Failed to list projects')
  }

  return response.rows || []
}

export async function getProjectsByHackathon(hackathonId: string): Promise<Project[]> {
  return listProjects({ hackathon_id: hackathonId })
}

export async function getProjectsByTeam(teamId: string): Promise<Project[]> {
  return listProjects({ team_id: teamId })
}

export async function getProjectsByStatus(
  hackathonId: string,
  status: 'IDEA' | 'BUILDING' | 'SUBMITTED'
): Promise<Project[]> {
  return listProjects({ hackathon_id: hackathonId, status })
}
