# ZeroDB Query Tool

Retrieve data from ZeroDB tables with filtering.

## Tool

`mcp__ainative-zerodb__zerodb_query_rows`

## Use Cases

- Get table data with filters
- Sort and paginate results
- Select specific fields

## Required Parameters

- **table_id**: Table name or identifier

## Optional Parameters

- **filter** (optional): MongoDB-style query conditions
- **limit** (optional): Result cap (default: 100)
- **offset** (optional): Pagination start (default: 0)
- **sort** (optional): Order results
- **projection** (optional): Field selection

## Example

Query table with filters and sorting.
