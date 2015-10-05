const Rx = require('rx');

//const url2 = "http://stream-sandbox.oanda.com/v1/prices?accountId=12345&instruments=EUR_GBP";

var getStream = ccyCpl => Rx.Observable.create(obs => {

  const url1 = "http://stream-sandbox.oanda.com/v1/prices?accountId=12345&instruments=EUR_USD";

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url1, true)

  xhr.onprogress = function () {
    // console.log('********');
    // console.log("PROGRESS:", xhr);
    // console.log("PROGRESS:", xhr.response);

    let text = xhr.responseText;

    let start = text.lastIndexOf('{"tick"');

    if (start != -1) {
      let length = text.length;

      let end = length - start;

      text = text.substr(start, end);

      if (text.indexOf('heartbeat') > -1) {
        return;
      }

      console.log(text);

      try {
        let obj = JSON.parse(text);  
        obs.onNext(obj.tick);
      } catch (e) {
        
      }
    }
  }

  xhr.send();

});

module.exports = getStream;