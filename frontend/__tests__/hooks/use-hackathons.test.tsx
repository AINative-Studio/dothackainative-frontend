import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import {
  useHackathons,
  useHackathonById,
  useHackathonsByStatus,
  useLiveHackathons,
  useDraftHackathons,
  useClosedHackathons,
  useCreateHackathon,
  useUpdateHackathon,
  useDeleteHackathon,
  HACKATHONS_QUERY_KEY,
} from '@/hooks/use-hackathons'
import * as hackathonsApi from '@/lib/api/hackathons'
import { mockHackathon, mockHackathons } from '../utils/mock-zerodb'

jest.mock('@/lib/api/hackathons')

const mockedHackathonsApi = hackathonsApi as jest.Mocked<typeof hackathonsApi>

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
        staleTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  })

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('useHackathons', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch hackathons successfully', async () => {
    mockedHackathonsApi.listHackathons.mockResolvedValue(mockHackathons)

    const { result } = renderHook(() => useHackathons(), {
      wrapper: createWrapper(),
    })

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual(mockHackathons)
    expect(mockedHackathonsApi.listHackathons).toHaveBeenCalledWith({})
  })

  it('should pass parameters to listHackathons', async () => {
    const params = { status: 'LIVE' as const, limit: 10, offset: 0 }
    mockedHackathonsApi.listHackathons.mockResolvedValue([mockHackathons[1]])

    const { result } = renderHook(() => useHackathons(params), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(mockedHackathonsApi.listHackathons).toHaveBeenCalledWith(params)
    expect(result.current.data).toEqual([mockHackathons[1]])
  })

  it('should handle errors', async () => {
    const error = new Error('Failed to fetch')
    mockedHackathonsApi.listHackathons.mockRejectedValue(error)

    const { result } = renderHook(() => useHackathons(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toEqual(error)
  })
})

describe('useHackathonById', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch hackathon by id successfully', async () => {
    mockedHackathonsApi.getHackathonById.mockResolvedValue(mockHackathon)

    const { result } = renderHook(
      () => useHackathonById(mockHackathon.hackathon_id),
      {
        wrapper: createWrapper(),
      }
    )

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual(mockHackathon)
    expect(mockedHackathonsApi.getHackathonById).toHaveBeenCalledWith(
      mockHackathon.hackathon_id
    )
  })

  it('should not fetch when hackathonId is empty', async () => {
    const { result } = renderHook(() => useHackathonById(''), {
      wrapper: createWrapper(),
    })

    expect(result.current.isLoading).toBe(false)
    expect(mockedHackathonsApi.getHackathonById).not.toHaveBeenCalled()
  })

  it('should return null when hackathon not found', async () => {
    mockedHackathonsApi.getHackathonById.mockResolvedValue(null)

    const { result } = renderHook(() => useHackathonById('non-existent-id'), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toBeNull()
  })
})

describe('useHackathonsByStatus', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch hackathons by status', async () => {
    const liveHackathons = [mockHackathons[1]]
    mockedHackathonsApi.getHackathonsByStatus.mockResolvedValue(liveHackathons)

    const { result } = renderHook(() => useHackathonsByStatus('LIVE'), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual(liveHackathons)
    expect(mockedHackathonsApi.getHackathonsByStatus).toHaveBeenCalledWith('LIVE')
  })
})

describe('useLiveHackathons', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch live hackathons', async () => {
    const liveHackathons = [mockHackathons[1]]
    mockedHackathonsApi.getHackathonsByStatus.mockResolvedValue(liveHackathons)

    const { result } = renderHook(() => useLiveHackathons(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual(liveHackathons)
    expect(mockedHackathonsApi.getHackathonsByStatus).toHaveBeenCalledWith('LIVE')
  })
})

describe('useDraftHackathons', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch draft hackathons', async () => {
    const draftHackathons = [mockHackathons[0]]
    mockedHackathonsApi.getHackathonsByStatus.mockResolvedValue(draftHackathons)

    const { result } = renderHook(() => useDraftHackathons(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual(draftHackathons)
    expect(mockedHackathonsApi.getHackathonsByStatus).toHaveBeenCalledWith('DRAFT')
  })
})

describe('useClosedHackathons', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch closed hackathons', async () => {
    const closedHackathons = [mockHackathons[2]]
    mockedHackathonsApi.getHackathonsByStatus.mockResolvedValue(closedHackathons)

    const { result } = renderHook(() => useClosedHackathons(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual(closedHackathons)
    expect(mockedHackathonsApi.getHackathonsByStatus).toHaveBeenCalledWith('CLOSED')
  })
})

