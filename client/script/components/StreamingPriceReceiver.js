const debug = require('debug')('trader:StreamingPriceReceiver');
const React = require('react');
const getStreamingPrices = require('../system/getStreamingPrices');

module.exports = Child => React.createClass({

  componentDidMount: function() {
    var priceStream = getStreamingPrices(this.props.ccyCpl);

    priceStream.subscribe(p => {

      debug('price ticked: ', p);

      this.setState({bid: p.bid, ask: p.ask});
    });
  },

  getInitialState: function() {
    return { isTradeablePrice: false, bid: 0.00, ask: 0.00 };
  },

  render: function() {
    debug('render');
    debug(this.state);
    return <Child {...this.props} bid={this.state.bid} 
                                  ask={this.state.ask} />;
  }
});