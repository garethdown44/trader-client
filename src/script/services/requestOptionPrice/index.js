const $ = require('jquery');
const config = require('../../config');

let url = config.serverUrl + '/options/price';

export default function(option, success, error) {

  var payload = JSON.stringify(option);

  $.ajax({
    type: 'POST',
    url: url,
    data: payload,
    success: success,
    error: error,
    contentType: 'application/json'
  });
}