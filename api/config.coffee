_ = require('lodash')
module.exports = _.extend(require('./config/env/all'), require('./config/env/' + process.env.NODE_ENV + '.json') or {})
