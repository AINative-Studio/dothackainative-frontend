# ZeroDB Agent Context Window

Retrieve agent context for the current session.

## Tool

`mcp__ainative-zerodb__zerodb_get_context`

## Use Cases

- Get conversation history
- Load session context
- Manage token limits

## Required Parameters

- **session_id**: The session identifier

## Optional Parameters

- **agent_id** (optional): The agent identifier
- **max_tokens** (optional): Maximum context window size

## Example

Ask for the session ID, then retrieve the context window.
