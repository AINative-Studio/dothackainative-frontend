# GitHub Issue Tracking Enforcement Rules - Complete Content

## Overview
This document establishes mandatory issue tracking protocols for all AI agent actions on AINative codebases.

## Key Requirements

**Core Mandate:** "No Code Without An Issue. No PR Without A Link. No Merge Without Tracking."

### What Requires Issues
- Bug fixes (including error handling and security vulnerabilities)
- New features (APIs, UI components, integrations)
- Testing work (test suites, coverage improvements)
- Refactoring and architecture changes
- Documentation updates
- DevOps and infrastructure modifications

### What Doesn't Require Issues
- Comment typo corrections
- Whitespace formatting changes
- Local development setup (uncommitted work)

## Pre-Work Checklist

Before any code work, agents must:
1. Search for existing related issues
2. Create a new issue if none exists
3. Add required labels (type, priority, status, component, effort)
4. Assign to self
5. Create appropriately named branch

## Issue Structure Requirements

**Title Format:** `[TYPE] Brief description (max 60 characters)`

**Types:** BUG, FEATURE, TEST, REFACTOR, DOCS, DEVOPS, SECURITY, PERFORMANCE

**Required Elements:**
- Problem context and proposed solution
- Files affected and dependencies
- Testing plan with acceptance criteria
- Story point estimation with rationale
- All relevant labels applied

## Workflow Process

1. Create and configure issue
2. Create feature branch referencing issue number
3. Commit with issue references ("Refs #123" or "Closes #123")
4. Open PR linking the issue
5. Update issue with progress throughout work
6. Ensure automatic closure when PR merges

## Enforcement
This represents a "zero tolerance policy" with immediate implementation. Violations require halting work, retroactive issue creation, and commit amendment.
