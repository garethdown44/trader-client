const debug = require('debug')('trader:redux:reducers');
import { BOOK_SPOT_TRADE, 
         UPDATE_STRIKE, 
         UPDATE_NOTIONAL, 
         TRADE_BOOKED, 
         RECEIVE_POSITION, 
         ADD_TILE, 
         PRICE_OPTION, 
         OPTION_PRICE_REQUESTED, 
         OPTION_PRICE_RECEIVED,
         QUOTE_TIMED_OUT } from './actions'

import { combineReducers } from 'redux';
import ws from '../workspace';

let initialWorkspace = ws.get();

function option(state = {}, action) {

  state = state.set('valid', true);
  let legs = state.get('legs');

  switch (action.type) {

    case UPDATE_STRIKE:
      let leg = legs.get(action.legIndex);
      leg = leg.set('strike', action.value);
      legs = legs.set(action.legIndex, leg);

      state = state.set('legs', legs);

      if (action.value < 3) { // contrived example
        state = state.set('valid', true);
      }

      break;

    case UPDATE_NOTIONAL:
      //newState.legs[action.legIndex].notional = action.value;
      break;

    case OPTION_PRICE_REQUESTED:
      //newState.status = 'IS_PRICING';
      break;

    case OPTION_PRICE_RECEIVED:
      // newState.status = 'IS_PRICED';
      // newState.price = action.option.price;
      break;
  }

  return state;
}

function workspace(state = initialWorkspace, action) {

  switch (action.type) {

    //case ADD_TILE:
      //return Object.assign({}, state.tiles);

    case UPDATE_STRIKE:
    case UPDATE_NOTIONAL:
    case OPTION_PRICE_REQUESTED:
    case OPTION_PRICE_RECEIVED:
    case QUOTE_TIMED_OUT:

      // let tile = state.tiles[action.tileId];

      // let newWorkspace = {};
      // newWorkspace.tiles = {};

      // for (let t in state.tiles) {
      //   if (t == action.tileId) {
      //     newWorkspace.tiles[t] = (option(tile, action));
      //   } else {
      //     newWorkspace.tiles[t] = state.tiles[t];
      //   }
      // }

      let tiles = state.get('tiles');
      let tile = tiles.get(action.tileId);

      tiles = tiles.set(action.tileId, option(tile, action));
      state = state.set('tiles', tiles);

      return state;

    case PRICE_OPTION:
      //return state;

    default:
      return state;
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