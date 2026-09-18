# Changelog

## [Unreleased]

### Migrated to TypeScript (2026-09-18)
- Ported the UI grounding engine, action planner, GPU benchmarker, Nebius/NVIDIA
  inference client, and server from JavaScript to **TypeScript** (strict).

### Fixed
- **Live inference never worked**: `planRpaSequence` called `parseModelOutput`,
  which was never defined — every live call threw and fell back to the simulator.
  Implemented a real OpenAI-compatible response parser that extracts a JSON action
  array from the chat completion (with graceful fallback).

### Added
- `createTensorMeshServer()` factory (testable) + server integration suite (8 assertions).
- Security: path-traversal guard (403), 64 KB request-body cap (413), input validation.
- Graceful shutdown, CI (Node 18/20/22), multi-stage Dockerfile, `engines.node >= 18`.

### Notes
- The client targets the OpenAI-compatible Nebius Token Factory / NVIDIA NIM endpoints
  and runs live when NEBIUS_API_KEY / NVIDIA_API_KEY are set; otherwise a deterministic
  accelerated simulator runs. GPU benchmark figures are representative reference numbers,
  not a live measurement. See SPECIFICATION.md.
