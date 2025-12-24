# ZeroDB Insert Rows

Insert records into a ZeroDB table.

## Tool

`mcp__ainative-zerodb__zerodb_insert_rows`

## Use Cases

- Add new records
- Bulk insert multiple rows
- Get inserted row IDs

## Required Parameters

- **table_id**: Table name or identifier
- **rows**: Array of row objects

## Optional Parameters

- **return_ids** (optional): Return IDs of inserted rows (default: true)

## Example

Ask what data to insert, then add it to the table.
