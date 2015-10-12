const debug = require('debug')('trader:components:Option:reducers');
import { UPDATE_STRIKE } from './actions'

const initialState = {
  ccyCpl: 'EURUSD',
  legs: [
    {strike: 1.234},
    {strike: 2.345}
  ],
  valid: true
};

function operations(state = initialState, action) {

  debug('operations - entry', state, action);

  switch (action.type) {
    case UPDATE_STRIKE:

    let valid = action.value < 3;

    let newState = {
      ccyCpl: 'EURUSD',
      legs: [
        {strike: action.value},
        {strike: 2.345}
      ],
      valid: valid
    };

    newState.legs[action.legIndex].strike = action.value;

    debug('newState', newState);

    return newState;

    default:
      return state;
  }
}

export default operations;