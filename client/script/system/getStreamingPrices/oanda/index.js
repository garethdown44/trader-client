const Rx = require('rx');
const debug = require('debug')('trader:streamingprices:oanda');

let streams = {};

module.exports = ccyCpl => {

  return createStream(ccyCpl).publish().refCount();

};

const createStream = ccyCpl => Rx.Observable.create(obs => {

  debug(`createStream(${ccyCpl}) - entry`);

  const ccyParts = splitAt(ccyCpl, 3);

  const formattedCcyCpl = `${ccyParts[0]}_${ccyParts[1]}`; 

  debug('formattedCcyCpl: ' + formattedCcyCpl);

  const url1 = `http://stream-sandbox.oanda.com/v1/prices?accountId=12345&instruments=${formattedCcyCpl}`;

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url1, true)

  xhr.onprogress = function () {

    let text = xhr.responseText;

    let start = text.lastIndexOf('{"tick"');

    if (start != -1) {
      let length = text.length;

      let end = length - start;

      text = text.substr(start, end);

      if (text.indexOf('heartbeat') > -1) {
        return;
      }

      debug('unparsed tick: ' + text);

      try {
        let obj = JSON.parse(text);  

        debug('parsed tick: ' + obj);
        obs.onNext(obj.tick);
      } catch (e) {
        
      }
    }
  }

  xhr.send();

});

function splitAt(value, index) {
    return [value.substr(0, index), value.substr(index)];
}