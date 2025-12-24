# Critical File Placement Rules Summary

This document establishes mandatory guidelines for file organization in the AINative project. Violations undermine project structure and waste developer time.

## Key Prohibitions

**Markdown files** cannot be created in root directories like `/core/src/backend/` or `/core/`. All documentation must use the `/docs/{category}/` structure instead.

**Shell scripts** are forbidden in the backend directory except for `start.sh`. Scripts belong in `/scripts/`.

## Base URL Standards

The critical instruction states: "Base URL is domain only" such as `https://api.ainative.studio`, with full API paths explicitly included when constructing endpoints like `/api/v1/projects/`.

This approach ensures clarity about URL construction and prevents confusion during implementation.

## Documentation Categories

Backend files follow a routing system where issue documents go to `docs/issues/`, API documentation to `docs/api/`, testing files to `docs/testing/`, and implementation reports to `docs/reports/`.

Frontend documentation mirrors this structure under `AINative-website/docs/`.

## Enforcement Approach

Before creating any file, developers must verify the correct destination, determine appropriate categorization, and confirm the file won't occupy a root directory. The guidelines emphasize this represents a requirement rather than guidance, with violations carrying consequences including project clutter and reduced team productivity.

The document timestamp indicates these standards became effective December 9, 2025.
