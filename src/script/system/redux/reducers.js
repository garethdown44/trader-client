const debug = require('debug')('trader:redux:reducers');
import { BOOK_SPOT_TRADE, UPDATE_STRIKE, TRADE_BOOKED, RECEIVE_POSITION, ADD_TILE } from './actions'
import { combineReducers } from 'redux';
import ws from '../workspace';

let initialWorkspaces = ws.get();

function workspace(state = initialWorkspaces, action) {

  switch (action.type) {

    case ADD_TILE:
      return Object.assign({}, state.tiles);

    default:
      return Object.assign({}, state);
  }
}

function positions(state = [], action) {

  debug(action);

  switch (action.type) {
    case RECEIVE_POSITION:
      //let newState = Object.assign({}, state.positions);

      let newState = [...state, Object.assign({}, action.position)];

      debug('newState', newState);

      return newState;

    default:
      return [...state]; 
  }
}

export default combineReducers({workspace, positions});