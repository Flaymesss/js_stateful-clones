'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        currentState[key] = action.extraData[key];
      }
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete currentState[key];
      }
    } else if (action.type === 'clear') {
      for (const key in currentState) {
        delete currentState[key];
      }
    }

    result.push({ ...currentState });
    currentState = { ...currentState };
  }

  return result;
}

module.exports = transformStateWithClones;
