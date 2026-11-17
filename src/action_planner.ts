/**
 * ActionPlanner - Translates natural language goals into safe, verifiable robotic process steps.
 */
import type { UIGroundingEngine, DetectedElement } from './ui_grounding_engine.js';

export interface PlannedAction {
  step: number;
  type: 'CLICK' | 'TYPE' | 'KEY_PRESS' | 'WAIT';
  target?: string;
  coordinates?: { x: number; y: number };
  payload?: string;
  key?: string;
  requiresConfirmation?: boolean;
  description: string;
}

export interface ActionPlan {
  goalDescription: string;
  totalSteps: number;
  estimatedExecutionMs: number;
  actions: PlannedAction[];
}

/** Pull the search text out of a goal. Quoted text wins; otherwise the words after "search for". */
export function extractSearchText(goal: string): string {
  const quoted = goal.match(/["“]([^"”]+)["”]/);
  if (quoted) return quoted[1].trim();
  const match = goal.match(/\b(?:search|find|look up|filter)\s+(?:for\s+)?(.+)/i);
  const raw = (match ? match[1] : goal).split(/\s+\b(?:and|then)\b\s+/i)[0];
  return raw.replace(/[?.!]+$/g, '').trim().slice(0, 120) || goal.trim().slice(0, 120);
}

export class ActionPlanner {
  constructor(private grounding: UIGroundingEngine) {}

  /** Plan an end-to-end automation sequence. */
  plan(goalDescription: string, screenContextElements: DetectedElement[] = []): ActionPlan {
    const goal = goalDescription.toLowerCase();
    const actions: PlannedAction[] = [];

    if (goal.includes('search') || goal.includes('filter') || goal.includes('find')) {
      const searchTarget = this.grounding.groundElement('Search Input', screenContextElements);
      const text = extractSearchText(goalDescription);
      actions.push({ step: 1, type: 'CLICK', target: searchTarget.matchedLabel, coordinates: searchTarget.coordinates, description: `Focus on search field at (${searchTarget.coordinates.x}, ${searchTarget.coordinates.y})` });
      actions.push({ step: 2, type: 'TYPE', payload: text, description: `Input query string "${text}"` });
      actions.push({ step: 3, type: 'KEY_PRESS', key: 'ENTER', description: 'Send Enter key to submit query' });
    }

    if (goal.includes('export') || goal.includes('save') || goal.includes('submit')) {
      const submitTarget = this.grounding.groundElement('Submit Button', screenContextElements);
      actions.push({ step: actions.length + 1, type: 'CLICK', target: submitTarget.matchedLabel, coordinates: submitTarget.coordinates, requiresConfirmation: false, description: `Click "${submitTarget.matchedLabel}" to execute batch operation` });
    }

    return {
      goalDescription,
      totalSteps: actions.length,
      estimatedExecutionMs: actions.length * 150,
      actions
    };
  }
}
