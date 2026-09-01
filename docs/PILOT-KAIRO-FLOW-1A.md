# PES v2 Pilot 001 — Kairo Flow 1A

## Purpose

Use a real Kairo slice to validate PES v2 against the current Kairo governance workflow without changing Kairo production code or silently widening approval authority.

## Source workload

- Repository: `ksazid/kairo`
- PR: `#258` — Flow 1A Evidence Sanitization Gate
- Exact observed head: `8b78889fd66f8f93b1f3b5f91faf1afed39e305f`
- Change size: 3 files, +295 / -31, 5 commits
- Existing exact-head checks observed as passed:
  - CI — run `33453091575`
  - Product intake — run `33453091565`
  - Security baseline — run `33453091562`

The implementation is a good first pilot because it is contained, security-relevant, testable and declares no UI, production-source or scheduler changes.

## Pilot mode

This is a **shadow validation**, not a second implementation and not final Kairo certification.

PES v2 imports only observable PR/check facts into an isolated pilot graph, builds bounded context from the Flow 1A objective, validates provenance and then exercises the certification boundary.

No Kairo files are changed by the pilot. No model call, sub-agent, graph database or multi-agent workload is required.

## What PES v2 adds over the observable PR metadata

| Capability | Current PR metadata | PES v2 shadow |
| --- | --- | --- |
| Exact candidate SHA | Yes | Yes |
| CI/Product/Security evidence | Yes | Graph-addressable |
| Bounded task context | Not attached | Yes |
| Stable context hash | Not attached | Yes |
| Artifact/evidence/evaluation lineage | Not attached | Yes |
| Human approval bound to certification candidate | Not attached | Required |
| Immutable certification bundle | Not present | Required before certified state |
| Extra model/sub-agent runtime cost | N/A | 0 |

## First result

The existing Kairo checks are strong and remain useful evidence. PES v2 adds value primarily at the **traceability and authority boundary**: it can reconstruct a bounded product context and evidence graph, but it deliberately refuses to reinterpret the user's approval of this pilot as final certification of the Kairo exact SHA.

That is the intended behavior. Pilot authorization and product certification are different authorities.

## What this pilot cannot prove

Because both sides use the same already-written implementation, this shadow run cannot fairly measure:

- output-quality improvement;
- implementation rework reduction;
- regression-rate change;
- implementation wall-clock change.

Those require a new slice to be executed under PES v2 from objective creation onward.

## Next experiment

Use the next new, contained Kairo vertical slice as the first **prospective PES v2 run**. Record objective, approved scope, bounded context, Ratchet attempts, evidence, gate decisions, exact-SHA certification and cost from the start. Compare it with a matched historical Kairo slice on:

- accepted-output quality;
- number of revision/rework cycles;
- regression/failure count;
- implementation and gate wall-clock;
- model/tool/token cost;
- amount of context supplied to workers;
- trace completeness.

Do not enable multi-agent execution during that experiment unless the PES v2 benchmark gate separately proves benefit.
