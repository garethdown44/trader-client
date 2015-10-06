const io = require('socket.io-client');
const Rx = require('rx');

let socket = io.connect('http://localhost:8080/');

const stream = Rx.Observable.create(obs => {
  socket.on('tick', function (tick) {
    obs.onNext(tick);
  });
}).publish().refCount();

module.exports = ccyCpl => {
  return stream.where(x => x.ccyCpl == ccyCpl);
};