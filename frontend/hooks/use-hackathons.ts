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
import { QueryKeys } from '@/lib/query-keys'
import {
  invalidateAfterHackathonCreate,
  invalidateAfterHackathonUpdate,
  invalidateAfterHackathonDelete,
} from '@/lib/cache-invalidation'

export const HACKATHONS_QUERY_KEY = 'hackathons'

export function useHackathons(params: ListHackathonsParams = {}): UseQueryResult<Hackathon[], Error> {
  return useQuery({
    queryKey: QueryKeys.hackathons.all,
    queryFn: () => listHackathons(params)
  })
}

export function useHackathonById(hackathonId: string): UseQueryResult<Hackathon | null, Error> {
  return useQuery({
    queryKey: QueryKeys.hackathons.detail(hackathonId),
    queryFn: () => getHackathonById(hackathonId),
    enabled: !!hackathonId
  })
}

export function useHackathonsByStatus(status: 'DRAFT' | 'LIVE' | 'CLOSED'): UseQueryResult<Hackathon[], Error> {
  return useQuery({
    queryKey: QueryKeys.hackathons.byStatus(status),
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
      invalidateAfterHackathonCreate(queryClient)
      queryClient.setQueryData(QueryKeys.hackathons.detail(data.hackathon_id), data)
    }
  })
}

export function useUpdateHackathon(): UseMutationResult<Hackathon, Error, UpdateHackathonInput> {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: UpdateHackathonInput) => updateHackathon(input),
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey: QueryKeys.hackathons.detail(input.hackathon_id) })

      const previousHackathon = queryClient.getQueryData<Hackathon>(
        QueryKeys.hackathons.detail(input.hackathon_id)
      )

      if (previousHackathon) {
        queryClient.setQueryData<Hackathon>(
          QueryKeys.hackathons.detail(input.hackathon_id),
          { ...previousHackathon, ...input }
        )
      }

      return { previousHackathon }
    },
    onError: (err, input, context) => {
      if (context?.previousHackathon) {
        queryClient.setQueryData(
          QueryKeys.hackathons.detail(input.hackathon_id),
          context.previousHackathon
        )
      }
    },
    onSuccess: (data, input) => {
      invalidateAfterHackathonUpdate(queryClient, input.hackathon_id)
      queryClient.setQueryData(QueryKeys.hackathons.detail(input.hackathon_id), data)
    }
  })
}

export function useDeleteHackathon(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (hackathonId: string) => deleteHackathon(hackathonId),
    onSuccess: (_, hackathonId) => {
      invalidateAfterHackathonDelete(queryClient, hackathonId)
    }
  })
}
