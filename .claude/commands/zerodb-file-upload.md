# ZeroDB File Upload

Upload files to ZeroDB cloud storage.

## Tool

`mcp__ainative-zerodb__zerodb_upload_file`

## Use Cases

- Store documents and images
- Organize files in folders
- Attach metadata to files

## Required Parameters

- **file_name**: The file identifier
- **file_content**: Base64-encoded file data

## Optional Parameters

- **content_type** (optional): MIME type (default: "application/octet-stream")
- **folder** (optional): Virtual folder path
- **metadata** (optional): Additional file metadata (object)

## Example

Ask which file to upload, then use the tool to store it.
