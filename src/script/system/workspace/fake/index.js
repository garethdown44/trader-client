module.exports.get = () => {

  var data = { 
    tiles: {
      1: {type: 'spot', ccyCpl: 'EURUSD'},
      2: {type: 'spot', ccyCpl: 'EURGBP'},
      3: {type: 'option', ccyCpl: 'EURUSD', valid: true, legs: [
           { direction: 'buy', notional: 20000, expiryDate: new Date(), strike: 1.234, type: 'call' },
           { direction: 'buy', notional: 30000, expiryDate: new Date(), strike: 2.345, type: 'put' }
      ]}
    }
  };
  
  //   {type: 'spot', ccyCpl: 'EURUSD'},
  //   {type: 'spot', ccyCpl: 'EURGBP'},
  //   // {type: 'spot', ccyCpl: 'AUDCHF'},
  //   // {type: 'spot', ccyCpl: 'GBPCHF'},
  //   // {type: 'spot', ccyCpl: 'AUDUSD'},

  //callback(data);

  return data;
}