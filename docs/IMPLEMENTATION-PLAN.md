# PES v2 Implementation Plan

## VS-01 — Foundation ✅

Core types, graph invariants, complexity budget, bounded context builder, ratchet decision, tests and CI.

## VS-02 — Ratchet Engine ✅

Durable attempt records, evaluator contracts, versioned artifacts, reversible workspace adapters, keep/revert semantics, interruption recovery and failed lineage.

## VS-03 — Graph Memory

**Implemented in this slice:** append-oriented graph writes, write provenance, optimistic revisions, atomic persistence, immutable correction/supersession, lineage reconstruction, accepted-artifact explanation and Ratchet publication.

**Exit:** cross-session queries reconstruct why an accepted artifact exists and which failed attempts preceded it; exact-head preflight passes.

## VS-04 — Context Builder

Add relevance ranking, recency, verified-state preference, contradiction inclusion, token-aware serialization and context hashing.

**Exit:** workers receive sufficient relevant state within declared context budgets and unchanged context can be detected.

## VS-05 — PES Gate Integration

Connect graph evidence to typed approvals, lifecycle transitions, risk controls, protected paths and delivery-graph triggers.

**Exit:** governance blocks unsafe transitions using both canonical delivery state and linked evidence.

## VS-06 — Certification

Create exact-SHA certification bundles linking objective, approved scope, artifacts, test/security evidence, evaluations and unresolved risk.

**Exit:** a certified SHA has a machine-verifiable trace from objective to evidence and approval.

## VS-07 — Measured Multi-Agent Execution

Add optional planner/specialist/reviewer execution only for independent work with isolation and a declared reducer.

**Exit:** benchmarks show quality, coverage or wall-clock benefit over the single-worker baseline within cost budgets.
