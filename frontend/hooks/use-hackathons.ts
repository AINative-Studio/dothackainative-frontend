import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from '@tanstack/react-query'
import {
  createHackathon,
  listHackathons,
  getHackathonById,
  getHackathonsByStatus,
  updateHackathon,
  deleteHackathon,
  type Hackathon,
  type CreateHackathonInput,
  type UpdateHackathonInput,
  type ListHackathonsParams
} from '@/lib/api/hackathons'

export const HACKATHONS_QUERY_KEY = 'hackathons'

export function useHackathons(params: ListHackathonsParams = {}): UseQueryResult<Hackathon[], Error> {
  return useQuery({
    queryKey: [HACKATHONS_QUERY_KEY, params],
    queryFn: () => listHackathons(params)
  })
}

export function useHackathonById(hackathonId: string): UseQueryResult<Hackathon | null, Error> {
  return useQuery({
    queryKey: [HACKATHONS_QUERY_KEY, hackathonId],
    queryFn: () => getHackathonById(hackathonId),
    enabled: !!hackathonId
  })
}

export function useHackathonsByStatus(status: 'DRAFT' | 'LIVE' | 'CLOSED'): UseQueryResult<Hackathon[], Error> {
  return useQuery({
    queryKey: [HACKATHONS_QUERY_KEY, { status }],
    queryFn: () => getHackathonsByStatus(status)
  })
}

export function useLiveHackathons(): UseQueryResult<Hackathon[], Error> {
  return useHackathonsByStatus('LIVE')
}

export function useDraftHackathons(): UseQueryResult<Hackathon[], Error> {
  return useHackathonsByStatus('DRAFT')
}

export function useClosedHackathons(): UseQueryResult<Hackathon[], Error> {
  return useHackathonsByStatus('CLOSED')
}

export function useCreateHackathon(): UseMutationResult<Hackathon, Error, CreateHackathonInput> {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateHackathonInput) => createHackathon(input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [HACKATHONS_QUERY_KEY] })

      queryClient.setQueryData([HACKATHONS_QUERY_KEY, data.hackathon_id], data)
    }
  })
}

export function useUpdateHackathon(): UseMutationResult<Hackathon, Error, UpdateHackathonInput> {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: UpdateHackathonInput) => updateHackathon(input),
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey: [HACKATHONS_QUERY_KEY, input.hackathon_id] })

      const previousHackathon = queryClient.getQueryData<Hackathon>([HACKATHONS_QUERY_KEY, input.hackathon_id])

      if (previousHackathon) {
        queryClient.setQueryData<Hackathon>(
          [HACKATHONS_QUERY_KEY, input.hackathon_id],
          { ...previousHackathon, ...input }
        )
      }

      return { previousHackathon }
    },
    onError: (err, input, context) => {
      if (context?.previousHackathon) {
        queryClient.setQueryData(
          [HACKATHONS_QUERY_KEY, input.hackathon_id],
          context.previousHackathon
        )
      }
    },
    onSuccess: (data, input) => {
      queryClient.invalidateQueries({ queryKey: [HACKATHONS_QUERY_KEY] })
      queryClient.setQueryData([HACKATHONS_QUERY_KEY, input.hackathon_id], data)
    }
  })
}

export function useDeleteHackathon(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (hackathonId: string) => deleteHackathon(hackathonId),
    onSuccess: (_, hackathonId) => {
      queryClient.invalidateQueries({ queryKey: [HACKATHONS_QUERY_KEY] })
      queryClient.removeQueries({ queryKey: [HACKATHONS_QUERY_KEY, hackathonId] })
    }
  })
}
