# ZeroDB Vector Search

Find semantically similar vectors.

## Tool

`mcp__ainative-zerodb__zerodb_search_vectors`

## Use Cases

- Semantic search across embedded content
- Find similar documents or text chunks
- RAG retrieval

## Required Parameters

- **query_vector**: Array of 1536 numbers

## Optional Parameters

- **limit** (optional): Results to return (default: 10)
- **threshold** (optional): Similarity threshold 0-1 (default: 0.7)
- **namespace** (optional): Restrict to namespace
- **filter_metadata** (optional): Metadata filters (object)

## Example

Ask for search requirements, then query vectors.
