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
    currentState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          currentState[key] = action.extraData[key];
        }

        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete currentState[key];
        }

        break;

      case 'clear':
        for (const key in currentState) {
          delete currentState[key];
        }

        break;
      default:
        return 'error';
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
