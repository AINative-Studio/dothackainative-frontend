# SDK Publishing Guidelines - Complete File Contents

## Document Overview

This comprehensive guide establishes procedures for releasing Python and TypeScript SDKs to package registries, with an emphasis on preventing irreversible mistakes.

## Key Sections

**Critical Pre-Publishing Requirements:**
The document emphasizes that "Publishing is PERMANENT on PyPI - you cannot delete packages!" and mandates completion of a 10-item checklist before any release, including passing all 51 tests, version updates across all files, and clean Git status.

**Python SDK Process (PyPI):**
The workflow spans six steps: pre-flight testing in a fresh virtual environment, version verification across `setup.py` and `__init__.py`, building distribution packages using the `build` module, optional Test PyPI validation, production upload via `twine`, and post-publishing Git tagging.

**TypeScript SDK Process (NPM):**
Similar structure with steps for testing, building TypeScript, version bumping via `npm version`, dry-run validation, and public registry publishing with the `--access public` flag for scoped packages.

**Version Standards:**
The guide mandates Semantic Versioning format (MAJOR.MINOR.PATCH), where patch versions address bugs, minor versions add backward-compatible features, and major versions indicate breaking changes.

**Rollback Protocols:**
PyPI packages cannot be deleted; the document recommends yanking releases or publishing hotfixes. NPM permits unpublishing within 72 hours but deprecation is preferred.

**Security Checklist:**
Pre-publication scanning requirements include verifying absence of hardcoded credentials, checking `.gitignore` configurations, and scanning repositories for sensitive data patterns.

The document stresses repetitively that thorough testing precedes publishing, as registry submissions are irreversible actions.
