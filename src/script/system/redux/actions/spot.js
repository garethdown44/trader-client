import executeTrade from '../../executeTrade';

export const BOOK_SPOT_TRADE = 'BOOK_SPOT_TRADE';
export const SPOT_TRADE_BOOKED = 'SPOT_TRADE_BOOKED';
export const BOOK_SPOT_TRADE_REQUESTED = 'BOOK_SPOT_TRADE_REQUESTED';
export const SPOT_TRADE_BOOKING_FAILED = 'SPOT_TRADE_BOOKING_FAILED';
  
function bookSpotTradeRequested(tileId, direction, ccyCpl, rate, notional) {
  return {
    tileId: tileId,
    direction: direction,
    type: BOOK_SPOT_TRADE_REQUESTED,
    ccyCpl: ccyCpl,
    rate: rate,
    notional: notional
  };
}

export function tradeBooked(tileId) {
  return {
    type: SPOT_TRADE_BOOKED,
    tileId: tileId
  }
}

export function bookSpotTrade(tileId, direction, ccyCpl, rate, notional) {

  return function (dispatch) {
    dispatch(bookSpotTradeRequested(tileId, direction, ccyCpl, rate, notional));

    // action, ccyCpl, rate, notional, success, error) => {
    executeTrade(direction, ccyCpl, notional, () => dispatch(tradeBooked(tileId)), () => dispatch(tradeBookingFailed(tileId)));
  }
}


function tradeBookingFailed(tileId) {
  return {
    type: SPOT_TRADE_BOOKING_FAILED,
    tileId
  }
}