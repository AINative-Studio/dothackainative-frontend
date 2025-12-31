import { ZeroDBClient, ZeroDBInsertResponse, ZeroDBQueryResponse, ZeroDBTableRow } from '@/lib/zerodb'

export function createMockZeroDBClient() {
  const mockInsertRows = jest.fn<Promise<ZeroDBInsertResponse>, [string, ZeroDBTableRow[]]>()
  const mockQueryRows = jest.fn<Promise<ZeroDBQueryResponse>, [string, any?]>()
  const mockEmbedAndStore = jest.fn()
  const mockSearch = jest.fn()

  const mockClient: Partial<ZeroDBClient> = {
    insertRows: mockInsertRows,
    queryRows: mockQueryRows,
    embedAndStore: mockEmbedAndStore,
    search: mockSearch,
  }

  return {
    mockClient: mockClient as ZeroDBClient,
    mockInsertRows,
    mockQueryRows,
    mockEmbedAndStore,
    mockSearch,
  }
}

export function mockZeroDBModule() {
  const mocks = createMockZeroDBClient()

  jest.mock('@/lib/zerodb', () => ({
    ...jest.requireActual('@/lib/zerodb'),
    zeroDBClient: mocks.mockClient,
  }))

  return mocks
}

export const mockHackathon = {
  hackathon_id: '123e4567-e89b-12d3-a456-426614174000',
  name: 'Test Hackathon',
  description: 'A test hackathon',
  status: 'DRAFT' as const,
  start_at: '2024-01-01T00:00:00Z',
  end_at: '2024-01-02T00:00:00Z',
  created_at: '2023-12-01T00:00:00Z',
}

export const mockHackathons = [
  mockHackathon,
  {
    hackathon_id: '223e4567-e89b-12d3-a456-426614174001',
    name: 'Live Hackathon',
    description: 'A live hackathon',
    status: 'LIVE' as const,
    start_at: '2024-01-01T00:00:00Z',
    end_at: '2024-12-31T23:59:59Z',
    created_at: '2023-12-01T00:00:00Z',
  },
  {
    hackathon_id: '323e4567-e89b-12d3-a456-426614174002',
    name: 'Closed Hackathon',
    description: 'A closed hackathon',
    status: 'CLOSED' as const,
    start_at: '2023-01-01T00:00:00Z',
    end_at: '2023-01-02T00:00:00Z',
    created_at: '2023-01-01T00:00:00Z',
  },
]
