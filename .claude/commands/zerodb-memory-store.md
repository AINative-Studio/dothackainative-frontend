# ZeroDB Memory Storage

Store conversation context for persistent agent memory.

## Tool

`mcp__ainative-zerodb__zerodb_store_memory`

## Use Cases

- Persist agent conversation history
- Store user interactions for learning
- Build long-term memory systems

## Required Parameters

- **content**: The information to store
- **role**: Message role ("user", "assistant", or "system")

## Optional Parameters

- **session_id** (optional): Auto-generated if not provided
- **agent_id** (optional): Auto-generated if not provided
- **metadata** (optional): Additional context (object)

## Example

Ask what to store, then use the tool to persist it.
