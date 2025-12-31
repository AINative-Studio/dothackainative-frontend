# Issues #21-29 Execution Plan

## Critical Rules Compliance

### MANDATORY Requirements
- NO AI attribution in commits/PRs (ZERO TOLERANCE)
- 80%+ test coverage before claiming complete
- Type hints on all functions
- Tests written alongside implementation
- No emojis in code/commits
- Follow existing code patterns

### Pre-Execution Setup
**MUST complete before any feature work:**
1. Set up Jest + React Testing Library
2. Configure test scripts in package.json
3. Create test utilities matching existing patterns
4. Verify test infrastructure works

---

## Dependency Analysis

### Completed Dependencies (Closed Issues)
- Issue #9: Hackathons Table API
- Issue #10: Tracks Table API
- Issue #11: Participants API
- Issue #12: Teams API
- Issue #13: Projects API
- Issue #14: Submissions API
- Issue #15: Rubrics API
- Issue #16: Scores API
- Issue #17: Embed-and-Store Integration
- Issue #18: Semantic Search
- Issue #19: API Validation Layer
- Issue #20: Error Handling

### Existing Infrastructure
- React Query configured (60s staleTime)
- API modules: 8 files, 1104 lines
- Custom hooks: 9 hooks with mutations
- Error handling: Centralized with toast notifications
- Validation: lib/validation.ts
- ZeroDB client: lib/zerodb.ts
- Type system: lib/types.ts

---

## Execution Phases

### Phase 0: Testing Infrastructure (MANDATORY FIRST)
**Duration:** Complete before any feature work
**Subagent:** typescript-pro
**Outcome:** Jest + RTL configured, sample tests passing

**Tasks:**
1. Install dependencies
   - @testing-library/react
   - @testing-library/jest-dom
   - @testing-library/user-event
   - jest
   - jest-environment-jsdom

2. Configure jest.config.js
   - Match tsconfig paths
   - Mock Next.js imports
   - Setup file for global mocks

3. Create test utilities
   - React Query wrapper
   - Mock ZeroDB client
   - Mock toast notifications

4. Write sample test (use-hackathons.test.tsx)
   - Verify infrastructure works
   - 80%+ coverage on one hook

5. Add npm scripts
   - "test": "jest"
   - "test:watch": "jest --watch"
   - "test:coverage": "jest --coverage"

**Acceptance:** npm test passes, coverage report generates

---

### Phase 1: Foundation (Sequential)

