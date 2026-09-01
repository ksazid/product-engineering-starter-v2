# Product Engineering Starter v2 (PES v2)

PES v2 is a **graph-aware product engineering governance system**. It preserves PES governance—typed approvals, vertical slices, deterministic gates, exact-SHA certification, rollback and human release authority—while making execution, evidence lineage and durable product memory first-class.

## Core model

```text
Governance
   ↓
Ranked Bounded Context → Plan → Execute → Evaluate → Keep / Revise / Revert
          ↑                                      ↓
          └──────── Product Graph Memory ← Artifacts / Evidence / Lineage
                                                 ↓
                                          PES Certification
                                                 ↓
                                           Human Approval
```

PES v2 does **not** make graph databases or multi-agent swarms mandatory. The default remains the cheapest architecture that can safely satisfy the task.

## What changes from PES v1

- Loop Engineering is absorbed as native **Ratchet Execution**.
- Decisions, artifacts, evidence, evaluations and agent runs become durable graph-addressable state.
- Graph writes are append-oriented and provenance-bearing rather than silent in-place rewrites.
- Corrections create immutable supersession chains.
- Context is ranked from bounded relevant state instead of replaying whole histories.
- Verified/recent state is preferred while material contradictions remain visible.
- Superseded seeds resolve to current state before retrieval.
- Context packs are token-bounded and content-hashed so unchanged work can be detected.
- Failed attempts remain useful lineage.
- Cost, token, concurrency, retry, wall-clock and graph-write budgets are explicit.
- Multi-agent execution remains risk-triggered and optional.
- Human authority over scope, policy, certification, release and production enablement is unchanged.

## Five planes

1. **Control** — objectives, scope, permissions, plans, budgets and stop rules.
2. **Execution** — tools, code changes, tests and isolated workers.
3. **Artifact** — immutable/versioned plans, diffs, screenshots, reports and metrics.
4. **Graph** — decisions, claims, evidence, relations, task dependencies and lineage.
5. **Evaluation** — deterministic checks, rubrics, specialist review and human gates.

## Quick start

Requires Node.js 24+.

```bash
npm test
npm run preflight
npm run pes:validate
npm run graph:validate
```

Build ranked bounded context:

```bash
npm run context:build -- OBJ-004
```

Check whether context changed from a prior pack:

```bash
npm run context:build -- OBJ-004 --prior-hash <sha256>
```

Inspect durable graph memory:

```bash
npm run graph:memory -- current OBJ-003
npm run graph:memory -- lineage OBJ-003
npm run graph:memory -- provenance OBJ-003
```

Publish a finalized Ratchet attempt:

```bash
npm run graph:memory -- publish-attempt RUN-1 ATT-2
```

## Current implementation status

- **VS-01 Foundation** ✅ — core domain model, budgets, graph invariants and CI.
- **VS-02 Ratchet Engine** ✅ — durable attempts, evaluator contracts, artifact versions, reversible execution and recovery.
- **VS-03 Graph Memory** ✅ — append-oriented state, provenance, correction/supersession, cross-session lineage queries and Ratchet publication.
- **VS-04 Context Builder** — relevance ranking, recency, verified-state preference, contradiction inclusion, token-aware serialization and context hashing.
- **VS-05+** — PES gate integration, certification bundles and measured multi-agent execution.

See `docs/PES-V2-DESIGN.md`, `docs/VS-02-RATCHET-ENGINE.md`, `docs/VS-03-GRAPH-MEMORY.md`, `docs/VS-04-CONTEXT-BUILDER.md` and `docs/MIGRATION-FROM-V1.md`.
