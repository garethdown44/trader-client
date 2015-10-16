export const UPDATE_STRIKE = 'UPDATE_STRIKE';
export const UPDATE_NOTIONAL = 'UPDATE_NOTIONAL';
export const PRICE_OPTION = 'PRICE_OPTION';
export const OPTION_PRICE_REQUESTED = 'OPTION_PRICE_REQUESTED';
export const OPTION_PRICE_RECEIVED = 'OPTION_PRICE_RECEIVED';
export const QUOTE_TIMED_OUT = 'QUOTE_TIMED_OUT';

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

export function initiateQuoteExpiry(tileId, option) {

  return function(dispatch) {
    Rx.Observable.timer(option.quoteValidForInSeconds * 1000).take(1).subscribe(_ => {
      dispatch(quoteTimedOut(tileId, option));
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
