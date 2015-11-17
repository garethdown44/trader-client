import React from 'react'
import OneWayPrice from './OneWayPrice'
import Spread from './Spread'
import getStreamingPrices from '../system/getStreamingPrices'

var PriceAndSpread = React.createClass({

  getInitialState: function() {
    return {
      bid: 0,
      ask: 0,
      nonTradeable: true
    }
  },

  componentDidMount: function() {

    this.subscription = getStreamingPrices(this.props.ccyCpl).subscribe(p => {
      
      let state = {
        nonTradeable: p.nonTradeable,
        bid: p.bid,
        ask: p.ask
      }

      this.setState(state);
    }.bind(this));
  },

  render: function() {
    return  <div>
              <OneWayPrice side='sell'
                           price={this.state.bid}
                           execute={() => this.execute('sell', this.props.ccyCpl, this.state.bid, this.state.notional)}
                           nonTradeable={this.state.nonTradeable} />

              <div className='spread'>
                <Spread bid={this.state.bid} 
                        ask={this.state.ask} />
              </div>

              <OneWayPrice side='buy'
                           price={this.state.ask}
                           execute={() => this.execute('buy', this.props.ccyCpl, this.state.bid, this.state.notional)}
                           nonTradeable={this.state.nonTradeable} />
            </div>;
  }
});

module.exports = PriceAndSpread;