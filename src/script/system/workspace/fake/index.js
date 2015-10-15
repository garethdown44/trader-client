const Immutable = require('immutable');

const Workspace = Immutable.Record({ tiles: Immutable.List()});
const SpotTile = Immutable.Record({ type: 'spot', ccyCpl: '' });
const OptionTile = Immutable.Record({ type: 'option', price: 0, status: '', valid: true, ccyCpl: '', quoteValidForInSeconds: 10, legs: Immutable.List() });
const Leg = Immutable.Record({strike: 0, notional: 0, expiryDate: undefined, callPut: 'call', type: 'buy'});

module.exports.get = () => {

  let workspace = new Workspace();
  let tiles = Immutable.List();

  tiles = tiles.set(0, new SpotTile({ ccyCpl: 'EURUSD'}));
  tiles = tiles.set(1, new SpotTile({ ccyCpl: 'EURGBP'}));

  let optionTile = new OptionTile({ ccyCpl: 'EURUSD'})

  let legs = Immutable.List();
  legs = legs.set(0, new Leg({strike: 1.234, expiryDate: new Date(), notional: 100000}));
  legs = legs.set(1, new Leg({strike: 2.345, expiryDate: new Date(), notional: 200000}));

  optionTile = optionTile.set('legs', legs);

  tiles = tiles.set(2, optionTile);

  tiles = tiles.set(3, new SpotTile({ ccyCpl: 'AUDCHF'}));
  tiles = tiles.set(4, new SpotTile({ ccyCpl: 'GBPCHF'}));
  tiles = tiles.set(5, new SpotTile({ ccyCpl: 'AUDUSD'}));
  tiles = tiles.set(6, new SpotTile({ ccyCpl: 'EURHKD'}));

  workspace = workspace.set('tiles', tiles);

  return workspace;
}