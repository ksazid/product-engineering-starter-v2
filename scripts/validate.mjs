import fs from 'node:fs';
import { validateBudget, invariant } from '../src/core.mjs';
import { validateContextPolicy } from '../src/context-engine.mjs';
import { validateGraphMemoryState } from '../src/graph-memory.mjs';
import { validateEvaluatorContract } from '../src/ratchet-engine.mjs';

const read = path => JSON.parse(fs.readFileSync(path, 'utf8'));
const config = read('.engineering/pes-v2.json');
const governance = read('delivery/governance.json');
const current = read('delivery/current-slice.json');
const graph = read('state/graph.json');
const ratchetRuns = read('state/ratchet-runs.json');

invariant(config.version === 2, 'PES configuration must be version 2');
invariant(['lite','standard','enterprise'].includes(config.mode), 'Unsupported PES mode');
validateBudget(config.budgets);
validateContextPolicy(config.context);

invariant(config.context.maxTokens <= config.budgets.maxTokens, 'Context token budget cannot exceed run token budget');
invariant(config.ratchet.requireEvaluationBeforeKeep === true, 'PES v2 requires evaluation before keep');
invariant(config.ratchet.revertOnRegression === true, 'PES v2 requires revert on regression');
invariant(Number.isInteger(config.ratchet.maxAttemptsPerRun) && config.ratchet.maxAttemptsPerRun > 0, 'ratchet.maxAttemptsPerRun must be positive');

invariant(config.graph.enabled === true, 'PES v2 graph memory must be enabled');
invariant(config.graph.appendOnly === true, 'PES v2 graph memory must be append-only');
invariant(config.graph.requireWriteProvenance === true, 'PES v2 graph memory requires write provenance');
invariant(config.graph.rejectConflictingIds === true, 'PES v2 graph memory must reject conflicting ids');
invariant(config.graph.immutableSupersession === true, 'PES v2 requires immutable supersession');
validateGraphMemoryState(graph, { requireObjectProvenance: config.graph.requireWriteProvenance });

invariant(ratchetRuns.schemaVersion === 1 && Array.isArray(ratchetRuns.runs), 'Invalid ratchet run store');
for (const run of ratchetRuns.runs) {
  invariant(typeof run.id === 'string' && run.id, 'Stored ratchet run requires id');
  validateEvaluatorContract(run.evaluator);
  validateBudget(run.budget);
  invariant(Array.isArray(run.attempts), `Stored ratchet run ${run.id} requires attempts`);
}

for (const required of ['scope','policy','implementation','certification','release','production-enable']) {
  invariant(governance.approvalTypes.includes(required), `Missing approval type: ${required}`);
}

if (current.activeSlice) {
  invariant(governance.lifecycle.includes(current.activeSlice.state) || governance.exceptionStates.includes(current.activeSlice.state), `Invalid active slice state: ${current.activeSlice.state}`);
}

console.log(`PES v2 validation passed: graph revision=${graph.revision}, ${graph.nodes.length} nodes, ${graph.edges.length} edges, ${graph.events.length} event(s), ${ratchetRuns.runs.length} ratchet run(s), context<=${config.context.maxTokens} tokens, mode=${config.mode}`);
