let config = {};

if (window.location.href.indexOf('localhost') != -1)
  config.serverUrl = 'http://localhost:8081';
else
  config.serverUrl = 'http://trader-server.herokuapp.com'; 

config.streamingPrices = 'server'; // (server,fake,oanda)

module.exports = config;