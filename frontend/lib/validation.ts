export class APIValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'APIValidationError'
  }
}

export function validateUUID(value: string, fieldName: string = 'UUID'): void {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (!uuidRegex.test(value)) {
    throw new APIValidationError(`Invalid ${fieldName}: must be a valid UUID`)
  }
}

export function validateRequired(value: any, fieldName: string): void {
  if (value === undefined || value === null || value === '') {
    throw new APIValidationError(`${fieldName} is required`)
  }
}

export function validateEmail(email: string): void {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw new APIValidationError('Invalid email format')
  }
}

export function validateURL(url: string, fieldName: string = 'URL'): void {
  try {
    new URL(url)
  } catch {
    throw new APIValidationError(`Invalid ${fieldName}: must be a valid URL`)
  }
}

export function validateEmbeddingDimensions(dimensions: number): void {
  const REQUIRED_DIMENSIONS = 384
  if (dimensions !== REQUIRED_DIMENSIONS) {
    throw new APIValidationError(
      `Invalid embedding dimensions: must be ${REQUIRED_DIMENSIONS}, got ${dimensions}`
    )
  }
}

export function validateEmbeddingModel(model: string): void {
  const REQUIRED_MODEL = 'BAAI/bge-small-en-v1.5'
  if (model !== REQUIRED_MODEL) {
    throw new APIValidationError(
      `Invalid embedding model: must be ${REQUIRED_MODEL}, got ${model}`
    )
  }
}

export function validateNamespace(namespace: string): void {
  const namespaceRegex = /^hackathons\/[0-9a-f-]{36}\/submissions$/i
  if (!namespaceRegex.test(namespace)) {
    throw new APIValidationError(
      `Invalid namespace format: must be 'hackathons/{uuid}/submissions'`
    )
  }
}

export function validateDocumentId(id: string, prefix: string): void {
  const expectedPattern = `${prefix}:[0-9a-f-]{36}`
  const regex = new RegExp(`^${expectedPattern}$`, 'i')
  if (!regex.test(id)) {
    throw new APIValidationError(
      `Invalid document ID format: must be '${prefix}:{uuid}'`
    )
  }
}

export function validateTableRowData(data: any): void {
  if (!data || typeof data !== 'object') {
    throw new APIValidationError('Table row data must be an object')
  }

  if (Array.isArray(data)) {
    throw new APIValidationError('Table row data must be a single object, not an array')
  }
}

export function validateAPIKey(apiKey: string | undefined): void {
  if (!apiKey || apiKey.trim().length === 0) {
    throw new APIValidationError('API key is required')
  }
}

export function validateContentType(headers: HeadersInit): void {
  const headersObj = headers instanceof Headers ? Object.fromEntries(headers.entries()) : headers as Record<string, string>
  const contentType = headersObj['Content-Type'] || headersObj['content-type']

  if (contentType !== 'application/json') {
    throw new APIValidationError('Content-Type must be application/json')
  }
}

export interface TableSchemaField {
  name: string
  type: 'string' | 'number' | 'boolean' | 'uuid' | 'email' | 'url' | 'timestamp'
  required: boolean
}

export function validateTableSchema(data: any, schema: TableSchemaField[]): void {
  for (const field of schema) {
    const value = data[field.name]

    if (field.required) {
      validateRequired(value, field.name)
    }

    if (value !== undefined && value !== null) {
      switch (field.type) {
        case 'string':
          if (typeof value !== 'string') {
            throw new APIValidationError(`${field.name} must be a string`)
          }
          break
        case 'number':
          if (typeof value !== 'number') {
            throw new APIValidationError(`${field.name} must be a number`)
          }
          break
        case 'boolean':
          if (typeof value !== 'boolean') {
            throw new APIValidationError(`${field.name} must be a boolean`)
          }
          break
        case 'uuid':
          if (typeof value !== 'string') {
            throw new APIValidationError(`${field.name} must be a string (UUID)`)
          }
          validateUUID(value, field.name)
          break
        case 'email':
          if (typeof value !== 'string') {
            throw new APIValidationError(`${field.name} must be a string (email)`)
          }
          validateEmail(value)
          break
        case 'url':
          if (typeof value !== 'string') {
            throw new APIValidationError(`${field.name} must be a string (URL)`)
          }
          validateURL(value, field.name)
          break
        case 'timestamp':
          if (typeof value !== 'string') {
            throw new APIValidationError(`${field.name} must be a string (ISO timestamp)`)
          }
          const timestamp = new Date(value)
          if (isNaN(timestamp.getTime())) {
            throw new APIValidationError(`${field.name} must be a valid ISO timestamp`)
          }
          break
      }
    }
  }
}
