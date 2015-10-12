const debug = require('debug')('trader:components:Option:optionStore');
const Reflux = require('reflux');
const optionActions = require('./optionActions');

module.exports = Reflux.createStore({

  listenables: [optionActions],

  onUpdateStrike: function(value, legIndex) {

    let option = this.option;

    debug('onUpdateStrike', legIndex, value);

    option.legs[legIndex].value = value;

    if (value > 3) {
      debug('value greater than 3');
      option.valid = false;
    } else {
      option.valid = true;
    }

    debug('beforetrigger', option);

    this.trigger(option);
  },

  getInitialState: function() {

    debug('getInitialState()');

    this.option = { ccyCpl: 'EURUSD',
              legs: [
                {
                  strike: 1.234
                },
                {
                  strike: 2.345
                }
              ],

              canPrice: true,
              valid: true
            };

    return this.option;
  }
});