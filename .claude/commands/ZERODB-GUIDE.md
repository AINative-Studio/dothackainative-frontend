# ZeroDB MCP Server Guide

## Overview

ZeroDB is a comprehensive cloud database platform offering vector storage, NoSQL databases, dedicated PostgreSQL, file storage, agent memory, event streaming, quantum operations, and RLHF systems.

## Key Features

- **Vector Storage**: Store and search high-dimensional embeddings (1536 dimensions)
- **NoSQL Tables**: Flexible document storage with MongoDB-style querying
- **PostgreSQL**: Managed PostgreSQL instances with direct SQL access
- **File Storage**: Upload, download, and share files with presigned URLs
- **Memory System**: Store and retrieve agent conversation context
- **Event Streaming**: Publish and monitor events for workflow automation
- **Quantum Operations**: Hybrid quantum-classical vector search
- **RLHF**: Collect user feedback for agent improvement

## Available Commands

### Vector Operations
- `/zerodb-vector-upsert` - Store embeddings with metadata
- `/zerodb-vector-search` - Semantic search across vectors
- `/zerodb-vector-list` - Browse stored vectors
- `/zerodb-vector-stats` - Get vector storage statistics

### NoSQL Tables
- `/zerodb-table-create` - Create table with schema
- `/zerodb-table-insert` - Insert records
- `/zerodb-table-query` - Query with filters
- `/zerodb-table-update` - Update existing data
- `/zerodb-table-list` - List all tables

### File Storage
- `/zerodb-file-upload` - Upload files to cloud
- `/zerodb-file-list` - Browse stored files
- `/zerodb-file-download` - Retrieve file content
- `/zerodb-file-url` - Generate presigned URLs

### Memory System
- `/zerodb-memory-store` - Store conversation context
- `/zerodb-memory-search` - Search past conversations
- `/zerodb-memory-context` - Get session context window

### Event Streaming
- `/zerodb-event-create` - Publish events
- `/zerodb-event-list` - Query event history

### PostgreSQL Management
- `/zerodb-postgres-provision` - Create managed instances
- `/zerodb-postgres-status` - Check instance status
- `/zerodb-postgres-connection` - Get connection details
- `/zerodb-postgres-usage` - View usage metrics
- `/zerodb-postgres-logs` - Query execution logs

### Other
- `/zerodb-project-info` - View project details
- `/zerodb-project-stats` - Get usage statistics
- `/zerodb-quantum-search` - Quantum-enhanced search
- `/zerodb-rlhf-feedback` - Collect user feedback

## Authentication

Set environment variables:
- `ZERODB_PROJECT_ID`
- `ZERODB_API_KEY`

## Common Workflows

1. **Semantic Search with RAG**: Upload documents → Generate embeddings → Store vectors → Search on queries
2. **Document Management**: Upload files → List files → Generate download URLs
3. **Data Storage**: Create tables → Insert data → Query with filters
4. **Agent Memory**: Store conversations → Search context → Retrieve history
5. **Event-Driven Architecture**: Publish events → Monitor streams → Trigger workflows
6. **PostgreSQL**: Provision instance → Get connection → Execute SQL queries
