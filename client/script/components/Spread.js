const React = require('react');

module.exports = React.createClass({

  getInitialState: function() {
    return {direction: 'neutral', spread: 0};
  },

  componentWillReceiveProps: function(newProps) {

    let spread = (newProps.ask - newProps.bid);
    spread = (spread * 1000).toFixed(2);

    let direction = newProps.ask > this.props.ask ? 'up' : 'down';

    this.setState({spread: spread, direction: direction });
  },

  render: function() {
    return (<div className={'spread ' + this.state.direction}>{this.state.spread}</div>);
  }
});