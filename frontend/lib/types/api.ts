/**
 * Common API response wrapper
 */
export interface ApiSuccessResponse<T> {
  success: true
  data: T
  message?: string
  meta?: {
    page?: number
    pageSize?: number
    total?: number
    hasMore?: boolean
  }
}

export interface ApiErrorResponse {
  success: false
  error: string
  message: string
  details?: any
  errors?: Record<string, string[]>
  statusCode?: number
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page?: number
  pageSize?: number
  limit?: number
  offset?: number
}

/**
 * Sorting parameters
 */
export interface SortParams {
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

/**
 * Filter parameters
 */
export interface FilterParams {
  [key: string]: any
}

/**
 * Common list query parameters
 */
export interface ListQueryParams extends PaginationParams, SortParams, FilterParams {}

/**
 * Authentication responses
 */
export interface LoginResponse {
  accessToken: string
  refreshToken: string
  expiresIn: number
  user: {
    id: string
    email: string
    name: string
    role: string
  }
}

export interface RefreshTokenResponse {
  accessToken: string
  expiresIn: number
}

export interface LogoutResponse {
  message: string
}

/**
 * Health check response
 */
export interface HealthCheckResponse {
  status: 'ok' | 'degraded' | 'down'
  version: string
  timestamp: string
  services?: {
    database?: 'ok' | 'degraded' | 'down'
    cache?: 'ok' | 'degraded' | 'down'
    queue?: 'ok' | 'degraded' | 'down'
  }
}

/**
 * Batch operation response
 */
export interface BatchOperationResponse<T> {
  succeeded: T[]
  failed: Array<{
    item: T
    error: string
  }>
  total: number
  successCount: number
  failureCount: number
}

/**
 * File upload response
 */
export interface FileUploadResponse {
  url: string
  filename: string
  size: number
  contentType: string
  uploadedAt: string
}

/**
 * Validation error detail
 */
export interface ValidationErrorDetail {
  field: string
  message: string
  code?: string
  value?: any
}
