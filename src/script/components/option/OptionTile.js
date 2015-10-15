const debug = require('debug')('trader:components:option');
const React = require('react');
import {connect} from 'react-redux';
import {updateStrike, updateNotional, priceOption, quoteTimedOut} from '../../system/redux/actions';

const TwoChoice = React.createClass({
  render: function() {
    return (<select ><option>{this.props.first}</option><option>{this.props.second}</option></select>);
  }
});

const NotionalTextBox = React.createClass({
  render: function() {
    return (<input type='text' value={this.props.value} onChange={this.props.onChange} />);
  }
});

const DateChooser = React.createClass({
  render: function() {
    return (<input type='text' value={this.props.value} onChange={this.props.onChange} />);
  }
});

const StrikePriceTextBox = React.createClass({
  render: function() {
    return <input type='text' 
                  value={this.props.value} 
                  onChange={this.props.onChange} />
  }
});

const OptionLeg = React.createClass({

  render: function() {

    return (<div className='leg'>
              <TwoChoice first='buy' second='sell' selected='buy' />
              <NotionalTextBox value={this.props.notional} onChange={this.props.handleNotionalChange} />
              <DateChooser className='expiryDate' value={this.props.expiryDate} onChange={this.props.handleExpiryDateChange} />
              <StrikePriceTextBox className='strike' value={this.props.strike} onChange={this.props.handleStrikeChange} key='43' />
              <TwoChoice first='call' second='put' selected='call' />
            </div>);
  }
});

const Button = React.createClass({

  shouldComponentUpdate: function() {
    return true;
  },

  render: function() {

    let classNames = 'button';
    if (!this.props.valid) {
      classNames += ' invalid';
    }

    return <div {...this.props} className={classNames}>{this.props.text}</div>;
  }
});

const Countdown = React.createClass({

  getInitialState: function() {

  },

  tick: function() {

  },

  render: function() {
  }
});

module.exports = React.createClass({

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

  startTimer: function(from) {
    this.count = from;

    setInterval(this.tick, 1000);
  },

  tick: function() {
    this.count--;

    if (this.count == 0) {
      //this.setState({quoteTimedOut: true});

      this.props.dispatch(quoteTimedOut(this.props.tileId));

    } else {
      this.setState({count: this.count});  
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.status == 'IS_PRICED') {
      this.setState({count: 10});
      this.startTimer(10);
    }
  },

  getInitialState: function() {
    return {quoteTimedOut: false};
  },

  render: function() {

    let legs = this.renderLegs(this.props.legs);

    debug('OptionTile.render(), props', this.props);

    let canPrice = this.props.valid || this.props.status != 'IS_PRICING';
    let buttons;

    if (!this.props.status || this.state.quoteTimedOut) {
      buttons = <Button valid={canPrice} text='PRICE' onClick={this.handlePrice} />;
    } else if (this.props.status == 'IS_PRICED') {

      let formattedPrice = this.props.price.toFixed(2);
      let price = `${this.props.ccyCpl.substr(0, 3)} ${formattedPrice}`;

      buttons = (<div>
                   <Button valid={true} text={'BUY - you pay ' + price} onClick={this.buy} style={{float: 'left'}} />
                   <Button valid={true} text={'SELL - we pay ' + price} onClick={this.sell} style={{float: 'left', marginLeft: '10px'}} />

                   <div>quote is valid for {this.state.count} seconds</div>
                 </div>);

    }

    return <div className='tile option-tile'>
              <div className='tile-title'>{this.props.ccyCpl}</div>
              <div>{legs}</div>
              {buttons}
            </div>;
  }
});