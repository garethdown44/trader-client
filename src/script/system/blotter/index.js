const io = require('socket.io-client');
const Rx = require('rx');
const config = require('../../config');

let socket = io.connect(config.serverUrl);

const stream = Rx.Observable.create(obs => {
  socket.on('position', function (position) {
    obs.onNext(position);
  });
}).publish().refCount();

module.exports = stream;