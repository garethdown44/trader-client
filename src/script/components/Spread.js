import React from 'react'

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

    let upStyle = this.state.direction == 'up' ? { visibility: 'visible' } : {visibility: 'hidden' };
    let downStyle = this.state.direction == 'down' ? { visibility: 'visible' } : {visibility: 'hidden' };

    return (<div className='spread'>
              <div className='spread-up' style={upStyle} />
              <div className='spread-value'>{this.state.spread}</div>
              <div className='spread-down' style={downStyle} />
            </div>);
  }
});