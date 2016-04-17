import React from 'react'
import OneWayPrice from './OneWayPrice'
import Spread from './Spread'
import getStreamingPrices from '../services/getStreamingPrices'

var PriceAndSpread = React.createClass({

  getInitialState: function() {
    return {
      bid: 0,
      ask: 0,
      nonTradeable: true
    }
  },

  componentDidMount: function() {

    let onNewPrice = p => {
      let state = {
        nonTradeable: p.nonTradeable,
        bid: p.bid,
        ask: p.ask
      }

      this.setState(state);
    }

    this.subscription = getStreamingPrices(this.props.ccyCpl).subscribe(onNewPrice);
  },

  render: function() {
    return  <div>
              <OneWayPrice side='sell'
                           price={this.state.bid}
                           execute={() => this.props.execute('sell', this.state.bid)}
                           nonTradeable={this.state.nonTradeable}
                           executing={this.props.executing} />

              <div className='spread'>
                <Spread bid={this.state.bid} 
                        ask={this.state.ask} />
              </div>

              <OneWayPrice side='buy'
                           price={this.state.ask}
                           execute={() => this.props.execute('buy', this.state.ask)}
                           nonTradeable={this.state.nonTradeable}
                           executing={this.props.executing} />
            </div>;
  }
});

module.exports = PriceAndSpread;