const debug = require('debug')('trader:components:Option:optionStore');
const Reflux = require('reflux');
const optionActions = require('./optionActions');

// thinking about how to improve this pattern
//
// need to pass in props to the store, instead of it being responsible for getting
// its own data
//
option => tux.createStore(option => {

  return {
    updateStrike: function(value, legIndex) {

    },
    getInitialState: function() {

    }
  }
});

componentWillMount: function() {

  optionStore.connect(this);

  tux.connect(this); // adds listeners for updating
}

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

    this.option = {  ccyCpl: 'EURUSD',
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