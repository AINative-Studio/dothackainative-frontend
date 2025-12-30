import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Project } from '../lib/types'
import {
  createProject,
  updateProject,
  listProjects,
  getProjectsByHackathon,
  getProjectsByTeam,
  getProjectsByStatus,
  type CreateProjectInput,
  type UpdateProjectInput,
  type ListProjectsParams
} from '../lib/api/projects'

export const PROJECTS_QUERY_KEY = 'projects'

export function useProjects(params: ListProjectsParams = {}) {
  return useQuery({
    queryKey: [PROJECTS_QUERY_KEY, params],
    queryFn: () => listProjects(params)
  })
}

export function useProjectsByHackathon(hackathonId: string) {
  return useQuery({
    queryKey: [PROJECTS_QUERY_KEY, { hackathon_id: hackathonId }],
    queryFn: () => getProjectsByHackathon(hackathonId),
    enabled: !!hackathonId
  })
}

export function useProjectsByTeam(teamId: string) {
  return useQuery({
    queryKey: [PROJECTS_QUERY_KEY, { team_id: teamId }],
    queryFn: () => getProjectsByTeam(teamId),
    enabled: !!teamId
  })
}

export function useProjectsByStatus(
  hackathonId: string,
  status: 'IDEA' | 'BUILDING' | 'SUBMITTED'
) {
  return useQuery({
    queryKey: [PROJECTS_QUERY_KEY, { hackathon_id: hackathonId, status }],
    queryFn: () => getProjectsByStatus(hackathonId, status),
    enabled: !!hackathonId
  })
}

export function useCreateProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateProjectInput) => createProject(input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [PROJECTS_QUERY_KEY] })
      queryClient.invalidateQueries({
        queryKey: [PROJECTS_QUERY_KEY, { hackathon_id: data.hackathon_id }]
      })
      queryClient.invalidateQueries({
        queryKey: [PROJECTS_QUERY_KEY, { team_id: data.team_id }]
      })
    }
  })
}

export function useUpdateProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: UpdateProjectInput) => updateProject(input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [PROJECTS_QUERY_KEY] })
      queryClient.invalidateQueries({
        queryKey: [PROJECTS_QUERY_KEY, { hackathon_id: data.hackathon_id }]
      })
      queryClient.invalidateQueries({
        queryKey: [PROJECTS_QUERY_KEY, { team_id: data.team_id }]
      })
    }
  })
}
