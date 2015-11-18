const debug = require('debug')('trader:server:executeTrade');
const $ = require('jquery');
const config = require('../../../config');

let url = config.serverUrl + '/trades/execute';

module.exports = (action, ccyCpl, rate, notional, success, error) => {

  let payload = {
    action: action,
    ccyCpl: ccyCpl,
    rate: rate,
    notional: notional
  };

  payload = JSON.stringify(payload);

  let successWrapper = () => {
    debug('success');
    success();
  };

  let errorWrapper = (xhr, status) => {
    debug('error');
    debug(xhr);
    debug(status);

    error();
  };

  debug('POST:', url, payload);

  $.ajax({
    type: 'POST',
    url: url,
    data: payload,
    success: successWrapper,
    error: errorWrapper,
    contentType: 'application/json'
  });
};