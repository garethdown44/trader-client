import { ADD_TILE, REMOVE_TILE } from '../actions/workspace';
import { BOOK_SPOT_TRADE, TRADE_BOOKED } from '../actions/spot';
import { SpotTile, OptionTile } from '../../workspace/data-structures';

import { UPDATE_STRIKE, 
         UPDATE_NOTIONAL, 
         PRICE_OPTION, 
         OPTION_PRICE_REQUESTED, 
         OPTION_PRICE_RECEIVED,
         QUOTE_TIMED_OUT } from '../actions/options'

import option from './options'
import ws from '../../workspace';

let initialWorkspace = ws.get();

export default function workspace(state = initialWorkspace, action) {

  let tiles = state.tiles;

  switch (action.type) {

    case ADD_TILE:

      if (action.product == 'spot') {
        tiles = tiles.push(new SpotTile({ccyCpl: 'EURUSD'}));
      } else if (action.product == 'option') {
        tiles = tiles.push(new OptionTile({ccyCpl: 'EURUSD'}));
      }
      
      state = state.set('tiles', tiles);

      return state;

    case REMOVE_TILE:
      tiles = tiles.delete(action.tileId);
      state = state.set('tiles', tiles);

      return state;

    case UPDATE_STRIKE:
    case UPDATE_NOTIONAL:
    case OPTION_PRICE_REQUESTED:
    case OPTION_PRICE_RECEIVED:
    case QUOTE_TIMED_OUT:
      
      let tile = tiles.get(action.tileId);

      tiles = tiles.set(action.tileId, option(tile, action));
      state = state.set('tiles', tiles);

      return state;

    default:
      return state;
  }
}