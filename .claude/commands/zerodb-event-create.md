# ZeroDB Event Stream Creation

Create and publish events to a ZeroDB event stream for workflow automation and monitoring.

## Tool

`mcp__ainative-zerodb__zerodb_create_event`

## Use Cases

- Record application events
- Trigger workflows
- Monitor user interactions
- Send notifications

## Required Parameters

- **event_type**: The category/type of event
- **event_data**: The event payload (object)

## Optional Parameters

- **source**: Where the event originated
- **correlation_id**: Track related events across systems

## Example

Ask the user which event they want to create, then invoke the tool to publish it.
