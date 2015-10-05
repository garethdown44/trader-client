const React = require('react');
const getStreamingPrices = require('../system/getStreamingPrices');

module.exports = Child => React.createClass({

  componentDidMount: function() {
    var priceStream = getStreamingPrices('EURUSD');

    priceStream.subscribe(p => {
      this.setState({bid: p.bid, offer: p.ask});
    });
  },

  getInitialState: function() {
    return { isTradeablePrice: false };
  },

  render: function() {
    return <Child {...this.props} bid={this.state.bid} 
                                  offer={this.state.offer} />;
  }
});