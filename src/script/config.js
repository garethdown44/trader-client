let config = {};

if (window.location.href.indexOf('herokuapp') != -1)
  config.streamingPriceUrl = 'http://trader-server.herokuapp.com'; 
else
  config.streamingPriceUrl = 'http://localhost:8080';

config.streamingPrices = 'server'; // (server,fake,oanda)

module.exports = config;