import assert from 'assert';
import { createTensorMeshServer } from '../src/server.js';

console.log('🧪 Starting TensorMesh RPA Server Integration Suite...\n');

let passed = 0;
function ok(label: string, cond: boolean): void {
  assert(cond, label);
  passed++;
  console.log(`   ✅ ${label}`);
}

// Force simulator so the integration suite is deterministic and offline.
process.env.MOCK_INFERENCE = 'true';

const { server } = createTensorMeshServer();
await new Promise<void>((resolve) => server.listen(0, resolve));
const { port } = server.address() as import('net').AddressInfo;
const base = `http://127.0.0.1:${port}`;
const get = (p: string) => fetch(base + p).then(async (r) => ({ status: r.status, body: (await r.json().catch(() => ({}))) as any }));
const post = (p: string, body: unknown) =>
  fetch(base + p, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    .then(async (r) => ({ status: r.status, body: (await r.json().catch(() => ({}))) as any }));

try {
  console.log('1️⃣ Health & startup...');
  const health = await get('/api/health');
  ok('server boots and /api/health returns 200', health.status === 200);
  ok('reports inference mode', health.body.inferenceMode === 'simulator');

  console.log('\n2️⃣ Plan endpoint...');
  const plan = await post('/api/plan', { prompt: 'Search and export the sales table', engine: 'nebius' });
  ok('plan returns 200', plan.status === 200);
  ok('plan yields 5 simulator steps', plan.body.plan.actions.length === 5);
  ok('missing prompt -> 400', (await post('/api/plan', {})).status === 400);

  console.log('\n3️⃣ Benchmark endpoint...');
  const bench = await get('/api/benchmark');
  ok('benchmark returns speedup metrics', bench.status === 200 && typeof bench.body.metrics.ttftSpeedup === 'string');

  console.log('\n4️⃣ Security guards...');
  ok('encoded path traversal blocked (403)', (await fetch(base + '/..%2f..%2fserver.ts')).status === 403);
  ok('oversized body rejected (413)', (await post('/api/plan', { prompt: 'x'.repeat(70 * 1024) })).status === 413);

  console.log(`\n🎉 ALL ${passed} TENSORMESH SERVER INTEGRATION ASSERTIONS PASSED.\n`);
} finally {
  server.close();
}
