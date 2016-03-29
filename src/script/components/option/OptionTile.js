const debug = require('debug')('trader:components:option');
import React from 'react';
import {updateStrike, updateNotional, priceOption, quoteTimedOut} from '../../system/redux/actions/options';
import OptionLeg from './OptionLeg';
import Button from './Button';
import Countdown from './Countdown';

require('./option.styl');

export default React.createClass({

  handleStrikeChange: function(value, legIndex) {
    this.props.dispatch(updateStrike(value, this.props.tileId, legIndex));
  },

  handleNotionalChange: function(value, legIndex) {
    this.props.dispatch(updateNotional(value, this.props.tileId, legIndex));
  },

  handlePrice: function() {
    this.props.dispatch(priceOption(this.props.tileId, this.props));
  },

  handleExpiryDateChange: function() {
    // noop at the moment
  },

  renderLegs: function(legs) {
    return legs.map((leg, index) => {
        debug('index', index);
        return <OptionLeg {...leg}
                          key={index}
                          handleStrikeChange={e => this.handleStrikeChange(e.target.value, index)}
                          handleNotionalChange={e => this.handleNotionalChange(e.target.value, index)}
                          handleExpiryDateChange={e => this.handleExpiryDateChange(e.target.value, index)} />;
      });
  },

  render: function() {

    let legs = this.renderLegs(this.props.legs);

    debug('OptionTile.render(), props', this.props);

    let canPrice = this.props.valid && this.props.status != 'IS_PRICING';
    let buttons;

    if (!this.props.status) {
      buttons = <Button valid={canPrice} text='PRICE' onClick={this.handlePrice} />;
    } else if (this.props.status == 'IS_PRICED') {

      let formattedPrice = this.props.price.toFixed(2);
      let price = `${this.props.ccyCpl.substr(0, 3)} ${formattedPrice}`;

      buttons = (<div>
                   <Button valid={true} text={'BUY - you pay ' + price} onClick={this.buy} style={{float: 'left'}} />
                   <Button valid={true} text={'SELL - we pay ' + price} onClick={this.sell} style={{float: 'left', marginLeft: '10px'}} />

                   <Countdown from={this.props.quoteValidForInSeconds} />
                   
                 </div>);
    }

    return <div className='panel panel-primary new-tile option-tile'>
              <div className='panel-heading heading'>OPTION: {this.props.ccyCpl}</div>
              <div className='panel-body tile-body'>
                <div>{legs}</div>
                {buttons}
              </div>
            </div>;
  }
});