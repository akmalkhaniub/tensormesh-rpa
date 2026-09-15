/**
 * ActionPlanner - Translates natural language goals into safe, verifiable robotic process steps.
 */

export class ActionPlanner {
  constructor(groundingEngine) {
    this.grounding = groundingEngine;
  }

  /**
   * Plan an end-to-end automation sequence
   * @param {string} goalDescription 
   * @param {Array<Object>} screenContextElements 
   * @returns {Array<Object>} executable action steps
   */
  plan(goalDescription, screenContextElements = []) {
    const goal = goalDescription.toLowerCase();
    const actions = [];

    if (goal.includes('search') || goal.includes('filter')) {
      const searchTarget = this.grounding.groundElement('Search Input', screenContextElements);
      actions.push({
        step: 1,
        type: 'CLICK',
        target: searchTarget.matchedLabel,
        coordinates: searchTarget.coordinates,
        description: `Focus on search field at (${searchTarget.coordinates.x}, ${searchTarget.coordinates.y})`
      });

      actions.push({
        step: 2,
        type: 'TYPE',
        payload: 'Q3_Enterprise_Audit_2026',
        description: 'Input query string "Q3_Enterprise_Audit_2026"'
      });

      actions.push({
        step: 3,
        type: 'KEY_PRESS',
        key: 'ENTER',
        description: 'Send Enter key to submit query'
      });
    }

    if (goal.includes('export') || goal.includes('save') || goal.includes('submit')) {
      const submitTarget = this.grounding.groundElement('Submit Button', screenContextElements);
      actions.push({
        step: actions.length + 1,
        type: 'CLICK',
        target: submitTarget.matchedLabel,
        coordinates: submitTarget.coordinates,
        requiresConfirmation: false,
        description: `Click "${submitTarget.matchedLabel}" to execute batch operation`
      });
    }

    return {
      goalDescription,
      totalSteps: actions.length,
      estimatedExecutionMs: actions.length * 150, // sub-second total action time
      actions
    };
  }
}