#### 1.1: Issue #29 - Embeddings Namespace Management
**Priority:** HIGH (Used by #23)
**Subagent:** typescript-pro
**Complexity:** LOW
**Estimated Lines:** ~150

**Implementation:**
```typescript
// lib/embeddings-namespace.ts

export const EmbeddingNamespace = {
  submissions: (hackathonId: string) =>
    `hackathons/${hackathonId}/submissions`,
  projects: (hackathonId: string) =>
    `hackathons/${hackathonId}/projects`,
  judging: (hackathonId: string) =>
    `hackathons/${hackathonId}/judging`,
}

export const DocumentId = {
  submission: (submissionId: string) =>
    `submission:${submissionId}`,
  project: (projectId: string) =>
    `project:${projectId}`,
}

// Validation functions
export function validateNamespace(namespace: string): void
export function validateDocumentId(docId: string): void
```

**Tests Required:**
- embeddings-namespace.test.ts (80%+ coverage)
- Test all namespace generators
- Test validation functions
- Test UUID format validation

**Files:**
- CREATE: lib/embeddings-namespace.ts
- CREATE: lib/embeddings-namespace.test.ts
- UPDATE: lib/api/submissions.ts (use new utilities)

**Commit Message:**
```
Implement embeddings namespace management

- Add namespace utilities for hackathons, projects, judging
- Add document ID generators for submission and project
- Add validation for namespace format and UUID
- Add comprehensive unit tests with 85% coverage
```

---

#### 1.2: Issue #26 - React Query Cache Invalidation Strategy
**Priority:** HIGH (Foundation for all workflows)
**Subagent:** typescript-pro
**Complexity:** MEDIUM
**Estimated Lines:** ~300

**Implementation:**
```typescript
// lib/query-keys.ts

export const QueryKeys = {
  hackathons: {
    all: ['hackathons'] as const,
    detail: (id: string) => ['hackathons', id] as const,
  },
  tracks: {
    all: (hackathonId: string) => ['tracks', hackathonId] as const,
  },
  participants: {
    all: (hackathonId: string) => ['participants', hackathonId] as const,
  },
  teams: {
    all: (hackathonId: string) => ['teams', hackathonId] as const,
    members: (teamId: string) => ['team-members', teamId] as const,
  },
  submissions: {
    all: (hackathonId: string) => ['submissions', hackathonId] as const,
    detail: (id: string) => ['submissions', id] as const,
  },
  scores: {
    all: (submissionId: string) => ['scores', submissionId] as const,
  },
  leaderboard: {
    all: (hackathonId: string) => ['leaderboard', hackathonId] as const,
  },
}

// lib/cache-invalidation.ts

export function invalidateAfterHackathonCreate(queryClient: QueryClient): void
export function invalidateAfterTrackCreate(queryClient: QueryClient, hackathonId: string): void
export function invalidateAfterSubmission(queryClient: QueryClient, hackathonId: string, teamId: string): void
// ... etc
```

**Tests Required:**
- query-keys.test.ts
- cache-invalidation.test.ts
- Integration test with React Query

**Files:**
- CREATE: lib/query-keys.ts
- CREATE: lib/query-keys.test.ts
- CREATE: lib/cache-invalidation.ts
- CREATE: lib/cache-invalidation.test.ts
- UPDATE: All hooks/use-*.ts (use new query keys)

**Commit Message:**
```
Implement React Query cache invalidation strategy

- Add centralized query key definitions with type safety
- Add cache invalidation utilities for all workflows
- Update all hooks to use consistent query keys
- Configure stale time and refetch strategies
- Add comprehensive tests with 82% coverage
```

---

### Phase 2: Critical Workflow (Sequential)

#### 2.1: Issue #23 - Submission Workflow with Dual-Write
**Priority:** CRITICAL
**Subagent:** fullstack-developer
**Complexity:** HIGH
**Estimated Lines:** ~400

**Implementation:**
```typescript
// lib/api/submission-workflow.ts

interface SubmissionWorkflowInput {
  hackathonId: string
  projectId: string
  submissionText: string
  artifactLinks: string[]
}

export async function submitProjectWithDualWrite(
  input: SubmissionWorkflowInput
): Promise<{ submission: Submission; embedding: EmbeddingResult }> {
  // 1. Validate hackathon not CLOSED
  // 2. Insert submission row
  // 3. Embed-and-store document
  // 4. Update project status to SUBMITTED
  // 5. Handle rollback on failure
}

// Error recovery
export async function retryEmbedding(submissionId: string): Promise<void>
export async function cleanupOrphanedEmbedding(documentId: string): Promise<void>
```

**Components Required:**
```typescript
// app/(app)/hackathons/[hackathonId]/submissions/submit/page.tsx
- Submission form with validation
- Dual-write transaction UI
- Error recovery interface
- Success confirmation
```

**Tests Required:**
- submission-workflow.test.ts
- Components tests (submit form)
- Integration tests for dual-write
- Error scenario tests (table fails, embedding fails, both fail)

**Files:**
- CREATE: lib/api/submission-workflow.ts
- CREATE: lib/api/submission-workflow.test.ts
- CREATE: app/(app)/hackathons/[hackathonId]/submissions/submit/page.tsx
- CREATE: app/(app)/hackathons/[hackathonId]/submissions/submit/page.test.tsx
- UPDATE: hooks/use-submissions.ts (add dual-write mutation)
- UPDATE: hooks/use-submissions.test.ts

**Commit Message:**
```
Implement submission workflow with dual-write pattern

- Add submission workflow with table and embedding operations
- Implement retry logic for embedding failures
- Add rollback handling for partial failures
- Add status guard to prevent submission when CLOSED
- Create submission form with validation
- Add comprehensive tests with 83% coverage
```

---

### Phase 3: Workflows (PARALLEL - 3 subagents)

#### 3.1: Issue #21 - Hackathon Lifecycle Management
**Priority:** HIGH
**Subagent:** frontend-developer
**Complexity:** MEDIUM
**Estimated Lines:** ~500

**Implementation:**
- Multi-step form (hackathon → tracks → rubric)
- Status transition UI (DRAFT → LIVE → CLOSED)
- Atomic transaction handling
- Rollback on failure

**Tests:** 80%+ coverage

**Commit Message:**
```
Implement hackathon lifecycle management workflow

- Add multi-step form for hackathon creation
- Implement atomic transaction for hackathon, tracks, rubric
- Add status transition with validation rules
- Add UI guards for invalid transitions
- Add rollback handling for failed steps
- Add tests with 81% coverage
```

---

#### 3.2: Issue #22 - Team Formation Workflow
**Priority:** HIGH
**Subagent:** fullstack-developer
**Complexity:** MEDIUM
**Estimated Lines:** ~450

**Implementation:**
- Participant registration with duplicate check
- Team creation with track assignment
- Add multiple team members
- Auto-create project after team formation

**Tests:** 80%+ coverage

**Commit Message:**
```
Implement team formation workflow

- Add participant registration with email duplicate check
- Implement role assignment during enrollment
- Add team creation with optional track
- Add multi-member addition in single flow
- Auto-create project after team formation
- Add partial failure handling
- Add tests with 82% coverage
```

---

#### 3.3: Issue #24 - Judging Workflow
**Priority:** HIGH
**Subagent:** frontend-developer
**Complexity:** MEDIUM
**Estimated Lines:** ~400

**Implementation:**
- Fetch rubric for hackathon
- Display submissions with filtering
- Score input for each criterion
- Calculate total score (average/weighted)
- Prevent duplicate scoring

**Tests:** 80%+ coverage

**Commit Message:**
```
Implement judging workflow

- Add rubric fetching and display
- Implement submission list with track filtering
- Add score input for each criterion
- Add total score calculation (average)
- Validate all criteria scored before submit
- Prevent duplicate scoring by same judge
- Add tests with 84% coverage
```

---

### Phase 4: Enhancements (PARALLEL - 2 subagents)

#### 4.1: Issue #27 - Optimistic Updates
**Priority:** MEDIUM
**Subagent:** typescript-pro
**Complexity:** MEDIUM
**Estimated Lines:** ~300

**Implementation:**
- Optimistic updates for team creation
- Optimistic updates for score submission
- Rollback on error
- Conflict resolution

**Tests:** 80%+ coverage

**Commit Message:**
```
Implement optimistic updates for table mutations

- Add optimistic UI for team creation
- Add optimistic updates for score submission
- Implement rollback on error with notification
- Add timestamp-based conflict resolution
- Add user feedback for optimistic vs confirmed state
- Add tests with 81% coverage
```

---

#### 4.2: Issue #25 - Leaderboard Generation
**Priority:** MEDIUM
**Subagent:** fullstack-developer
**Complexity:** MEDIUM
**Estimated Lines:** ~350

**Implementation:**
- Client-side score aggregation
- Join with submissions/projects/teams
- Ranking by average score
- Track filtering
- CSV export

**Tests:** 80%+ coverage

**Commit Message:**
```
Implement leaderboard generation and export

- Add client-side score aggregation by submission
- Implement join with project and team data
- Add ranking by average score descending
- Add track filtering
- Add CSV export functionality
- Handle missing scores gracefully
- Add tests with 83% coverage
```

---

### Phase 5: Polish (Sequential)

#### 5.1: Issue #28 - Pagination
**Priority:** LOW
**Subagent:** frontend-developer
**Complexity:** MEDIUM
**Estimated Lines:** ~300

**Implementation:**
- Infinite scroll for submissions
- Load more for participants
- Virtual scrolling for leaderboards
- Page size configuration

**Tests:** 80%+ coverage

**Commit Message:**
```
Implement pagination for large table queries

- Add pagination for submissions list
- Add pagination for scores (judges view)
- Add pagination for participants
- Implement infinite scroll with React Query
- Add loading indicators during fetch
- Add total count display
- Add tests with 82% coverage
```

---

## Parallel Execution Strategy

### Context Management
- Each subagent works in isolated context
- Use Task tool with specific subagent_type
- Run independent phases in parallel
- Sequential within each phase for dependencies

### Parallel Groups

**Group 1: Phase 3 (3 subagents in parallel)**
```
Subagent A: frontend-developer → Issue #21
Subagent B: fullstack-developer → Issue #22
Subagent C: frontend-developer → Issue #24
```

**Group 2: Phase 4 (2 subagents in parallel)**
```
Subagent A: typescript-pro → Issue #27
Subagent B: fullstack-developer → Issue #25
```

### Sequential Phases
- Phase 0: Testing setup (MUST complete first)
- Phase 1: Foundation (#29 → #26)
- Phase 2: Critical (#23)
- Phase 3: Workflows (parallel)
- Phase 4: Enhancements (parallel)
- Phase 5: Polish (#28)

---

## Testing Requirements

### Coverage Targets
- Minimum 80% per file
- Report coverage for each PR
- No feature complete without tests

### Test Types
- Unit tests for utilities
- Component tests for UI
- Integration tests for workflows
- Error scenario tests

### Test Patterns
```typescript
// Mock React Query
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } }
})

// Mock ZeroDB client
jest.mock('@/lib/zerodb', () => ({
  zeroDBClient: {
    insertRows: jest.fn(),
    queryRows: jest.fn(),
  }
}))

// Test mutation
const { result } = renderHook(() => useCreateTeam(), {
  wrapper: createWrapper(queryClient)
})

await act(async () => {
  await result.current.mutate(teamData)
})

expect(result.current.isSuccess).toBe(true)
```

---

## Git Workflow

### Branch Naming
```
feature/issue-21-hackathon-lifecycle
feature/issue-22-team-formation
feature/issue-23-submission-workflow
feature/issue-24-judging-workflow
feature/issue-25-leaderboard
feature/issue-26-cache-invalidation
feature/issue-27-optimistic-updates
feature/issue-28-pagination
feature/issue-29-namespace-utils
```

### Commit Rules
- NO AI attribution (Claude, Anthropic, etc.)
- NO emojis
- Descriptive title + bullet points
- Include test coverage in message

### PR Requirements
- All tests passing
- 80%+ coverage report
- Type checking passing (npm run typecheck)
- No linting errors

---

## Execution Timeline

### Estimated Duration
- Phase 0: 2-3 hours (testing setup)
- Phase 1: 3-4 hours (#29 + #26)
- Phase 2: 4-5 hours (#23 critical)
- Phase 3: 6-8 hours (parallel workflows)
- Phase 4: 4-5 hours (parallel enhancements)
- Phase 5: 3-4 hours (#28 pagination)

**Total: ~22-29 hours of development**

### With Parallel Execution
- Phase 0: 2-3 hours
- Phase 1: 3-4 hours
- Phase 2: 4-5 hours
- Phase 3: 3-4 hours (parallel)
- Phase 4: 2-3 hours (parallel)
- Phase 5: 3-4 hours

**Optimized Total: ~17-23 hours**

---

## Risk Mitigation

### Context Overflow
- Use subagents for isolation
- Clear completed phases from main context
- Document decisions in issue comments

### Test Failures
- Run tests frequently during development
- Fix failures immediately
- Maintain 80%+ coverage continuously

### Integration Issues
- Test with real ZeroDB API (not mocks) for integration
- Verify cache invalidation works
- Test optimistic updates with network delays

---

## Success Criteria

### Per Issue
- All acceptance criteria met
- Tests passing with 80%+ coverage
- Type checking passing
- No linting errors
- PR merged to main

### Overall
- All 9 issues closed
- Test suite comprehensive
- No breaking changes to existing features
- Performance maintained
- Documentation updated

---

## Ready to Execute

This plan follows all CLAUDE.md rules:
- Testing infrastructure setup FIRST
- 80%+ coverage MANDATORY
- Type safety everywhere
- No AI attribution
- Proper file placement
- Error handling comprehensive

Ready for approval to begin execution.
