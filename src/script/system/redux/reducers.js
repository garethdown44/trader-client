const debug = require('debug')('trader:redux:reducers');
import { BOOK_SPOT_TRADE, UPDATE_STRIKE, TRADE_BOOKED, RECEIVE_POSITION, ADD_TILE } from './actions'
import { combineReducers } from 'redux';
import ws from '../workspace';

let initialWorkspaces = ws.get();


function option(state = {}, action) {

  let newState = Object.assign({}, state);
  newState.legs = [...state.legs];

  switch (action.type) {
    case UPDATE_STRIKE:
      newState.legs[action.legIndex].strike = action.value;
      newState.valid = action.value < 3;
      break;

    case UPDATE_NOTIONAL:
      newState.legs[action.legIndex].notional = action.notional;
      break;
  }

  return newState;
}

function workspace(state = initialWorkspaces, action) {

  switch (action.type) {

    case ADD_TILE:
      return Object.assign({}, state.tiles);

    case UPDATE_STRIKE:

      let tile = state.tiles[action.tileId];

      let newWorkspace = {};
      newWorkspace.tiles = Object.assign({}, state.tiles);
      newWorkspace.tiles[action.tileId] = option(tile, action);

      return newWorkspace;

    default:
      return Object.assign({}, state);
  }
}

function positions(state = [], action) {

  debug(action);

  switch (action.type) {
    case RECEIVE_POSITION:

      let newState = [...state, Object.assign({}, action.position)];

      debug('newState', newState);

      return newState;

    default:
      return [...state]; 
  }
}

export default combineReducers( { 
                                  workspace, 
                                  positions 
                                } );