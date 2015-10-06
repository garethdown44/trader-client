module.exports.get = callback => {

  var data = { tiles: [
    {ccyCpl: 'EURUSD'},
    {ccyCpl: 'EURGBP'},
    {ccyCpl: 'AUDCHF'},
    {ccyCpl: 'GBPCHF'},
    {ccyCpl: 'AUDUSD'},
  ]};

  callback(data);
}