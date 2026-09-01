import fs from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';
import { buildRankedContext } from '../src/context-engine.mjs';
import { validateGraphMemoryState } from '../src/graph-memory.mjs';
import { buildCertificationCandidate } from '../src/certification-engine.mjs';

const read = path => JSON.parse(fs.readFileSync(path, 'utf8'));
const pilot = read('pilots/kairo-flow-1a/pilot.json');
const graph = read('pilots/kairo-flow-1a/graph.json');
const config = read('.engineering/pes-v2.json');
const governance = read('delivery/governance.json');
const certificationPolicy = read('delivery/certification-policy.json');

test('Kairo Flow 1A pilot is anchored to the observed exact PR head and successful baseline checks', () => {
  assert.equal(pilot.source.repository, 'ksazid/kairo');
  assert.equal(pilot.source.pullRequest, 258);
  assert.match(pilot.source.headSha, /^[0-9a-f]{40}$/);
  assert.equal(pilot.source.headSha, '8b78889fd66f8f93b1f3b5f91faf1afed39e305f');
  assert.equal(pilot.source.changedFiles, 3);
  assert.equal(pilot.baseline.checks.length, 3);
  assert.ok(pilot.baseline.checks.every(check => check.conclusion === 'success'));
});

test('shadow graph is provenance-bearing and builds stable bounded context', () => {
  assert.equal(validateGraphMemoryState(graph, { requireObjectProvenance: true }), true);
  const first = buildRankedContext(graph, [pilot.objectiveId], config.context);
  const second = buildRankedContext(graph, [pilot.objectiveId], config.context);
  assert.equal(first.contextHash, second.contextHash);
  assert.ok(first.estimatedTokens <= config.context.maxTokens);
  assert.ok(first.nodes.some(node => node.id === 'ART-KAIRO-PR-258'));
  assert.ok(first.nodes.some(node => node.id === 'EVI-KAIRO-CI-33453091575'));
});

test('shadow validation adds no normal multi-agent runtime cost', () => {
  assert.equal(pilot.pesV2Shadow.modelCalls, 0);
  assert.equal(pilot.pesV2Shadow.subAgents, 0);
  assert.equal(pilot.pesV2Shadow.kairoCodeChanges, 0);
  assert.equal(config.multiAgent.enabled, false);
  assert.equal(config.budgets.maxSubAgents, 0);
  assert.equal(config.budgets.maxConcurrentWorkers, 1);
});

test('PES v2 refuses to convert pilot approval into final Kairo certification', () => {
  const context = buildRankedContext(graph, [pilot.objectiveId], config.context);
  const gateResult = {
    allowed: true,
    requestedState: 'certification',
    sliceId: pilot.slice.id,
    blockers: [],
    warnings: []
  };

  assert.throws(() => buildCertificationCandidate({
    bundleId: 'CERT-KAIRO-FLOW-1A-SHADOW',
    slice: {
      id: pilot.slice.id,
      objectiveId: pilot.objectiveId,
      riskLevel: pilot.slice.riskLevel
    },
    commitSha: pilot.source.headSha,
    graph,
    context,
    gateResult,
    approvals: [],
    artifactIds: pilot.pesV2Shadow.artifactIds,
    evidenceIds: pilot.pesV2Shadow.evidenceIds,
    evaluationIds: pilot.pesV2Shadow.evaluationIds,
    unresolvedRisks: [],
    governance,
    policy: certificationPolicy,
    authority: config.authority,
    createdAt: '2026-09-01T00:45:00.000Z'
  }), /Certification candidate blocked/);
});
