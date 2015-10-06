const React = require('react');
const executeTrade = require('../system/executeTrade');
const OneWayPrice = require('./OneWayPrice');
const Spread = require('./Spread');
const debug = require('debug')('trader:components:PriceTile');

module.exports = React.createClass({

  getInitialState: function() {
    return { executing: false, notional: 1000000, firstCcy: this.props.ccyCpl.substr(0, 3), tradeable: false };
  },

  componentWillReceiveProps: function(newProps) {
    debug(newProps);
    this.setState({bid: newProps.bid, ask: newProps.ask, tradeable: newProps.tradeable});
  },

  notionalChanged: function(e) {

    let val = e.target.value;

    if (val.endsWith('m')) {
      val = parseInt(val) * 1000000;
    } else if (val.endsWith('k')) {
      val = parseInt(val) * 1000;
    }

    this.setState({notional: val});
  },

  execute: function(action, ccyCpl, rate, notional) {

    if (this.state.executing)
      return;

    this.setState({executing: true});

    executeTrade(action, ccyCpl, rate, notional, () => {
      debug(ccyCpl);
      this.setState({executing: false, bid: this.props.bid, ask: this.props.ask});
    });
  },

  render: function() {

    let nonTradeable = false;

    if (this.state.executing || !this.state.tradeable) {
      nonTradeable = true;
    }

    return (<div className='tile'>
                <div className='tile-title'>{this.props.ccyCpl}</div>

                <div>
                  <OneWayPrice side='sell'
                               price={this.state.bid}
                               execute={() => this.execute('sell', this.props.ccyCpl, this.state.bid, this.state.notional)}
                               nonTradeable={nonTradeable} />

                  <div className='spread'>
                    <Spread bid={this.state.bid} 
                            ask={this.state.ask} />
                  </div>

                  <OneWayPrice side='buy'
                               price={this.state.ask}
                               execute={() => this.execute('buy', this.props.ccyCpl, this.state.bid, this.state.notional)}
                               nonTradeable={nonTradeable} />
                </div>
                
                <div className='notional-container'>
                  <span className='notional-ccy'>{this.state.firstCcy}</span>
                  <input type="text" 
                         value={this.state.notional} 
                         onChange={this.notionalChanged}
                         className='notional' />
                </div>
            </div>);
  }
});

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};