const debug = require('debug')('trader:actions');
import positions from '../blotter';

import requestOptionPrice from '../requestOptionPrice';

export const BOOK_SPOT_TRADE = 'BOOK_SPOT_TRADE';
export const UPDATE_STRIKE = 'UPDATE_STRIKE';
export const UPDATE_NOTIONAL = 'UPDATE_NOTIONAL';
export const TRADE_BOOKED = 'TRADE_BOOKED';
export const RECEIVE_POSITION = 'RECEIVE_POSITION';
export const ADD_TILE = 'ADD_TILE';
export const PRICE_OPTION = 'PRICE_OPTION';
export const OPTION_PRICE_REQUESTED = 'OPTION_PRICE_REQUESTED';
export const OPTION_PRICE_RECEIVED = 'OPTION_PRICE_RECEIVED';
export const QUOTE_TIMED_OUT = 'QUOTE_TIMED_OUT';

export function bookSpotTrade(ccyCpl, notional, rate) {
  return {
    type: BOOK_SPOT_TRADE,
    ccyCpl: ccyCpl,
    notional: notional,
    rate: rate
  };
}

export function tradeBooked(trade) {
  return {
    type: TRADE_BOOKED,
    trade
  }
}

export function updateStrike(value, tileId, legIndex) {
  return {
    type: UPDATE_STRIKE,
    tileId: tileId,
    value: value,
    legIndex: legIndex
  };
}

export function updateNotional(value, tileId, legIndex) {
  return {
    type: UPDATE_NOTIONAL,
    tileId: tileId,
    value: value,
    legIndex: legIndex
  };
}

export function receivePosition(position) {
  return {
    type: RECEIVE_POSITION,
    position: position
  }
}

export function addTile(tile) {
  return {
    type: ADD_TILE,
    tile: tile
  }
}

export function optionPriceRequested(tileId, option) {
  return {
    type: OPTION_PRICE_REQUESTED,
    tileId: tileId,
    option: option
  }
}

export function optionPriceReceived(tileId, option) {
  return {
    type: OPTION_PRICE_RECEIVED,
    tileId: tileId,
    option: option
  }
}

export function priceOption(tileId, option) {

  return function(dispatch) {

    dispatch(optionPriceRequested(tileId, option));

    // make request, then dispatch

    requestOptionPrice(option, result => {
      dispatch(optionPriceReceived(tileId, result));
    });
  }
}

export function quoteTimedOut(tileId) {
  return {
    type: QUOTE_TIMED_OUT,
    tileId: tileId
  }
}

export function subscribePositions() {

  debug('subscribePositions() - entry');

  return function (dispatch) {

    return positions.subscribe(position => {
      return dispatch(receivePosition(position));
    })
  };
}