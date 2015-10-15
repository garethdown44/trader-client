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

function legfn(leg, action) {
  switch (action.type) {
    case UPDATE_STRIKE:
      leg = leg.set('strike', action.value);
      break;

    case UPDATE_NOTIONAL:
      leg = leg.set('notional', action.value);
      break;
  }

  return leg;
}

function option(state = {}, action) {

  state = state.set('valid', true);
  let legs = state.get('legs');

  switch (action.type) {

    case UPDATE_STRIKE:

      state = state.set('valid', action.value < 3);

    case UPDATE_NOTIONAL:
      let leg = legs.get(action.legIndex);

      leg = legfn(leg, action);

      legs = legs.set(action.legIndex, leg);
      state = state.set('legs', legs);
      break;

    case OPTION_PRICE_REQUESTED:
      state = state.set('status', 'IS_PRICING');
      break;

    case OPTION_PRICE_RECEIVED:
      state = state.set('status', 'IS_PRICED');
      state = state.set('price', action.option.price);
      //state = state.set('quoteValidForInSeconds', 10); // arbitrary
      break;

    case QUOTE_TIMED_OUT:
      state = state.set('status', '');
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
      let tiles = state.get('tiles');
      let tile = tiles.get(action.tileId);

      tiles = tiles.set(action.tileId, option(tile, action));
      state = state.set('tiles', tiles);

      return state;

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