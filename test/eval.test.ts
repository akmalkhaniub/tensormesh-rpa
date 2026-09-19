import assert from 'assert';
import { evaluate } from '../src/eval.js';

console.log('🧪 TensorMesh grounding + planning eval...\n');
let passed = 0;
const ok = (label: string, cond: boolean) => { assert(cond, label); passed++; console.log(`   ✅ ${label}`); };

const r = evaluate();
console.log('   result:', r);
ok('grounding accuracy is measured in [0,1]', r.groundingAccuracy >= 0 && r.groundingAccuracy <= 1);
ok('planning accuracy is measured in [0,1]', r.planningAccuracy >= 0 && r.planningAccuracy <= 1);
ok('grounding accuracy is perfect on the labeled set (1.0)', r.groundingAccuracy === 1.0);
ok('planning accuracy is perfect on the labeled set (1.0)', r.planningAccuracy === 1.0);

console.log(`\n🎉 ALL ${passed} TENSORMESH EVAL ASSERTIONS PASSED.\n`);
