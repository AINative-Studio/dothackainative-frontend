# ZeroDB Presigned URL Generation

Create temporary access URLs for files.

## Tool

`mcp__ainative-zerodb__zerodb_generate_presigned_url`

## Use Cases

- Share files with temporary links
- Enable direct browser access
- Provide upload capabilities

## Required Parameters

- **file_id**: The file identifier

## Optional Parameters

- **operation** (optional): "download" or "upload" (default: "download")
- **expiration_seconds** (optional): URL validity duration (default: 3600)

## Example

Ask which file needs a URL, then generate it.
