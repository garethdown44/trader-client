const debug = require('debug')('trader:redux:reducers:positions');

import { RECEIVE_POSITION } from '../actions/positions';

export default function positions(state = [], action) {

  debug(action);

  switch (action.type) {
    case RECEIVE_POSITION:

      let newState = [...state, Object.assign({}, action.position)];

      debug('newState', newState);

      return newState;

    default:
      return state;
  }
}