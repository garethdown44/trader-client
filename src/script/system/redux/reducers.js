const debug = require('debug')('trader:redux:reducers');
import { BOOK_SPOT_TRADE, UPDATE_STRIKE, UPDATE_NOTIONAL, TRADE_BOOKED, RECEIVE_POSITION, ADD_TILE, PRICE_OPTION, OPTION_PRICE_REQUESTED, OPTION_PRICE_RECEIVED } from './actions'
import { combineReducers } from 'redux';
import ws from '../workspace';

let initialWorkspaces = ws.get();

function option(state = {}, action) {

  let newState = Object.assign({}, state);
  newState.legs = [];

  for (let leg in state.legs) {
    newState.legs.push(Object.assign({}, state.legs[leg]));
  }

  newState.valid = true;

  switch (action.type) {

    case UPDATE_STRIKE:
      newState.legs[action.legIndex].strike = action.value;
      newState.valid = action.value < 3;
      break;

    case UPDATE_NOTIONAL:
      newState.legs[action.legIndex].notional = action.value;
      break;

    case OPTION_PRICE_REQUESTED:
      newState.status = 'IS_PRICING';
      break;

    case OPTION_PRICE_RECEIVED:
      newState.status = 'IS_PRICED';
      newState.price = action.option.price;
      break;

    
  }

  return newState;
}

function workspace(state = initialWorkspaces, action) {

  switch (action.type) {

    case ADD_TILE:
      return Object.assign({}, state.tiles);

    case UPDATE_STRIKE:
    case UPDATE_NOTIONAL:
    case OPTION_PRICE_REQUESTED:
    case OPTION_PRICE_RECEIVED:
    case QUOTE_TIMED_OUT:

      let tile = state.tiles[action.tileId];

      let newWorkspace = {};
      newWorkspace.tiles = {};

      for (let t in state.tiles) {
        if (t == action.tileId) {
          newWorkspace.tiles[t] = (option(tile, action));
        } else {
          newWorkspace.tiles[t] = state.tiles[t];
        }
      }

      return newWorkspace;

    case PRICE_OPTION:
      return state;

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