const debug = require('debug')('trader:actions');
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

let i = 0;

export function receivePosition(position) {

  debug('receivePosition, count', i++);

  return {
    type: RECEIVE_POSITION,
    position: position
  }
}

export function subscribePositions() {

  debug('subscribePositions() - entry');

  return function (dispatch) {

    debug('inside function - dispatch', dispatch);

    //dispatch(requestPositions); // todo: make the UI update when the positions are being requested for the first time

// <td>{moment(row.date).format('D MMM YYYY h:mm:ss')}</td>
//                 <td><span className={row.direction}>{row.direction}</span></td>
//                 <td>{row.ccyCpl}</td>
//                 <td>{row.notional}</td>
//                 <td>{row.rate}</td>
//                 <td><StreamingValue notional={row.notional} 
//                                     direction={row.direction} 
//                                     rate={row.rate} 
//                                     ccyCpl={row.ccyCpl} /></td>
//                 <td>{row.status}</td>

    // let position = {
    //   date: new Date(),
    //   ccyCpl: 'EURUSD',
    //   direction: 'buy',
    //   notional: 50000,
    //   rate: 1.234,
    //   status: 'done'
    // };

    // return dispatch(receivePosition(position));

    return positions.subscribe(position => {

      debug('position', position);

      return dispatch(receivePosition(position));
    })

    // return positions.subscribe(position => {
    //   return dispatch(receivePosition(position));
    // });
  };
}