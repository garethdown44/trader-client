const Rx = require('rx');
const rand = (min, max) => Math.random() * (max - min) + min

module.exports = ccyCpl => Rx.Observable
                   .interval(500)
                   .select(_ => {
                      let x = rand(1, 4)
                      let y = Math.random();

                      return {bid: x, offer: y};
                   });