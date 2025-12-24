# ZeroDB PostgreSQL Query Logs

Access detailed query logs for your PostgreSQL instance.

## Tool

`zerodb_get_postgres_logs`

## Required Parameters

- **project_id**: Your ZeroDB project ID

## Optional Parameters

- **limit** (optional): Number of entries (default: 100)
- **query_type** (optional): Filter by SELECT, INSERT, UPDATE, DELETE

## Data Retrieved

For each query:
- SQL query text
- Execution time (milliseconds)
- Complexity score
- Credits consumed
- Rows affected
- Timestamp (ISO 8601)
- Query type
- Client/connection information

## Use Cases

- Find slow queries
- Troubleshoot errors
- Monitor usage patterns
- Audit database access
- Track resource consumption

## Example

Query logs to identify performance bottlenecks.
