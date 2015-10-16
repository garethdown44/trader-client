const React = require('react');

module.exports = React.createClass({

  getInitialState: function() {
    return {value: 0};
  },

  componentWillReceiveProps: function(newProps) {
    let value;
    
    if (newProps.direction == 'buy') {
      value = (newProps.bid - newProps.rate) * newProps.notional;
    } else if (newProps.direction == 'sell') {
      value = (newProps.rate - newProps.ask) * newProps.notional;
    }

    this.setState({value: value.toFixed(0)});
  },

  render: function() {

    let className = this.state.value < 0 ? 'negative' : 'positive';

    return <span className={className}>{this.state.value}</span>;
  }
});