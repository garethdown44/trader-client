const debug = require('debug')('trader:components:PriceTile');
import React from 'react';
import OneWayPrice from './OneWayPrice';
import Spread from './Spread';
import {removeTile} from '../actions/workspace';
import {bookSpotTrade} from '../actions/spot';
import PriceAndSpread from './PriceAndSpread';

var PriceTile = React.createClass({

  getInitialState: function() {
    return { notional: 1000000 };
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

  execute: function(direction, rate) {
    this.props.dispatch(bookSpotTrade(this.props.tileId, direction, this.props.ccyCpl, rate, this.state.notional));
  },

  remove: function(tileId) {
    this.props.dispatch(removeTile(tileId));
  },

  render: function() {

    let firstCcy = '';
    if (this.props.ccyCpl) {
      firstCcy = this.props.ccyCpl.substr(0, 3);
    } 

    return (<div className="panel panel-primary tile">
              <div className="panel-heading heading">{this.props.ccyCpl}</div>
              <div className="panel-body tile-body">
                <PriceAndSpread ccyCpl={this.props.ccyCpl} 
                                execute={this.execute} 
                                executing={this.props.executing} />

                <div className='notional-container'>

                  <span className='notional-ccy'>{firstCcy}</span>
                  <input type="text" 
                         value={this.state.notional} 
                         onChange={this.notionalChanged}
                         className='notional' />
                </div>
              </div>
            </div>);
  }
});

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

module.exports = PriceTile;