import fs from 'node:fs';
import { buildContext } from '../src/core.mjs';

const graph = JSON.parse(fs.readFileSync('state/graph.json', 'utf8'));
const config = JSON.parse(fs.readFileSync('.engineering/pes-v2.json', 'utf8'));
const seeds = process.argv.slice(2);

if (!seeds.length) {
  console.error('Usage: npm run context:build -- <NODE-ID> [NODE-ID...]');
  process.exit(2);
}

const result = buildContext(graph, seeds, config.context);
process.stdout.write(JSON.stringify(result, null, 2) + '\n');
