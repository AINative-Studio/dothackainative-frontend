# AINative Studio Core - Project Memory for AI Assistants

## Overview

This document serves as comprehensive project documentation for the AINative Studio backend infrastructure. The project uses Python 3.11, FastAPI, PostgreSQL, Redis, and Celery, deployed via Railway with Docker Compose for development.

## Critical Rules

**Git Commit Policy**: The project enforces strict rules prohibiting any AI tool attribution in commits, pull requests, or GitHub activity. An automated hook at `.git/hooks/commit-msg` blocks commits containing references to Claude, Anthropic, or similar AI attribution language.

**Testing Requirements**: There's a zero-tolerance policy requiring actual test execution before commits. The documentation emphasizes that claims of passing tests must include actual pytest/npm output demonstrating successful execution and coverage metrics above 80%.

**File Placement Standards**: Documentation must follow specific directory structures outlined in `.claude/CRITICAL_FILE_PLACEMENT_RULES.md`, with markdown files organized by category rather than in the project root.

## Architecture

The API follows RESTful patterns with public endpoints under `/v1/*`, admin-only routes under `/admin/*`, and webhooks at `/webhooks/*`. Authentication uses JWT tokens and organization-scoped API keys with role-based access control.

**Database Infrastructure**: PostgreSQL serves as the primary database, Redis handles caching and rate limiting, and Alembic manages version-controlled migrations.

## Recent Implementations

Recent work includes a multi-provider email service supporting Resend, SMTP, SendGrid, and SES; a notification system with Slack, PagerDuty, and webhook integration; and Kong billing metrics collection for credit deduction.

## Package Publishing

**Python SDK** (`zerodb-mcp` on PyPI): Version 1.0.1 ready for publishing using credentials stored in `~/.pypirc`. Publishing is permanent and cannot be undone.

**TypeScript SDK** (`@zerodb/mcp-client` on NPM): Not yet configured for publishing; requires NPM authentication setup.

## Key Resource Locations

Production API: https://api.ainative.studio | Railway Dashboard: https://railway.app | PyPI: https://pypi.org/project/zerodb-mcp/
