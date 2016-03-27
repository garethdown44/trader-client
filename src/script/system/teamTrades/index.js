const io = require('socket.io-client');
const Rx = require('rx');
const config = require('../../config');

let socket = io.connect(config.serverUrl);

export default Rx.Observable.create(obs => {
  socket.on('teamTrade', function (trade) {
    obs.onNext(trade);
  });
}).publish().refCount();