describe('useCreateHackathon', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create hackathon successfully', async () => {
    const input = {
      name: 'New Hackathon',
      description: 'A new hackathon',
      start_at: '2024-01-01T00:00:00Z',
      end_at: '2024-01-02T00:00:00Z',
    }

    mockedHackathonsApi.createHackathon.mockResolvedValue(mockHackathon)

    const { result } = renderHook(() => useCreateHackathon(), {
      wrapper: createWrapper(),
    })

    result.current.mutate(input)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual(mockHackathon)
    expect(mockedHackathonsApi.createHackathon).toHaveBeenCalledWith(input)
  })

  it('should handle creation errors', async () => {
    const input = {
      name: 'New Hackathon',
      description: 'A new hackathon',
      start_at: '2024-01-01T00:00:00Z',
      end_at: '2024-01-02T00:00:00Z',
    }
    const error = new Error('Creation failed')

    mockedHackathonsApi.createHackathon.mockRejectedValue(error)

    const { result } = renderHook(() => useCreateHackathon(), {
      wrapper: createWrapper(),
    })

    result.current.mutate(input)

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toEqual(error)
  })

  it('should invalidate queries on success', async () => {
    const input = {
      name: 'New Hackathon',
      description: 'A new hackathon',
      start_at: '2024-01-01T00:00:00Z',
      end_at: '2024-01-02T00:00:00Z',
    }

    mockedHackathonsApi.createHackathon.mockResolvedValue(mockHackathon)
    mockedHackathonsApi.listHackathons.mockResolvedValue([mockHackathon])

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    })

    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )

    const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries')
    const setQueryDataSpy = jest.spyOn(queryClient, 'setQueryData')

    const { result } = renderHook(() => useCreateHackathon(), { wrapper })

    result.current.mutate(input)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: [HACKATHONS_QUERY_KEY],
    })
    expect(setQueryDataSpy).toHaveBeenCalledWith(
      [HACKATHONS_QUERY_KEY, mockHackathon.hackathon_id],
      mockHackathon
    )
  })
})

describe('useUpdateHackathon', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should update hackathon successfully', async () => {
    const input = {
      hackathon_id: mockHackathon.hackathon_id,
      name: 'Updated Hackathon',
    }

    const updatedHackathon = { ...mockHackathon, name: 'Updated Hackathon' }
    mockedHackathonsApi.updateHackathon.mockResolvedValue(updatedHackathon)

    const { result } = renderHook(() => useUpdateHackathon(), {
      wrapper: createWrapper(),
    })

    result.current.mutate(input)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual(updatedHackathon)
    expect(mockedHackathonsApi.updateHackathon).toHaveBeenCalledWith(input)
  })

  it('should implement optimistic updates', async () => {
    const input = {
      hackathon_id: mockHackathon.hackathon_id,
      name: 'Updated Hackathon',
    }

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    })

    queryClient.setQueryData(
      [HACKATHONS_QUERY_KEY, mockHackathon.hackathon_id],
      mockHackathon
    )

    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )

    const updatedHackathon = { ...mockHackathon, name: 'Updated Hackathon' }
    mockedHackathonsApi.updateHackathon.mockResolvedValue(updatedHackathon)

    const { result } = renderHook(() => useUpdateHackathon(), { wrapper })

    result.current.mutate(input)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    const cachedData = queryClient.getQueryData([
      HACKATHONS_QUERY_KEY,
      mockHackathon.hackathon_id,
    ])
    expect(cachedData).toEqual(updatedHackathon)
  })

  it('should rollback on error', async () => {
    const input = {
      hackathon_id: mockHackathon.hackathon_id,
      name: 'Updated Hackathon',
    }

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    })

    queryClient.setQueryData(
      [HACKATHONS_QUERY_KEY, mockHackathon.hackathon_id],
      mockHackathon
    )

    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )

    const error = new Error('Update failed')
    mockedHackathonsApi.updateHackathon.mockRejectedValue(error)

    const { result } = renderHook(() => useUpdateHackathon(), { wrapper })

    result.current.mutate(input)

    await waitFor(() => expect(result.current.isError).toBe(true))

    const cachedData = queryClient.getQueryData([
      HACKATHONS_QUERY_KEY,
      mockHackathon.hackathon_id,
    ])
    expect(cachedData).toEqual(mockHackathon)
  })
})

describe('useDeleteHackathon', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should delete hackathon successfully', async () => {
    mockedHackathonsApi.deleteHackathon.mockResolvedValue(undefined)

    const { result } = renderHook(() => useDeleteHackathon(), {
      wrapper: createWrapper(),
    })

    result.current.mutate(mockHackathon.hackathon_id)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(mockedHackathonsApi.deleteHackathon).toHaveBeenCalledWith(
      mockHackathon.hackathon_id
    )
  })

  it('should invalidate and remove queries on success', async () => {
    mockedHackathonsApi.deleteHackathon.mockResolvedValue(undefined)

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    })

    queryClient.setQueryData(
      [HACKATHONS_QUERY_KEY, mockHackathon.hackathon_id],
      mockHackathon
    )

    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )

    const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries')
    const removeQueriesSpy = jest.spyOn(queryClient, 'removeQueries')

    const { result } = renderHook(() => useDeleteHackathon(), { wrapper })

    result.current.mutate(mockHackathon.hackathon_id)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: [HACKATHONS_QUERY_KEY],
    })
    expect(removeQueriesSpy).toHaveBeenCalledWith({
      queryKey: [HACKATHONS_QUERY_KEY, mockHackathon.hackathon_id],
    })
  })

  it('should handle deletion errors', async () => {
    const error = new Error('Deletion failed')
    mockedHackathonsApi.deleteHackathon.mockRejectedValue(error)

    const { result } = renderHook(() => useDeleteHackathon(), {
      wrapper: createWrapper(),
    })

    result.current.mutate(mockHackathon.hackathon_id)

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toEqual(error)
  })
})
