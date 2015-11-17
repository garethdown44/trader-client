const React = require('react');
const executeTrade = require('../system/executeTrade');
const OneWayPrice = require('./OneWayPrice');
const Spread = require('./Spread');
const debug = require('debug')('trader:components:PriceTile');
import {removeTile} from '../system/redux/actions/workspace';
import PriceAndSpread from './PriceAndSpread';

var PriceTile = React.createClass({

  getInitialState: function() {
    return { executing: false, notional: 1000000, tradeable: false };
  },

  componentWillReceiveProps: function(newProps) {

    if (newProps.bid != this.state.bid) {
      this.setState({bid: newProps.bid, ask: newProps.ask, tradeable: newProps.tradeable});
    }
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

  shouldComponentUpdate: function(nextProps, nextState) {
    return nextProps.bid != this.state.bid;
  },

  execute: function(direction, ccyCpl, rate, notional) {

    if (this.state.executing)
      return;

    this.setState({executing: true});

    executeTrade(direction, ccyCpl, rate, notional, () => {
      debug(ccyCpl);
      this.setState({executing: false, bid: this.props.bid, ask: this.props.ask});
    });

    // todo...
    //this.props.dispatch(executeTrade(tileId, direction, ccyCpl, rate, notional));
  },

  remove: function(tileId) {
    this.props.dispatch(removeTile(tileId));
  },

  render: function() {

    let nonTradeable = false;

    let firstCcy = '';
    if (this.props.ccyCpl) {
      let firstCcy = this.props.ccyCpl.substr(0, 3);
    } 

    if (this.state.executing || !this.state.tradeable) {
      nonTradeable = true;
    }

    return (<div className='tile'>
                <div className='tile-title'>{this.props.ccyCpl}</div>
                {/*<button onClick={() => this.remove(this.props.tileId)}>x</button>*/}

                <PriceAndSpread ccyCpl={this.props.ccyCpl} />
                
                <div className='notional-container'>
                  <span className='notional-ccy'>{firstCcy}</span>
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

module.exports = PriceTile;