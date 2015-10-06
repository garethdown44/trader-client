const io = require('socket.io-client');
const Rx = require('rx');
const config = require('../../../config');

let socket = io.connect(config.serverUrl);

const stream = Rx.Observable.create(obs => {
  socket.on('tick', function (tick) {
    obs.onNext(tick);
  });
}).publish().refCount();

module.exports = ccyCpl => {
  return stream.where(x => x.ccyCpl == ccyCpl);
};