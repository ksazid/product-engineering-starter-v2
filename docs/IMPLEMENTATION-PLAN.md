# PES v2 Implementation Plan

## VS-01 — Foundation ✅

Core types, graph invariants, complexity budget, bounded context builder, ratchet decision, tests and CI.

## VS-02 — Ratchet Engine ✅

Durable attempt records, evaluator contracts, versioned artifacts, reversible workspace adapters, keep/revert semantics, interruption recovery and failed lineage.

## VS-03 — Graph Memory ✅

Append-oriented graph writes, write provenance, optimistic revisions, atomic persistence, immutable correction/supersession, lineage reconstruction, accepted-artifact explanation and Ratchet publication.

## VS-04 — Context Builder ✅

Relevance ranking, recency, verified-state preference, contradiction inclusion, token-aware serialization, supersession resolution and context hashing.

## VS-05 — PES Gate Integration ✅

Graph-aware typed approvals, lifecycle transitions, implementation permissions, risk controls, protected paths, linked evidence, context freshness and delivery-graph triggers.

## VS-06 — Certification

**Implemented in this slice:** exact-SHA certification candidates, self-contained context/gate snapshots, graph-linked artifact/evidence/evaluation traces, risk-sensitive evidence floors, human hash-bound certification approval, immutable certification hashes and append-only storage.

**Exit:** a certified SHA has a machine-verifiable trace from objective to linked evidence and human approval, remains verifiable after later append-only graph revisions and exact-head preflight passes.

## VS-07 — Measured Multi-Agent Execution

Add optional planner/specialist/reviewer execution only for independent work with isolation and a declared reducer.

**Exit:** benchmarks show quality, coverage or wall-clock benefit over the single-worker baseline within cost budgets.
