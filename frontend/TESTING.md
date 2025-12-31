# Testing Infrastructure

## Overview

This project uses Jest and React Testing Library for unit and integration testing with full TypeScript support.

## Setup

All testing dependencies are installed. The infrastructure includes:

- Jest for test execution
- React Testing Library for component testing
- Babel for TypeScript/JSX transformation
- Custom test utilities for React Query testing
- Mock implementations for ZeroDB and toast notifications

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

```
frontend/
  __tests__/
    hooks/
      use-hackathons.test.tsx
    lib/
      embeddings-namespace.test.ts
      query-keys.test.ts
      cache-invalidation.test.ts
      pagination.test.ts
      workflows/
        submission-workflow.test.ts
        hackathon-lifecycle.test.ts
        team-formation.test.ts
        judging.test.ts
        leaderboard.test.ts
    components/
      InvitationCard.test.tsx
      InvitationActions.test.tsx
    utils/
      test-utils.tsx
      mock-zerodb.ts
      mock-toast.ts
```

## Writing Tests

### Testing Hooks

For hooks that use React Query:

```typescript
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useYourHook } from '@/hooks/use-your-hook'
import * as yourApi from '@/lib/api/your-api'

jest.mock('@/lib/api/your-api')

const mockedApi = yourApi as jest.Mocked<typeof yourApi>

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

describe('useYourHook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch data successfully', async () => {
    mockedApi.fetchData.mockResolvedValue(mockData)

    const { result } = renderHook(() => useYourHook(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual(mockData)
  })
})
```

### Testing Components

Use the custom render function from test-utils:

```typescript
import { render, screen } from '@/__tests__/utils/test-utils'
import { YourComponent } from '@/components/YourComponent'

describe('YourComponent', () => {
  it('should render correctly', () => {
    render(<YourComponent />)

    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

## Mock Utilities

### ZeroDB Mock

```typescript
import { createMockZeroDBClient, mockHackathon } from '@/__tests__/utils/mock-zerodb'

const { mockClient, mockInsertRows, mockQueryRows } = createMockZeroDBClient()

// Mock successful insert
mockInsertRows.mockResolvedValue({
  success: true,
  row_ids: ['123'],
})

// Mock successful query
mockQueryRows.mockResolvedValue({
  success: true,
  rows: [mockHackathon],
})
```

### Toast Mock

The toast system is automatically mocked in jest.setup.js. No additional setup needed.

## Configuration Files

- `jest.config.js` - Jest configuration with Babel transformer
- `jest.setup.js` - Global test setup (mocks for Next.js, crypto, etc.)
- `babel.config.js` - Babel configuration for JSX/TypeScript transformation
- `tsconfig.test.json` - TypeScript configuration for tests

## Coverage Reports

Coverage reports are generated in the `coverage/` directory when running `npm run test:coverage`.

Current coverage targets are set to 0% globally to allow gradual improvement. Individual modules should aim for:

- Statements: 80%+
- Branches: 80%+
- Functions: 80%+
- Lines: 80%+

## Best Practices

1. Use `.test.tsx` extension for files containing JSX
2. Use `.test.ts` extension for pure TypeScript tests
3. Clear all mocks in `beforeEach` hooks
4. Use `waitFor` for async operations
5. Mock external dependencies (APIs, services)
6. Test both success and error cases
7. Verify cache invalidation for mutations
8. Test optimistic updates and rollbacks

## Testing Pagination

For pagination utilities and infinite queries:

```typescript
import {
  getNextPageParam,
  flattenPages,
  createPaginationParams
} from '@/lib/pagination'

describe('pagination', () => {
  it('returns next offset when page is full', () => {
    const lastPage = Array(50).fill({ id: '1' })
    const allPages = [lastPage]
    const nextParam = getNextPageParam(lastPage, allPages, 50)
    expect(nextParam).toBe(50)
  })

  it('returns undefined for partial page', () => {
    const lastPage = Array(30).fill({ id: '1' })
    const allPages = [lastPage]
    const nextParam = getNextPageParam(lastPage, allPages, 50)
    expect(nextParam).toBeUndefined()
  })

  it('flattens pages correctly', () => {
    const pages = [[{ id: '1' }], [{ id: '2' }]]
    const flattened = flattenPages(pages)
    expect(flattened).toEqual([{ id: '1' }, { id: '2' }])
  })
})
```

See `__tests__/lib/pagination.test.ts` for complete pagination test suite with 100% coverage.

## Example: Complete Hook Test

See `__tests__/hooks/use-hackathons.test.tsx` for a comprehensive example covering:

- Query hooks (fetch, filter, by ID)
- Mutation hooks (create, update, delete)
- Optimistic updates
- Error handling
- Cache invalidation
- Rollback on error

## Troubleshooting

### JSX Syntax Errors

If you get JSX parsing errors, ensure:
- File has `.tsx` extension (not `.ts`)
- Babel configuration is correct
- `@babel/preset-react` is installed

### Mock Not Working

If mocks aren't being applied:
- Check jest.mock() is called before imports
- Verify mock path matches actual module path
- Use `jest.clearAllMocks()` in beforeEach

### Type Errors

If TypeScript complains about test types:
- Install `@types/jest`
- Ensure `jest` is in tsconfig types
- Use proper type casting for mocks
