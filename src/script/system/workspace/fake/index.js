module.exports.get = () => {

  var data = { tiles: [
    {type: 'spot', ccyCpl: 'EURUSD'},
    {type: 'spot', ccyCpl: 'EURGBP'},
    // {type: 'spot', ccyCpl: 'AUDCHF'},
    // {type: 'spot', ccyCpl: 'GBPCHF'},
    // {type: 'spot', ccyCpl: 'AUDUSD'},

    // {type: 'option', data: {
    //     ccyCpl: 'EURUSD',
    //     legs: [ 
    //         { direction: 'buy', notional: 20000, expiryDate: new Date(), strike: 1.234, type: 'call' }, 
    //         { direction: 'buy', notional: 30000, expiryDate: new Date(), strike: 2.345, type: 'put' }
    //           ]
    //       } 
    //   }
  ]};

  //callback(data);

  return data;
}