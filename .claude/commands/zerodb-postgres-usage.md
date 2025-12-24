# ZeroDB PostgreSQL Usage and Billing

View comprehensive usage metrics and billing information.

## Tool

`zerodb_get_postgres_usage`

## Required Parameters

- **project_id**: Your ZeroDB project ID

## Optional Parameters

- **hours** (optional): Time window in hours (default: 24)

## Metrics Returned

- Total queries executed
- Credits consumed
- Average query duration (ms)
- Query breakdown (SELECT, INSERT, UPDATE, DELETE)
- Connection usage
- Storage consumption (GB)
- Estimated monthly cost

## Billing Model

Charges based on:
- Query complexity
- Execution time
- Storage used

Billed monthly based on actual usage.

## Example

```json
{
  "project_id": "your-project-id",
  "hours": 24
}
```
