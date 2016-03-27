const debug = require('debug')('trader:reducers:positions');

import { RECEIVE_POSITION, 
         RECEIVE_TEAM_TRADE, 
         CHANGE_TAB,
         RECEIVE_TEAM_TRADE_BATCH } from '../actions/positions';

const initialState = {
  activeTab: 'myTrades',
  positions: [],
  teamTrades: []
}

export default function positions(state = initialState, action) {

  debug(action);

  switch (action.type) {
    case RECEIVE_POSITION:

      state.positions = [...state.positions, Object.assign({}, action.position)];
      state = Object.assign({}, state);
      
      break;

    case RECEIVE_TEAM_TRADE:

      state.teamTrades = [...state.teamTrades, Object.assign({}, action.trade)];
      state = Object.assign({}, state);
      
      break;

    case RECEIVE_TEAM_TRADE_BATCH:

      debug('receive team trade batch', action.trades);

      state.teamTrades = [...state.teamTrades, ...action.trades];
      state = Object.assign({}, state);
      
      break;

    case CHANGE_TAB:

      state.activeTab = action.value;
      state = Object.assign({}, state);
      break;
  }

  return state;
}