# RLHF Feedback Collection

Collect user feedback to improve agent performance.

## Tool

`mcp__ainative-zerodb__zerodb_rlhf_agent_feedback`

## Feedback Types

1. **Binary feedback**: thumbs up/down
2. **Numeric ratings**: 1-5 scale
3. **Qualitative comments**: text feedback

## Required Parameters

- **agent_id**: Agent identifier
- **feedback_type**: "thumbs_up", "thumbs_down", or "rating"

## Optional Parameters

- **rating** (optional): 1-5 for rating-type feedback
- **comment** (optional): Text explanation
- **metadata** (optional): Contextual information (object)

## Example

Collect user feedback for model training.
