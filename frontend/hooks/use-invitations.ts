import { useQuery, useMutation, useQueryClient, type UseMutationResult, type UseQueryResult } from '@tanstack/react-query'
import type { Invitation } from '@/lib/types'
import {
  createInvitation,
  getInvitationsByHackathon,
  type CreateInvitationInput,
} from '@/lib/api/invitations'

export const INVITATIONS_QUERY_KEY = 'invitations'

export function useInvitationsByHackathon(hackathonId: string | undefined): UseQueryResult<Invitation[], Error> {
  return useQuery({
    queryKey: [INVITATIONS_QUERY_KEY, hackathonId],
    queryFn: () => getInvitationsByHackathon(hackathonId!),
    enabled: !!hackathonId,
    staleTime: 5 * 60 * 1000,
  })
}

export function useCreateInvitation(): UseMutationResult<Invitation, Error, CreateInvitationInput> {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createInvitation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [INVITATIONS_QUERY_KEY, data.hackathon_id] })
    },
  })
}
