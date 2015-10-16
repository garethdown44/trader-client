import Immutable from 'immutable';

export const Workspace = Immutable.Record({ tiles: Immutable.List()});
export const SpotTile = Immutable.Record({ type: 'spot', ccyCpl: '' });
export const OptionTile = Immutable.Record({ type: 'option', price: 0, status: '', valid: true, ccyCpl: '', quoteValidForInSeconds: 10, legs: Immutable.List() });
export const Leg = Immutable.Record({strike: 0, notional: 0, expiryDate: undefined, callPut: 'call', type: 'buy'});