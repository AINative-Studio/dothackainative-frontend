# ZeroDB File Download

Retrieve file contents from ZeroDB storage.

## Tool

`mcp__ainative-zerodb__zerodb_download_file`

## Use Cases

- Retrieve stored files
- Get base64-encoded content
- Access file metadata

## Required Parameters

- **file_id**: The file identifier

## Optional Parameters

- **as_base64** (optional): Return base64-encoded content (default: true)

## Example

Ask the user which file to download, then fetch it using the file ID.
