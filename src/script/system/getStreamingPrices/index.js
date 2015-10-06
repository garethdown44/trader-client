const config = require('../../config');

// it seems you have to do it in this roundabout way to get
// browserify to include the files
//
// doing:
//   require('./' + config.streamingPrices);
// does not work

if (config.streamingPrices == 'server') {
  module.exports = require('./server');
} else if (config.streamingPrices == 'fake') {
  module.exports = require('./fake');
}