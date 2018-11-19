let config = {};

if (window.location.href.indexOf('localhost') != -1) {
  config.serverUrl = 'http://localhost:8081';
  config.contextPath = '';
  // config.serverUrl = 'http://13.80.245.163';
  // config.contextPath = 'server'
}  
else {
  config.serverUrl = 'http://13.80.245.163';
  config.contextPath = 'server';
}

config.streamingPrices = 'server'; // or fake
config.upUrl = `${config.serverUrl}/${config.contextPath}/up`;

module.exports = config;