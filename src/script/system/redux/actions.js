import positions from '../blotter';

export const BOOK_SPOT_TRADE = 'BOOK_SPOT_TRADE';
export const UPDATE_STRIKE = 'UPDATE_STRIKE';
export const TRADE_BOOKED = 'TRADE_BOOKED';
export const RECEIVE_POSITION = 'RECEIVE_POSITION';

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

export function updateStrike(value, legIndex) {
  return {
    type: UPDATE_STRIKE,
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

export function subscribePositions() {
  return function (dispatch) {
    //dispatch(requestPositions); // todo: make the UI update when the positions are being requested for the first time

    return positions.subscribe(position => {
      dispatch(receivePosition(position));
    });
  };
}