const debug = require('debug')('trader:StreamingPriceReceiver');
import React from 'react'
import getStreamingPrices from '../services/getStreamingPrices'

export default Child => React.createClass({

  componentDidMount: function() {
    var priceStream = getStreamingPrices(this.props.ccyCpl);

    this.subscription = priceStream.subscribe(p => {
      this.setState({bid: p.bid, ask: p.ask, tradeable: true});
    });
  },

  componentWillUnmount: function() {
    this.subscription.dispose();
  },

  getInitialState: function() {
    return { tradeable: false, bid: 0.00, ask: 0.00 };
  },

  render: function() {
    return <Child {...this.props} bid={this.state.bid} 
                                  ask={this.state.ask}
                                  tradeable={this.state.tradeable} />;
  }
});