import { ApiClient } from '@/lib/api-client'
import {
  ApiError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ValidationError,
  ServerError,
  NetworkError,
  TimeoutError,
} from '@/lib/errors/api-errors'

// Mock fetch
global.fetch = jest.fn()

describe('ApiClient', () => {
  let client: ApiClient
  let mockFetch: jest.MockedFunction<typeof fetch>

  beforeEach(() => {
    client = new ApiClient('http://localhost:8000', 'v1')
    mockFetch = global.fetch as jest.MockedFunction<typeof fetch>
    mockFetch.mockClear()
  })

  describe('Constructor and Configuration', () => {
    it('should create instance with default configuration', () => {
      expect(client).toBeInstanceOf(ApiClient)
      expect(client.getAuthToken()).toBeNull()
    })

    it('should set and clear auth token', () => {
      const token = 'test-token'
      client.setAuthToken(token)
      expect(client.getAuthToken()).toBe(token)

      client.clearAuthToken()
      expect(client.getAuthToken()).toBeNull()
    })
  })

  describe('URL Building', () => {
    it('should build correct URL with API version', async () => {
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({ data: 'test' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      )

      await client.get('hackathons')

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/v1/hackathons',
        expect.any(Object)
      )
    })

    it('should handle endpoints with leading slash', async () => {
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({ data: 'test' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      )

      await client.get('/hackathons')

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/v1/hackathons',
        expect.any(Object)
      )
    })

    it('should handle endpoints with api/ prefix', async () => {
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({ data: 'test' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      )

      await client.get('api/v2/hackathons')

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/v2/hackathons',
        expect.any(Object)
      )
    })
  })

  describe('Authentication', () => {
    it('should add Authorization header when token is set', async () => {
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({ data: 'test' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      )

      client.setAuthToken('test-token')
      await client.get('hackathons')

      const callArgs = mockFetch.mock.calls[0]
      const headers = new Headers(callArgs[1]?.headers)
      expect(headers.get('Authorization')).toBe('Bearer test-token')
    })

    it('should not add Authorization header when skipAuth is true', async () => {
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({ data: 'test' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      )

      client.setAuthToken('test-token')
      await client.get('hackathons', { skipAuth: true })

      const callArgs = mockFetch.mock.calls[0]
      const headers = new Headers(callArgs[1]?.headers)
      expect(headers.get('Authorization')).toBeNull()
    })

    it('should not add Authorization header when token is not set', async () => {
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({ data: 'test' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      )

      await client.get('hackathons')

      const callArgs = mockFetch.mock.calls[0]
      const headers = new Headers(callArgs[1]?.headers)
      expect(headers.get('Authorization')).toBeNull()
    })
  })

  describe('HTTP Methods', () => {
    beforeEach(() => {
      mockFetch.mockResolvedValue(
        new Response(JSON.stringify({ data: 'test' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      )
    })

    it('should make GET request', async () => {
      await client.get('hackathons')

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ method: 'GET' })
      )
    })

    it('should make POST request with body', async () => {
      const data = { name: 'Test Hackathon' }
      await client.post('hackathons', data)

      const callArgs = mockFetch.mock.calls[0]
      expect(callArgs[1]?.method).toBe('POST')
      expect(callArgs[1]?.body).toBe(JSON.stringify(data))
    })

    it('should make PUT request with body', async () => {
      const data = { name: 'Updated Hackathon' }
      await client.put('hackathons/123', data)

      const callArgs = mockFetch.mock.calls[0]
      expect(callArgs[1]?.method).toBe('PUT')
      expect(callArgs[1]?.body).toBe(JSON.stringify(data))
    })

    it('should make PATCH request with body', async () => {
      const data = { status: 'LIVE' }
      await client.patch('hackathons/123', data)

      const callArgs = mockFetch.mock.calls[0]
      expect(callArgs[1]?.method).toBe('PATCH')
      expect(callArgs[1]?.body).toBe(JSON.stringify(data))
    })

    it('should make DELETE request', async () => {
      await client.delete('hackathons/123')

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ method: 'DELETE' })
      )
    })

    it('should add Content-Type header for requests with body', async () => {
      await client.post('hackathons', { name: 'Test' })

      const callArgs = mockFetch.mock.calls[0]
      const headers = new Headers(callArgs[1]?.headers)
      expect(headers.get('Content-Type')).toBe('application/json')
    })
  })

  describe('Error Handling', () => {
    it('should throw AuthenticationError on 401', async () => {
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({ message: 'Unauthorized' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        })
      )

      await expect(client.get('hackathons')).rejects.toThrow(AuthenticationError)
    })

    it('should throw AuthorizationError on 403', async () => {
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({ message: 'Forbidden' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        })
      )

      await expect(client.get('hackathons')).rejects.toThrow(AuthorizationError)
    })

    it('should throw NotFoundError on 404', async () => {
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({ message: 'Not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        })
      )

      await expect(client.get('hackathons/123')).rejects.toThrow(NotFoundError)
    })

    it('should throw ValidationError on 400 with errors', async () => {
      const errorResponse = {
        message: 'Validation failed',
        errors: {
          name: ['Name is required'],
          email: ['Invalid email format'],
        },
      }

      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify(errorResponse), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        })
      )

      try {
        await client.post('hackathons', {})
        fail('Should have thrown ValidationError')
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError)
        expect((error as ValidationError).errors).toEqual(errorResponse.errors)
      }
    })

    it('should throw ServerError on 500', async () => {
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({ message: 'Internal server error' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        })
      )

      await expect(client.get('hackathons', { retry: false })).rejects.toThrow(ServerError)
    })

    it('should throw NetworkError on network failure', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      await expect(client.get('hackathons', { retry: false })).rejects.toThrow(NetworkError)
    })
  })

  describe('Retry Logic', () => {
    it('should retry on 500 error', async () => {
      mockFetch
        .mockResolvedValueOnce(
          new Response(JSON.stringify({ message: 'Server error' }), { status: 500 })
        )
        .mockResolvedValueOnce(
          new Response(JSON.stringify({ message: 'Server error' }), { status: 500 })
        )
        .mockResolvedValueOnce(
          new Response(JSON.stringify({ data: 'success' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          })
        )

      const result = await client.get('hackathons', {
        retryAttempts: 3,
        retryDelay: 10,
      })

      expect(mockFetch).toHaveBeenCalledTimes(3)
      expect(result).toEqual({ data: 'success' })
    })

    it('should not retry on 400 error', async () => {
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({ message: 'Bad request' }), { status: 400 })
      )

      await expect(
        client.get('hackathons', {
          retryAttempts: 3,
        })
      ).rejects.toThrow(ValidationError)

      expect(mockFetch).toHaveBeenCalledTimes(1)
    })

    it('should respect retry flag', async () => {
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({ message: 'Server error' }), { status: 500 })
      )

      await expect(client.get('hackathons', { retry: false })).rejects.toThrow(ServerError)

      expect(mockFetch).toHaveBeenCalledTimes(1)
    })
  })

  describe('Timeout Handling', () => {
    it('should timeout after specified duration', async () => {
      // Mock a delayed response that takes longer than timeout
      mockFetch.mockImplementationOnce(
        () =>
          new Promise((_, reject) =>
            setTimeout(
              () => reject(new DOMException('The user aborted a request.', 'AbortError')),
              50
            )
          )
      )

      await expect(
        client.get('hackathons', {
          timeout: 100,
          retry: false,
        })
      ).rejects.toThrow(TimeoutError)
    }, 10000)
  })

  describe('Interceptors', () => {
    it('should apply request interceptors', async () => {
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({ data: 'test' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      )

      client.addRequestInterceptor(config => {
        const headers = new Headers(config.headers)
        headers.set('X-Custom-Header', 'test-value')
        return { ...config, headers }
      })

      await client.get('hackathons')

      const callArgs = mockFetch.mock.calls[0]
      const headers = new Headers(callArgs[1]?.headers)
      expect(headers.get('X-Custom-Header')).toBe('test-value')
    })

    it('should apply async request interceptors', async () => {
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({ data: 'test' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      )

      client.addRequestInterceptor(async config => {
        await new Promise(resolve => setTimeout(resolve, 10))
        const headers = new Headers(config.headers)
        headers.set('X-Async-Header', 'async-value')
        return { ...config, headers }
      })

      await client.get('hackathons')

      const callArgs = mockFetch.mock.calls[0]
      const headers = new Headers(callArgs[1]?.headers)
      expect(headers.get('X-Async-Header')).toBe('async-value')
    })
  })

  describe('Response Parsing', () => {
    it('should parse JSON response', async () => {
      const responseData = { id: '123', name: 'Test' }
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify(responseData), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      )

      const result = await client.get('hackathons/123')
      expect(result).toEqual(responseData)
    })

    it('should parse text response', async () => {
      const responseData = 'Plain text response'
      mockFetch.mockResolvedValueOnce(
        new Response(responseData, {
          status: 200,
          headers: { 'Content-Type': 'text/plain' },
        })
      )

      const result = await client.get('health')
      expect(result).toBe(responseData)
    })

    it('should handle empty response', async () => {
      mockFetch.mockResolvedValueOnce(
        new Response(null, {
          status: 204,
          headers: { 'Content-Type': 'text/plain' },
        })
      )

      const result = await client.delete('hackathons/123')
      expect(result).toBe('')
    })
  })
})
