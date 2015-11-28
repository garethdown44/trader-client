import React from 'react'
import Rx from 'rx'

export default React.createClass({

  componentDidMount: function() {
    this.startTimer(this.props.from);
  },

  getInitialState: function() {
    return { count: this.props.from };
  },

  componentWillUnmount: function() {
    this.subscription.dispose();
  },

  startTimer: function(from) {
    this.count = from;
    this.subscription = Rx.Observable.interval(1000).subscribe(this.tick);
  },

  tick: function() {
    this.count--;

    if (this.count > -1) {
      this.setState({count: this.count});
    }
  },

  render: function() {
    return <div>quote is valid for {this.state.count} seconds</div>
  }
});