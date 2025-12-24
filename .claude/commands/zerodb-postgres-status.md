# ZeroDB PostgreSQL Status

Check the operational status of your PostgreSQL instance.

## Tool

`zerodb_get_postgres_status`

## Required Parameters

- **project_id**: Your ZeroDB project ID

## Information Returned

### Instance Status
- **provisioning**: Being created (2-3 minutes)
- **active**: Running and accepting connections
- **maintenance**: Scheduled maintenance in progress
- **error**: Problem occurred (see error_message)

### Performance Metrics
- CPU usage
- Memory usage
- Storage usage
- Active connections

### Financial Data
- Billing period
- Monthly cost
- Instance tier

### System Health
- Health check status
- Last check timestamp

## Example

Monitor instance health and resource utilization.
