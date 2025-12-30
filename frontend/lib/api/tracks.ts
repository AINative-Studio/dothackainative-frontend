import { zeroDBClient } from '../zerodb'
import type { Track } from '../types'

export interface CreateTrackInput {
  hackathon_id: string
  name: string
  description: string
}

export interface ListTracksParams {
  hackathon_id?: string
  limit?: number
  offset?: number
}

export async function createTrack(input: CreateTrackInput): Promise<Track> {
  const track: Partial<Track> = {
    track_id: crypto.randomUUID(),
    hackathon_id: input.hackathon_id,
    name: input.name,
    description: input.description
  }

  const response = await zeroDBClient.insertRows<Partial<Track>>('tracks', [track])

  if (!response.success) {
    throw new Error(response.error || 'Failed to create track')
  }

  return track as Track
}

export async function listTracks(params: ListTracksParams = {}): Promise<Track[]> {
  const filter = params.hackathon_id
    ? { hackathon_id: params.hackathon_id }
    : undefined

  const response = await zeroDBClient.queryRows<Track>('tracks', {
    filter,
    limit: params.limit || 100,
    offset: params.offset || 0
  })

  if (!response.success) {
    throw new Error(response.error || 'Failed to list tracks')
  }

  return response.rows || []
}

export async function getTracksByHackathon(hackathonId: string): Promise<Track[]> {
  return listTracks({ hackathon_id: hackathonId })
}
