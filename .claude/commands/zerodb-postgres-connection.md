# ZeroDB PostgreSQL Connection Details

Get connection credentials for your dedicated PostgreSQL instance.

## Tool

`zerodb_get_postgres_connection`

## Required Parameters

- **project_id**: Your ZeroDB project ID

## Optional Parameters

- **credential_type** (optional): "primary", "readonly", or "admin" (default: "primary")

## Returns

- Full connection string
- Host, port, database name
- Username and password
- Credential type

## Connection Methods

Use with any PostgreSQL client:
- Command-line: `psql`
- Python: `psycopg2`, `SQLAlchemy`
- Node.js: `pg`, `Sequelize`, `Prisma`
- Any PostgreSQL-compatible ORM

## Example

Connect via URL:
```bash
psql "postgresql://user:pass@host:port/dbname"
```

Or use individual parameters with your database client.
