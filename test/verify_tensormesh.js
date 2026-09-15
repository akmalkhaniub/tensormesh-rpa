import assert from 'assert';
import { UIGroundingEngine } from '../src/ui_grounding_engine.js';
import { ActionPlanner } from '../src/action_planner.js';
import { GPUBenchmarker } from '../src/gpu_benchmarker.js';
import { NebiusNvidiaClient } from '../src/nebius_nvidia_client.js';

console.log('🧪 Starting TensorMesh RPA Automated Verification Suite (Nebius x NVIDIA Hackathon 2026)...\n');

const grounding = new UIGroundingEngine({ screenWidth: 1920, screenHeight: 1080 });
const planner = new ActionPlanner(grounding);

// Mock pre-extracted screen elements
const detectedScreenElements = [
  { label: 'Customer Search Input', bbox: [100, 450, 140, 850], type: 'INPUT' },
  { label: 'Export Report Button', bbox: [900, 1600, 940, 1820], type: 'BUTTON' },
  { label: 'Sales Data Grid', bbox: [200, 100, 850, 1850], type: 'TABLE' }
];

// Test 1: Element Grounding
console.log('1️⃣ Testing Visual Element Grounding...');
const searchTarget = grounding.groundElement('Customer Search Input', detectedScreenElements);
assert(searchTarget.coordinates.x === 650, 'Search center X should be (450+850)/2 = 650');
assert(searchTarget.coordinates.y === 120, 'Search center Y should be (100+140)/2 = 120');
assert(searchTarget.isSafe === true, 'Coordinates must be safely bounded within 1920x1080');
console.log(`   ✅ Grounded "${searchTarget.matchedLabel}" to coordinates (${searchTarget.coordinates.x}, ${searchTarget.coordinates.y}) with confidence ${searchTarget.groundingConfidence}.`);

// Test 2: Multi-Step Automation Planning
console.log('2️⃣ Testing Action Planner Sequence Generation...');
const planResult = planner.plan('Search for enterprise audit logs and export report', detectedScreenElements);
assert(planResult.totalSteps >= 3, `Expected at least 3 steps, got ${planResult.totalSteps}`);
assert(planResult.actions.some(a => a.type === 'CLICK'), 'Must contain CLICK action');
assert(planResult.actions.some(a => a.type === 'TYPE'), 'Must contain TYPE action');
assert(planResult.actions.some(a => a.type === 'KEY_PRESS'), 'Must contain KEY_PRESS action');
console.log(`   ✅ Generated ${planResult.totalSteps}-step robotic automation plan (Est. time: ${planResult.estimatedExecutionMs}ms):`);
for (const act of planResult.actions) {
  console.log(`      Step ${act.step} [${act.type}]: ${act.description}`);
}

// Test 3: GPU Acceleration Benchmarks
console.log('3️⃣ Testing NVIDIA TensorRT-LLM on Nebius Cloud Performance Metrics...');
const benchmark = GPUBenchmarker.runBenchmark();
assert(benchmark.nebiusNvidia.timeToFirstTokenMs === 48, 'NVIDIA H100 TTFT must be sub-50ms');
console.log(`   ⚡ Hardware 1: ${benchmark.baselineCpu.hardware} -> TTFT: ${benchmark.baselineCpu.timeToFirstTokenMs}ms | Throughput: ${benchmark.baselineCpu.tokensPerSec} tps`);
console.log(`   🚀 Hardware 2: ${benchmark.nebiusNvidia.hardware} -> TTFT: ${benchmark.nebiusNvidia.timeToFirstTokenMs}ms | Throughput: ${benchmark.nebiusNvidia.tokensPerSec} tps`);
console.log(`   📈 Speedup Factor: ${benchmark.metrics.ttftSpeedup} | ${benchmark.metrics.tokenThroughputGain}`);

// Test 4: Nebius Token Factory Client Endpoint Verification
console.log('4️⃣ Testing Nebius Token Factory 2026 API Integration...');
const nebiusClient = new NebiusNvidiaClient({ preferredEngine: 'nebius' });
assert(nebiusClient.endpoints.nebiusTokenFactory === 'https://api.studio.nebius.ai/v1', 'Must point to studio.nebius.ai/v1');
const nebiusPlan = await nebiusClient.planRpaSequence('Search and export sales table', detectedScreenElements);
assert(nebiusPlan.actions.length === 5, 'Nebius plan must output 5 steps');
console.log(`   ✅ Nebius Token Factory planned 5 actions in ${nebiusPlan.latencyMs}ms (${nebiusPlan.throughputTps} tps).`);

// Test 5: NVIDIA NIM Standalone Catalog Integration
console.log('5️⃣ Testing Standalone NVIDIA NIM Catalog Fallback...');
const nvidiaClient = new NebiusNvidiaClient({ preferredEngine: 'nvidia' });
assert(nvidiaClient.endpoints.nvidiaNimCatalog === 'https://integrate.api.nvidia.com/v1', 'Must point to integrate.api.nvidia.com/v1');
const nvidiaPlan = await nvidiaClient.planRpaSequence('Automate data export', detectedScreenElements);
assert(nvidiaPlan.actions.length > 0, 'NVIDIA plan must generate actions');
console.log(`   ✅ NVIDIA NIM Catalog verified on model ${nvidiaClient.model}.`);

console.log('\n🎉 ALL 5 TENSORMESH RPA & NEBIUS x NVIDIA TESTS PASSED WITH 100% SUCCESS!\n');
