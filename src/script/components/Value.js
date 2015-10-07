const React = require('react');

module.exports = React.createClass({

  getInitialState: function() {
    return {value: 0};
  },

  componentWillReceiveProps: function(newProps) {
    let value;
    let valueAtTimeOfTrade = newProps.rate * newProps.notional;
    let valueNow = newProps.bid * newProps.notional;

    if (newProps.direction == 'buy') {
      value = valueNow - valueAtTimeOfTrade;
    } else if (newProps.direction == 'sell') {
      value = valueAtTimeOfTrade - valueNow;
    }

    this.setState({value: value.toFixed(0)});
  },

  render: function() {

    let className = this.state.value < 0 ? 'negative' : 'positive';

    return <span className={className}>{this.state.value}</span>;
  }
});