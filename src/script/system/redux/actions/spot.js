export const BOOK_SPOT_TRADE = 'BOOK_SPOT_TRADE';
export const TRADE_BOOKED = 'TRADE_BOOKED';

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