import fs from 'node:fs';
import { validateBudget, validateGraph, invariant } from '../src/core.mjs';

const read = path => JSON.parse(fs.readFileSync(path, 'utf8'));
const config = read('.engineering/pes-v2.json');
const governance = read('delivery/governance.json');
const current = read('delivery/current-slice.json');
const graph = read('state/graph.json');

invariant(config.version === 2, 'PES configuration must be version 2');
invariant(['lite','standard','enterprise'].includes(config.mode), 'Unsupported PES mode');
validateBudget(config.budgets);
validateGraph(graph);

for (const required of ['scope','policy','implementation','certification','release','production-enable']) {
  invariant(governance.approvalTypes.includes(required), `Missing approval type: ${required}`);
}

if (current.activeSlice) {
  invariant(governance.lifecycle.includes(current.activeSlice.state) || governance.exceptionStates.includes(current.activeSlice.state), `Invalid active slice state: ${current.activeSlice.state}`);
}

console.log(`PES v2 validation passed: ${graph.nodes.length} nodes, ${graph.edges.length} edges, mode=${config.mode}`);
