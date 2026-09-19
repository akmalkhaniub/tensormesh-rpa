/**
 * Grounding + planning accuracy evaluation for TensorMesh RPA.
 *
 * - Grounding: given a target description and detected screen elements, does the engine
 *   pick the right element?  (accuracy over labeled cases)
 * - Planning: given a goal, does the planner emit the expected action types in order?
 *
 * These are measurable numbers for "the agent points and acts at the right things."
 */
import { UIGroundingEngine, type DetectedElement } from './ui_grounding_engine.js';
import { ActionPlanner } from './action_planner.js';

const ELEMENTS: DetectedElement[] = [
  { label: 'Customer Search Input', bbox: [100, 450, 140, 850], type: 'INPUT' },
  { label: 'Export Report Button', bbox: [900, 1600, 940, 1820], type: 'BUTTON' },
  { label: 'Sales Data Grid', bbox: [200, 100, 850, 1850], type: 'TABLE' },
];

const GROUNDING_CASES: Array<{ desc: string; expectedType: string }> = [
  { desc: 'Customer Search Input', expectedType: 'INPUT' },
  { desc: 'search box', expectedType: 'INPUT' },
  { desc: 'export button', expectedType: 'BUTTON' },
  { desc: 'submit', expectedType: 'BUTTON' },
  // Grounds to the real detected grid element (better than a heuristic row guess).
  { desc: 'sales data grid', expectedType: 'TABLE' },
];

const PLANNING_CASES: Array<{ goal: string; expected: string[] }> = [
  { goal: 'search for audit logs', expected: ['CLICK', 'TYPE', 'KEY_PRESS'] },
  { goal: 'export the report', expected: ['CLICK'] },
  { goal: 'search and export the sales table', expected: ['CLICK', 'TYPE', 'KEY_PRESS', 'CLICK'] },
];

export interface EvalResult {
  groundingAccuracy: number;
  planningAccuracy: number;
  groundingN: number;
  planningN: number;
}

export function evaluate(): EvalResult {
  const grounding = new UIGroundingEngine();
  const planner = new ActionPlanner(grounding);

  let gCorrect = 0;
  for (const c of GROUNDING_CASES) {
    const r = grounding.groundElement(c.desc, ELEMENTS);
    if (r.elementType === c.expectedType && r.isSafe) gCorrect++;
  }

  let pCorrect = 0;
  for (const c of PLANNING_CASES) {
    const plan = planner.plan(c.goal, ELEMENTS);
    const types = plan.actions.map((a) => a.type);
    if (types.length === c.expected.length && types.every((t, i) => t === c.expected[i])) pCorrect++;
  }

  return {
    groundingAccuracy: Number((gCorrect / GROUNDING_CASES.length).toFixed(3)),
    planningAccuracy: Number((pCorrect / PLANNING_CASES.length).toFixed(3)),
    groundingN: GROUNDING_CASES.length,
    planningN: PLANNING_CASES.length,
  };
}
