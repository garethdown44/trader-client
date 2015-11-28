import React from 'react';
import TwoChoice from './TwoChoice';
import NotionalTextBox from './NotionalTextBox';
import DateChooser from './DateChooser';
import StrikePriceTextBox from './StrikePriceTextBox';

export default React.createClass({

  render: function() {

    return (<div className='leg'>
              <TwoChoice first='buy' second='sell' selected='buy' style={{ width: '44px' }} />
              <NotionalTextBox value={this.props.notional} onChange={this.props.handleNotionalChange} />
              <DateChooser className='expiryDate' value={this.props.expiryDate} onChange={this.props.handleExpiryDateChange} />
              <StrikePriceTextBox className='strike' value={this.props.strike} onChange={this.props.handleStrikeChange} key='43' />
              <TwoChoice first='call' second='put' selected='call' style={{ width: '44px' }} />
            </div>);
  }
});