import { UPDATE_STRIKE, 
         UPDATE_NOTIONAL, 
         PRICE_OPTION, 
         OPTION_PRICE_REQUESTED, 
         OPTION_PRICE_RECEIVED,
         QUOTE_TIMED_OUT } from '../actions/options'

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

export default function option(state = {}, action) {

  state = state.set('valid', true);
  let legs = state.get('legs');

  switch (action.type) {

    case UPDATE_STRIKE:

      state = state.set('valid', action.value < 3);

    case UPDATE_NOTIONAL:
      let leg = legs.get(action.legIndex);

      leg = legfn(leg, action);

      legs = legs.set(action.legIndex, leg);
      state = state.set('legs', legs);
      break;

    case OPTION_PRICE_REQUESTED:
      state = state.set('status', 'IS_PRICING');
      break;

    case OPTION_PRICE_RECEIVED:
      state = state.set('status', 'IS_PRICED');
      state = state.set('price', action.option.price);
      state = state.set('quoteValidForInSeconds', 12); // arbitrary
      break;

    case QUOTE_TIMED_OUT:
      state = state.set('status', '');
  }

  return state;
}