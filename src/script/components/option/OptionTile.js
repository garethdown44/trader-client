const debug = require('debug')('trader:components:option');
import React from 'react';
import {updateStrike, updateNotional, priceOption, quoteTimedOut} from '../../actions/options';
import OptionLeg from './OptionLeg';
import Button from './Button';
import Countdown from './Countdown';

require('./option.styl');

export function PricingSection(props) {

  debug(props);

  let { valid, status, price, ccyCpl, handlePrice, buy, sell, quoteValidForInSeconds, secondsRemaining } = props;

  switch (status) {
    case 'PRICEABLE':
      return <Button className='btn-info' valid={true} text='PRICE' onClick={handlePrice} />;

    case 'INVALID':
      return <Button valid={false} text='INVALID' />;

    case 'PRICING':
      return <div>Please wait...</div>;

    case 'PRICED':
      let formattedPrice = price.toFixed(2);
      let price = `${ccyCpl.substr(0, 3)} ${formattedPrice}`;

      return  <div>
                 <Countdown secondsRemaining={secondsRemaining} />
                 <Button className='btn-success' valid={true} text={'BUY - you pay ' + price} onClick={buy} />
                 <Button className='btn-info' valid={true} text={'SELL - we pay ' + price} onClick={sell} />
              </div>;

    default:
      return <div>unknown status: {status}</div>;
  }
}

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

    return <div className='panel panel-primary tile option-tile'>
              <div className='panel-heading heading'>OPTION: {this.props.ccyCpl}</div>
              <div className='panel-body tile-body'>
                <div>{legs}</div>

                <PricingSection {...this.props} 
                                handlePrice={this.handlePrice}
                                buy={this.buy}
                                sell={this.sell} />
              </div>
            </div>;
  }
});