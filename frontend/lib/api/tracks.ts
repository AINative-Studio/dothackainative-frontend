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

export async function getTrackById(trackId: string): Promise<Track | null> {
  if (!trackId || !trackId.trim()) {
    throw new Error('Track ID is required')
  }

  const response = await zeroDBClient.queryRows<Track>('tracks', {
    filter: { track_id: trackId },
    limit: 1,
  })

  if (!response.success) {
    throw new Error(response.error || 'Failed to fetch track')
  }

  return response.rows?.[0] || null
}

export interface UpdateTrackInput {
  track_id: string
  name?: string
  description?: string
  prizes?: string[]
}

export async function updateTrack(input: UpdateTrackInput): Promise<Track> {
  if (!input.track_id || !input.track_id.trim()) {
    throw new Error('Track ID is required')
  }

  const existing = await getTrackById(input.track_id)
  if (!existing) {
    throw new Error('Track not found')
  }

  const updated: Track = {
    ...existing,
    ...(input.name && { name: input.name.trim() }),
    ...(input.description !== undefined && { description: input.description?.trim() || null }),
    ...(input.prizes && { prizes: input.prizes }),
  }

  const response = await zeroDBClient.updateRows<Track>(
    'tracks',
    { track_id: input.track_id },
    updated
  )

  if (!response.success) {
    throw new Error(response.error || 'Failed to update track')
  }

  return updated
}

export async function deleteTrack(trackId: string): Promise<void> {
  if (!trackId || !trackId.trim()) {
    throw new Error('Track ID is required')
  }

  const response = await zeroDBClient.deleteRows('tracks', {
    track_id: trackId,
  })

  if (!response.success) {
    throw new Error(response.error || 'Failed to delete track')
  }
}
