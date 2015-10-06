const debug = require('debug')('trader:server:executeTrade');
const $ = require('jquery');

module.exports = (action, ccyCpl, rate, notional, success, error) => {

  let payload = {
    ccyCpl: ccyCpl,
    action: action,
    notional: notional,
    rate: rate
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

  let url = config.serverUrl + '/trades/execute';

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