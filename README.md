# Product Engineering Starter v2 (PES v2)

PES v2 is a **graph-aware product engineering governance system**. It keeps the strongest parts of PES v1—typed approvals, vertical slices, deterministic gates, exact-SHA certification, rollback and human release authority—and makes the execution loop, evidence lineage and persistent product memory first-class.

## Core model

```text
Governance
   ↓
Bounded Context → Plan → Execute → Evaluate → Keep / Revise / Revert
      ↑                                      ↓
      └──────── Product Graph Memory ← Artifacts / Evidence / Lineage
                                             ↓
                                      PES Certification
                                             ↓
                                       Human Approval
```

PES v2 does **not** make graphs or multi-agent swarms mandatory. The default is the cheapest architecture that can safely satisfy the task.

## What changes from PES v1

- Loop Engineering becomes the native **Ratchet Execution** mechanism instead of a separate top-level concept.
- Product decisions, artifacts, evidence, evaluations and agent runs become durable graph-addressable state.
- Context is built from a bounded relevant subgraph instead of replaying whole histories.
- Failed attempts remain useful lineage and are not silently forgotten.
- Cost, token, concurrency, retry and wall-clock budgets are explicit run contracts.
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
```

Build bounded context around one or more graph node IDs:

```bash
npm run context:build -- OBJ-002
```

Run a deterministic ratchet fixture:

```bash
npm run ratchet:fixture
```

Evaluate one metric directly:

```bash
npm run ratchet:evaluate -- 0.72 0.78 higher
```

## Current implementation status

- **VS-01 Foundation — complete:** domain model, graph invariants, budgets, context builder and CI.
- **VS-02 Ratchet Engine — implemented:** durable attempt records, evaluator contracts, versioned artifacts, keep/revert semantics, interruption recovery, atomic run storage and reversible file/worktree adapters.
- **VS-03 Graph Memory — next:** append-oriented graph APIs, corrections/supersession and cross-session lineage queries.

See `docs/PES-V2-DESIGN.md`, `docs/MIGRATION-FROM-V1.md` and `docs/VS-02-RATCHET-ENGINE.md`.
