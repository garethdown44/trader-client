const Immutable = require('immutable');

const Workspace = Immutable.Record({ tiles: Immutable.List()});
const SpotTile = Immutable.Record({ type: 'spot', ccyCpl: '' });
const OptionTile = Immutable.Record({ type: 'option', valid: true, ccyCpl: '', legs: Immutable.List() });
const Leg = Immutable.Record({strike: 0, notional: 0, expiryDate: undefined, callPut: 'call', type: 'buy'});

module.exports.get = () => {

  // var data = { 
  //   tiles: {
  //     1: {type: 'spot', ccyCpl: 'EURUSD'},
  //     2: {type: 'spot', ccyCpl: 'EURGBP'},
  //     3: {type: 'option', ccyCpl: 'EURUSD', valid: true, legs: [
  //          { direction: 'buy', notional: 20000, expiryDate: new Date(), strike: 1.234, type: 'call' },
  //          { direction: 'buy', notional: 30000, expiryDate: new Date(), strike: 2.345, type: 'put' }
  //     ]}
  //   }
  // };
  
  //   {type: 'spot', ccyCpl: 'EURUSD'},
  //   {type: 'spot', ccyCpl: 'EURGBP'},
  //   // {type: 'spot', ccyCpl: 'AUDCHF'},
  //   // {type: 'spot', ccyCpl: 'GBPCHF'},
  //   // {type: 'spot', ccyCpl: 'AUDUSD'},

  //callback(data);

  let workspace = new Workspace();
  let tiles = Immutable.List();

  tiles = tiles.set(0, new SpotTile({ ccyCpl: 'EURUSD'}));
  tiles = tiles.set(1, new SpotTile({ ccyCpl: 'EURGBP'}));

  let optionTile = new OptionTile({ ccyCpl: 'EURUSD'})

  let legs = Immutable.List();
  legs = legs.set(0, new Leg({strike: 1.234, expiryDate: new Date(), notional: 100000}));
  legs = legs.set(1, new Leg({strike: 2.345, expiryDate: new Date(), notional: 100000}));

  optionTile = optionTile.set('legs', legs);

  tiles = tiles.set(2, optionTile);

  workspace = workspace.set('tiles', tiles);

  return workspace;
}