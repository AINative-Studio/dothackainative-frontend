/**
 * Base error class for all API-related errors
 */
export class ApiError extends Error {
  public readonly status?: number
  public readonly statusText?: string
  public readonly url?: string
  public readonly method?: string
  public readonly details?: any

  constructor(
    message: string,
    options?: {
      status?: number
      statusText?: string
      url?: string
      method?: string
      details?: any
    }
  ) {
    super(message)
    this.name = 'ApiError'
    this.status = options?.status
    this.statusText = options?.statusText
    this.url = options?.url
    this.method = options?.method
    this.details = options?.details

    // Maintains proper stack trace for where error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError)
    }
  }
}

/**
 * 401 Unauthorized - Authentication required or failed
 */
export class AuthenticationError extends ApiError {
  constructor(message: string = 'Authentication required', details?: any) {
    super(message, { status: 401, details })
    this.name = 'AuthenticationError'
  }
}

/**
 * 403 Forbidden - Authenticated but not authorized
 */
export class AuthorizationError extends ApiError {
  constructor(message: string = 'Access forbidden', details?: any) {
    super(message, { status: 403, details })
    this.name = 'AuthorizationError'
  }
}

/**
 * 404 Not Found - Resource does not exist
 */
export class NotFoundError extends ApiError {
  constructor(message: string = 'Resource not found', details?: any) {
    super(message, { status: 404, details })
    this.name = 'NotFoundError'
  }
}

/**
 * 400 Bad Request - Validation error or invalid input
 */
export class ValidationError extends ApiError {
  public readonly errors?: Record<string, string[]>

  constructor(
    message: string = 'Validation failed',
    errors?: Record<string, string[]>,
    details?: any
  ) {
    super(message, { status: 400, details })
    this.name = 'ValidationError'
    this.errors = errors
  }
}

/**
 * 409 Conflict - Resource conflict (e.g., duplicate entry)
 */
export class ConflictError extends ApiError {
  constructor(message: string = 'Resource conflict', details?: any) {
    super(message, { status: 409, details })
    this.name = 'ConflictError'
  }
}

/**
 * 500+ Server Error - Internal server errors
 */
export class ServerError extends ApiError {
  constructor(message: string = 'Internal server error', status?: number, details?: any) {
    super(message, { status: status || 500, details })
    this.name = 'ServerError'
  }
}

/**
 * Network error - Failed to reach server
 */
export class NetworkError extends ApiError {
  constructor(message: string = 'Network request failed', details?: any) {
    super(message, { details })
    this.name = 'NetworkError'
  }
}

/**
 * Timeout error - Request took too long
 */
export class TimeoutError extends ApiError {
  constructor(message: string = 'Request timeout', details?: any) {
    super(message, { details })
    this.name = 'TimeoutError'
  }
}

/**
 * Rate limit error - Too many requests
 */
export class RateLimitError extends ApiError {
  public readonly retryAfter?: number

  constructor(message: string = 'Rate limit exceeded', retryAfter?: number, details?: any) {
    super(message, { status: 429, details })
    this.name = 'RateLimitError'
    this.retryAfter = retryAfter
  }
}

/**
 * Maps HTTP status codes to appropriate error classes
 */
export function createErrorFromResponse(
  status: number,
  message: string,
  details?: any,
  url?: string,
  method?: string
): ApiError {
  const options = { status, url, method, details }

  switch (status) {
    case 400:
      return new ValidationError(message, details?.errors, details)
    case 401:
      return new AuthenticationError(message, details)
    case 403:
      return new AuthorizationError(message, details)
    case 404:
      return new NotFoundError(message, details)
    case 409:
      return new ConflictError(message, details)
    case 429:
      return new RateLimitError(message, details?.retryAfter, details)
    case 500:
    case 502:
    case 503:
    case 504:
      return new ServerError(message, status, details)
    default:
      return new ApiError(message, options)
  }
}
