# ZeroDB PostgreSQL Provisioning

Create dedicated PostgreSQL instances with flexible pricing tiers.

## Tool

`zerodb_provision_postgres`

## Instance Tiers

- **micro-1**: $5/month - 0.25 CPU, 0.25GB RAM, 1GB storage
- **small-2**: $15/month - 0.5 CPU, 0.5GB RAM, 10GB storage
- **medium-4**: $30/month - 1 CPU, 1GB RAM, 25GB storage
- **large-8**: $60/month - 2 CPU, 2GB RAM, 50GB storage
- **performance-16**: $100/month - 4 CPU, 4GB RAM, 100GB storage

## Required Parameters

- **project_id**: Your ZeroDB project ID
- **instance_tier**: One of the tiers above

## Optional Parameters

- **postgres_version** (optional): 13, 14, or 15 (default: 15)
- **tags** (optional): Organization tags (object)

## Provisioning Time

Typically takes 2-3 minutes. Check status with `/zerodb-postgres-status`.

## Example

Provision a small instance for development:
```
instance_tier: "small-2"
postgres_version: "15"
```
