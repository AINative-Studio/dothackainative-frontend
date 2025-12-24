# ZeroDB Event Stream Query

Query events from a ZeroDB event stream with filtering options.

## Tool

`mcp__ainative-zerodb__zerodb_list_events`

## Use Cases

- View event history
- Filter by type or source
- Query time ranges
- Monitor workflows

## Parameters

- **event_type** (optional): Filter by event category
- **source** (optional): Filter by origin
- **start_time** (optional): ISO timestamp
- **end_time** (optional): ISO timestamp
- **limit** (optional): Results to return (default: 100)
- **offset** (optional): Pagination offset (default: 0)

## Example

Query events with filters to view the event stream.
