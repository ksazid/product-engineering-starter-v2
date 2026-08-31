import fs from 'node:fs';
import { validateBudget, validateGraph, invariant } from '../src/core.mjs';
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
invariant(Number.isInteger(config.ratchet.maxAttemptsPerRun) && config.ratchet.maxAttemptsPerRun > 0, 'ratchet.maxAttemptsPerRun must be positive');
invariant(config.ratchet.requireEvaluationBeforeKeep === true, 'PES v2 requires evaluation before keep');
invariant(config.ratchet.revertOnRegression === true, 'PES v2 requires revert on regression');
validateGraph(graph);

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

console.log(`PES v2 validation passed: ${graph.nodes.length} nodes, ${graph.edges.length} edges, ${ratchetRuns.runs.length} ratchet run(s), mode=${config.mode}`);
