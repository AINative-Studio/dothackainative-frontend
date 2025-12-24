# ZeroDB Vector Upsert

Store vector embeddings with metadata.

## Tool

`mcp__ainative-zerodb__zerodb_upsert_vector`

## Use Cases

- Store embeddings from chunked text
- Index document vectors with metadata
- Update existing vectors by ID

## Required Parameters

- **vector_embedding**: Array of 1536 numbers
- **document**: The source text or content

## Optional Parameters

- **metadata** (optional): Additional information (object)
- **namespace** (optional): Category grouping (default: "default")
- **vector_id** (optional): ID for updates

## Example

Ask what to store, then save the vector with metadata.
