# ZeroDB Memory Search

Search agent memory using semantic similarity.

## Tool

`mcp__ainative-zerodb__zerodb_search_memory`

## Use Cases

- Find relevant past conversations
- Pull context from previous sessions
- Search across agent conversations

## Required Parameters

- **query**: The search term

## Optional Parameters

- **limit** (optional): Results to return (default: 10)
- **session_id** (optional): Filter by session
- **agent_id** (optional): Filter by agent
- **role** (optional): Filter by role (user/assistant/system)

## Example

Ask what to search for, then query the memory system.
