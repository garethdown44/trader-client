const debug = require('debug')('trader:redux:reducers');

import option from './options'

import { UPDATE_STRIKE, 
         UPDATE_NOTIONAL, 
         PRICE_OPTION, 
         OPTION_PRICE_REQUESTED, 
         OPTION_PRICE_RECEIVED,
         QUOTE_TIMED_OUT } from '../actions/options'

import { BOOK_SPOT_TRADE, TRADE_BOOKED } from '../actions/spot';
import { RECEIVE_POSITION } from '../actions/positions';
import { ADD_TILE } from '../actions/workspace';

import { combineReducers } from 'redux';
import ws from '../../workspace';

let initialWorkspace = ws.get();

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