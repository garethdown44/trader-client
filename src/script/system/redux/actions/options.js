const debug = require('debug')('trader:actions:options');

export const UPDATE_STRIKE = 'UPDATE_STRIKE';
export const UPDATE_NOTIONAL = 'UPDATE_NOTIONAL';
export const PRICE_OPTION = 'PRICE_OPTION';
export const OPTION_PRICE_REQUESTED = 'OPTION_PRICE_REQUESTED';
export const OPTION_PRICE_RECEIVED = 'OPTION_PRICE_RECEIVED';
export const QUOTE_TIMED_OUT = 'QUOTE_TIMED_OUT';
export const QUOTE_TIME_TICKED = 'QUOTE_TIME_TICKED';

import requestOptionPrice from '../../requestOptionPrice';
import Rx from 'rx'

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
    legIndex: legIndex,
    func: function(leg, val) {
      return leg.set('strike', val);
    }
  };
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

export function quoteTimeTicked(tileId, secondsRemaining) {
  return {
    type: QUOTE_TIME_TICKED,
    tileId,
    secondsRemaining
  }
}

export function initiateQuoteExpiry(tileId, option) {

  return dispatch => {

    let start = 10; // todo

    Rx.Observable
      .timer(0, 1000)
      .map(i => start - i)
      .take(start + 1)
      .subscribe(i => {

        debug('tick', i);

          if (i > 0) {
            debug('dispatching....');
            dispatch(quoteTimeTicked(tileId, i));

          } else {

            return dispatch(quoteTimedOut(tileId));
          }
        });
  }
}

export function priceOption(tileId, option) {

  return function(dispatch) {

    dispatch(optionPriceRequested(tileId, option));

    requestOptionPrice(option, result => {
      dispatch(optionPriceReceived(tileId, result));
      dispatch(initiateQuoteExpiry(tileId, result));
    });
  }
}

export function quoteTimedOut(tileId) {
  return {
    type: QUOTE_TIMED_OUT,
    tileId: tileId
  }
}
