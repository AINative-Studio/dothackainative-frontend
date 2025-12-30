import {
  validateAPIKey,
  validateTableRowData,
  validateEmbeddingModel,
  validateNamespace,
  APIValidationError
} from './validation'

const ZERODB_API_BASE = process.env.NEXT_PUBLIC_ZERODB_API_BASE || 'https://api.zerodb.io'
const ZERODB_PROJECT_ID = process.env.NEXT_PUBLIC_ZERODB_PROJECT_ID || ''
const ZERODB_API_KEY = process.env.NEXT_PUBLIC_ZERODB_API_KEY || ''

export interface ZeroDBTableRow {
  [key: string]: any
}

export interface ZeroDBInsertResponse {
  success: boolean
  row_ids?: string[]
  error?: string
}

export interface ZeroDBQueryResponse<T = ZeroDBTableRow> {
  success: boolean
  rows?: T[]
  total?: number
  error?: string
}

export class ZeroDBClient {
  private baseUrl: string
  private projectId: string
  private apiKey: string

  constructor() {
    this.baseUrl = ZERODB_API_BASE
    this.projectId = ZERODB_PROJECT_ID
    this.apiKey = ZERODB_API_KEY
  }

  private getHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    }
  }

  async insertRows<T extends ZeroDBTableRow>(
    tableName: string,
    rows: T[]
  ): Promise<ZeroDBInsertResponse> {
    try {
      validateAPIKey(this.apiKey)

      if (!rows || rows.length === 0) {
        throw new APIValidationError('At least one row is required')
      }

      for (const row of rows) {
        validateTableRowData(row)
      }

      const url = `${this.baseUrl}/${this.projectId}/database/tables/${tableName}/rows`

      const response = await fetch(url, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ rows })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('ZeroDB insert error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  async queryRows<T extends ZeroDBTableRow>(
    tableName: string,
    options?: {
      filter?: Record<string, any>
      limit?: number
      offset?: number
      sort?: Record<string, 1 | -1>
    }
  ): Promise<ZeroDBQueryResponse<T>> {
    const url = `${this.baseUrl}/${this.projectId}/database/tables/${tableName}/rows`
    const params = new URLSearchParams()

    if (options?.limit) params.append('limit', options.limit.toString())
    if (options?.offset) params.append('offset', options.offset.toString())
    if (options?.filter) params.append('filter', JSON.stringify(options.filter))
    if (options?.sort) params.append('sort', JSON.stringify(options.sort))

    const fullUrl = params.toString() ? `${url}?${params.toString()}` : url

    try {
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: this.getHeaders()
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('ZeroDB query error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  async embedAndStore(request: EmbedAndStoreRequest): Promise<EmbedAndStoreResponse> {
    try {
      validateAPIKey(this.apiKey)

      const model = request.model || 'BAAI/bge-small-en-v1.5'
      validateEmbeddingModel(model)
      validateNamespace(request.namespace)

      if (!request.documents || request.documents.length === 0) {
        throw new APIValidationError('At least one document is required')
      }

      for (const doc of request.documents) {
        if (!doc.id || !doc.text) {
          throw new APIValidationError('Each document must have id and text fields')
        }
      }

      const url = `${this.baseUrl}/${this.projectId}/embeddings/embed-and-store`

      const payload = {
        documents: request.documents,
        namespace: request.namespace,
        model
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('ZeroDB embed-and-store error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  async search(request: SearchRequest): Promise<SearchResponse> {
    try {
      validateAPIKey(this.apiKey)
      validateNamespace(request.namespace)

      if (!request.query || request.query.trim().length === 0) {
        throw new APIValidationError('Search query is required')
      }

      if (request.limit && request.limit <= 0) {
        throw new APIValidationError('Limit must be greater than 0')
      }

      if (request.similarity_threshold && (request.similarity_threshold < 0 || request.similarity_threshold > 1)) {
        throw new APIValidationError('Similarity threshold must be between 0 and 1')
      }

      const url = `${this.baseUrl}/${this.projectId}/embeddings/search`

      const payload = {
        query: request.query,
        namespace: request.namespace,
        limit: request.limit || 10,
        similarity_threshold: request.similarity_threshold || 0.7,
        filter: request.filter
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('ZeroDB search error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }
}

export interface EmbeddingDocument {
  id: string
  text: string
  metadata?: Record<string, any>
}

export interface EmbedAndStoreRequest {
  documents: EmbeddingDocument[]
  namespace: string
  model?: string
}

export interface EmbedAndStoreResponse {
  success: boolean
  embedding_ids?: string[]
  error?: string
}

export interface SearchRequest {
  query: string
  namespace: string
  limit?: number
  similarity_threshold?: number
  filter?: Record<string, any>
}

export interface SearchResult {
  id: string
  text: string
  metadata: Record<string, any>
  score: number
}

export interface SearchResponse {
  success: boolean
  results?: SearchResult[]
  error?: string
}

export const zeroDBClient = new ZeroDBClient()
