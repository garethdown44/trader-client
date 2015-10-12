const debug = require('debug')('trader:redux:reducers');
import { BOOK_SPOT_TRADE, UPDATE_STRIKE, TRADE_BOOKED, RECEIVE_POSITION } from './actions'
import { combineReducers } from 'redux';
import workspace from '../workspace';
//import Immutable from 'immutable'

// const initialState = {
//   ccyCpl: 'EURUSD',
//   legs: [
//     {strike: 1.234},
//     {strike: 2.345}
//   ],
//   valid: true
// };

let initialState = {
  workspace: workspace.get(),
  positions: []
};

function operations(state = initialState, action) {

  debug('operations - entry', state, action);

  switch (action.type) {

    case RECEIVE_POSITION:

      let newState = Object.assign({}, state);

      newState.positions = [...state.positions, Object.assign({}, action.position)];

      debug('newState', newState);

      return newState;

    case UPDATE_STRIKE:

    // let valid = action.value < 3;

    // let newState = {
    //   ccyCpl: 'EURUSD',
    //   legs: [
    //     {strike: action.value},
    //     {strike: 2.345}
    //   ],
    //   valid: valid
    // };

    // newState.legs[action.legIndex].strike = action.value;

    // debug('newState', newState);

      return state;

    case BOOK_SPOT_TRADE:
      return state;

    case TRADE_BOOKED:
      return state;

    default:
      return state;
  }
}

// function options(state = {}, action) {
//   return state;
// }

//const rootReducer = combineReducers({operations, options});

export default operations;