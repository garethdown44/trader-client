require('../styles/loading.scss');
require('../styles/main.css');

var config = require('./config');

$(function() {

  $('#cont').html(' <div id="loading"> \
                      <div id="heading">reacttrader</div> \
                      <div class="spinner"> \
                        <div class="rect1"></div> \
                        <div class="rect2"></div> \
                        <div class="rect3"></div> \
                        <div class="rect4"></div> \
                      </div> \
                      <div id="server"></div>\
                      <div id="js"></div>\
                   </div>');

  // both: require main.js, get /up
  // when both complete, then render main component

  $('#js').text('loading resources...');
  $('#server').text('connecting to server...');

  $.get(config.upUrl, function(data) {

    $('#server').text('connected.');

    require.ensure(['./main'], function(require) {

      let Main = require('./main').default;

      const React = require('react');
      const render = require('react-dom').render;

      render(<Main />, document.getElementById('cont'));

    }, 'main');
  });
});