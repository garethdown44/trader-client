const debug = require('debug')('trader:reducers:options');

import { UPDATE_STRIKE, 
         UPDATE_NOTIONAL, 
         PRICE_OPTION, 
         OPTION_PRICE_REQUESTED, 
         OPTION_PRICE_RECEIVED,
         QUOTE_TIMED_OUT, 
         QUOTE_TIME_TICKED } from '../actions/options'

function legfn(leg, action) {
  switch (action.type) {
    case UPDATE_STRIKE:
      leg = leg.set('strike', action.value);
      break;

    case UPDATE_NOTIONAL:
      leg = leg.set('notional', action.value);
      break;
  }

  return leg;
}

export default function option(state, action) {

  let legs = state.get('legs');

  switch (action.type) {

    case UPDATE_STRIKE:

      // contrived validation for demonstation purposes
      if (action.value < 3) {
        state = state.set('status', 'PRICEABLE');
      } else {
        state = state.set('status', 'INVALID');
      }
      
    case UPDATE_NOTIONAL:
      let leg = legs.get(action.legIndex);

      leg = legfn(leg, action);

      legs = legs.set(action.legIndex, leg);
      state = state.set('legs', legs);
      break;

    case OPTION_PRICE_REQUESTED:
      state = state.set('status', 'PRICING');
      break;

    case OPTION_PRICE_RECEIVED:
      state = state.set('status', 'PRICED');
      state = state.set('price', action.option.price);
      state = state.set('secondsRemaining', 10); // arbitrary
      break;

    case QUOTE_TIMED_OUT:
      state = state.set('status', 'PRICEABLE');
      break;

    case QUOTE_TIME_TICKED:
      state = state.set('secondsRemaining', action.secondsRemaining);
      break;
  }

  return state;
}