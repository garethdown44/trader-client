var DDP = require("ddp.js");
var options = {
    endpoint: "ws://localhost:5000/websocket",
    SocketConstructor: WebSocket
};

var ddp = new DDP(options);

ddp.on("connected", function () {
    console.log("Connected");
});

module.exports.subscribe = function(collection, params, added, changed) {

  var subId = ddp.sub(collection, params);
  ddp.on("ready", function (message) {
    if (message.id === subId) {
      console.log("mySubscription ready");
    }
  });

  ddp.on("added", function(obj) {
    if (obj.collection == collection) {
      added(obj);
    }
  });

  ddp.on("changed", function(obj) {
    if (obj.collection == collection) {
      changed(obj);
    }
  });
};