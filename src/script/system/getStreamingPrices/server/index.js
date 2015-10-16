const io = require('socket.io-client');
const Rx = require('rx');
const config = require('../../../config');

let stream;

module.exports = ccyCpl => {

  if (!stream) {
    let socket = io.connect(config.serverUrl);
    stream = Rx.Observable.create(obs => {
      socket.on('tick', function (tick) {
        obs.onNext(tick);
      });
    }).publish().refCount();
  }

  return stream.where(x => x.ccyCpl == ccyCpl);
};