import { zeroDBClient, ZeroDBTableRow } from '@/lib/zerodb'
import { validateUUID } from '@/lib/validation'
import { handleAPIError, showErrorToast, APIError } from '@/lib/error-handling'

export interface Hackathon extends ZeroDBTableRow {
  hackathon_id: string
  name: string
  description: string
  status: 'DRAFT' | 'LIVE' | 'CLOSED'
  start_at: string
  end_at: string
  created_at: string
}

export interface CreateHackathonInput {
  name: string
  description: string
  status?: 'DRAFT' | 'LIVE' | 'CLOSED'
  start_at: string
  end_at: string
}

export interface UpdateHackathonInput {
  hackathon_id: string
  name?: string
  description?: string
  status?: 'DRAFT' | 'LIVE' | 'CLOSED'
  start_at?: string
  end_at?: string
}

export interface ListHackathonsParams {
  status?: 'DRAFT' | 'LIVE' | 'CLOSED'
  limit?: number
  offset?: number
}

const TABLE_NAME = 'hackathons'

export async function createHackathon(input: CreateHackathonInput): Promise<Hackathon> {
  try {
    if (!input.name || input.name.trim().length === 0) {
      throw new APIError('Hackathon name is required')
    }

    if (!input.description || input.description.trim().length === 0) {
      throw new APIError('Hackathon description is required')
    }

    if (!input.start_at || !input.end_at) {
      throw new APIError('Start and end dates are required')
    }

    const startDate = new Date(input.start_at)
    const endDate = new Date(input.end_at)

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new APIError('Invalid date format')
    }

    if (startDate >= endDate) {
      throw new APIError('Start date must be before end date')
    }

    const hackathon: Hackathon = {
      hackathon_id: crypto.randomUUID(),
      name: input.name.trim(),
      description: input.description.trim(),
      status: input.status || 'DRAFT',
      start_at: input.start_at,
      end_at: input.end_at,
      created_at: new Date().toISOString()
    }

    const response = await zeroDBClient.insertRows<Hackathon>(TABLE_NAME, [hackathon])

    if (!response.success || !response.row_ids || response.row_ids.length === 0) {
      throw new APIError(response.error || 'Failed to create hackathon')
    }

    return hackathon
  } catch (error: any) {
    const apiError = handleAPIError(error, {
      endpoint: `/database/tables/${TABLE_NAME}/rows`,
      method: 'POST',
      payload: input
    })
    showErrorToast(apiError, 'Failed to create hackathon')
    throw apiError
  }
}

export async function listHackathons(params: ListHackathonsParams = {}): Promise<Hackathon[]> {
  try {
    const filter: Record<string, any> = {}

    if (params.status) {
      filter.status = params.status
    }

    const response = await zeroDBClient.queryRows<Hackathon>(TABLE_NAME, {
      filter: Object.keys(filter).length > 0 ? filter : undefined,
      limit: params.limit,
      offset: params.offset,
      sort: { created_at: -1 }
    })

    if (!response.success) {
      throw new APIError(response.error || 'Failed to fetch hackathons')
    }

    return response.rows || []
  } catch (error: any) {
    const apiError = handleAPIError(error, {
      endpoint: `/database/tables/${TABLE_NAME}/rows`,
      method: 'GET'
    })
    showErrorToast(apiError, 'Failed to fetch hackathons')
    throw apiError
  }
}

export async function getHackathonById(hackathonId: string): Promise<Hackathon | null> {
  try {
    validateUUID(hackathonId, 'hackathon_id')

    const response = await zeroDBClient.queryRows<Hackathon>(TABLE_NAME, {
      filter: { hackathon_id: hackathonId },
      limit: 1
    })

    if (!response.success) {
      throw new APIError(response.error || 'Failed to fetch hackathon')
    }

    return response.rows && response.rows.length > 0 ? response.rows[0] : null
  } catch (error: any) {
    const apiError = handleAPIError(error, {
      endpoint: `/database/tables/${TABLE_NAME}/rows`,
      method: 'GET'
    })
    showErrorToast(apiError, 'Failed to fetch hackathon')
    throw apiError
  }
}

export async function getHackathonsByStatus(status: 'DRAFT' | 'LIVE' | 'CLOSED'): Promise<Hackathon[]> {
  return listHackathons({ status })
}

export async function updateHackathon(input: UpdateHackathonInput): Promise<Hackathon> {
  try {
    validateUUID(input.hackathon_id, 'hackathon_id')

    const existing = await getHackathonById(input.hackathon_id)
    if (!existing) {
      throw new APIError('Hackathon not found', 404)
    }

    const updates: Record<string, any> = {}

    if (input.name !== undefined) {
      if (input.name.trim().length === 0) {
        throw new APIError('Hackathon name cannot be empty')
      }
      updates.name = input.name.trim()
    }

    if (input.description !== undefined) {
      if (input.description.trim().length === 0) {
        throw new APIError('Hackathon description cannot be empty')
      }
      updates.description = input.description.trim()
    }

    if (input.status !== undefined) {
      const validTransitions: Record<string, string[]> = {
        'DRAFT': ['LIVE', 'CLOSED'],
        'LIVE': ['CLOSED'],
        'CLOSED': []
      }

      if (!validTransitions[existing.status].includes(input.status)) {
        throw new APIError(`Cannot transition from ${existing.status} to ${input.status}`)
      }

      updates.status = input.status
    }

    if (input.start_at !== undefined || input.end_at !== undefined) {
      const startAt = input.start_at || existing.start_at
      const endAt = input.end_at || existing.end_at

      const startDate = new Date(startAt)
      const endDate = new Date(endAt)

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new APIError('Invalid date format')
      }

      if (startDate >= endDate) {
        throw new APIError('Start date must be before end date')
      }

      if (input.start_at !== undefined) updates.start_at = input.start_at
      if (input.end_at !== undefined) updates.end_at = input.end_at
    }

    if (Object.keys(updates).length === 0) {
      return existing
    }

    const filter = { hackathon_id: input.hackathon_id }
    const update = { $set: updates }

    const response = await zeroDBClient.queryRows<Hackathon>(TABLE_NAME, {
      filter,
      limit: 1
    })

    if (!response.success || !response.rows || response.rows.length === 0) {
      throw new APIError('Hackathon not found', 404)
    }

    const updatedHackathon = { ...response.rows[0], ...updates }

    await zeroDBClient.insertRows<Hackathon>(TABLE_NAME, [updatedHackathon])

    return updatedHackathon
  } catch (error: any) {
    const apiError = handleAPIError(error, {
      endpoint: `/database/tables/${TABLE_NAME}/rows`,
      method: 'PATCH',
      payload: input
    })
    showErrorToast(apiError, 'Failed to update hackathon')
    throw apiError
  }
}

export async function deleteHackathon(hackathonId: string): Promise<void> {
  try {
    validateUUID(hackathonId, 'hackathon_id')

    const existing = await getHackathonById(hackathonId)
    if (!existing) {
      throw new APIError('Hackathon not found', 404)
    }

    if (existing.status === 'LIVE') {
      throw new APIError('Cannot delete a live hackathon')
    }

    throw new APIError('Delete operation not supported by ZeroDB client yet')
  } catch (error: any) {
    const apiError = handleAPIError(error, {
      endpoint: `/database/tables/${TABLE_NAME}/rows`,
      method: 'DELETE'
    })
    showErrorToast(apiError, 'Failed to delete hackathon')
    throw apiError
  }
}
