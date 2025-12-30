import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Track } from '../lib/types'
import {
  createTrack,
  listTracks,
  getTracksByHackathon,
  type CreateTrackInput,
  type ListTracksParams
} from '../lib/api/tracks'

export const TRACKS_QUERY_KEY = 'tracks'

export function useTracks(params: ListTracksParams = {}) {
  return useQuery({
    queryKey: [TRACKS_QUERY_KEY, params],
    queryFn: () => listTracks(params)
  })
}

export function useTracksByHackathon(hackathonId: string) {
  return useQuery({
    queryKey: [TRACKS_QUERY_KEY, { hackathon_id: hackathonId }],
    queryFn: () => getTracksByHackathon(hackathonId),
    enabled: !!hackathonId
  })
}

export function useCreateTrack() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateTrackInput) => createTrack(input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [TRACKS_QUERY_KEY] })
      queryClient.invalidateQueries({
        queryKey: [TRACKS_QUERY_KEY, { hackathon_id: data.hackathon_id }]
      })
    }
  })
}
