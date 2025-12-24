# ZeroDB Row Updates

Update existing table records.

## Tool

`mcp__ainative-zerodb__zerodb_update_rows`

## Use Cases

- Modify records with filters
- Use MongoDB update operators ($set, $inc)
- Perform upsert operations

## Required Parameters

- **table_id**: Table name or identifier
- **filter**: MongoDB-style query
- **update**: Modification operations

## Optional Parameters

- **upsert** (optional): Create if not found (default: false)

## Example

Ask what changes to make, then update rows.
