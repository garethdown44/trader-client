const debug = require('debug')('trader:components:option');
const React = require('react');
import {connect} from 'react-redux';
import {updateStrike} from '../../system/redux/actions';

const TwoChoice = React.createClass({
  render: function() {
    return (<select><option>{this.props.first}</option><option>{this.props.second}</option></select>);
  }
});

const NotionalTextBox = React.createClass({
  render: function() {
    return (<input type='text' value={this.props.value} />);
  }
});

const DateChooser = React.createClass({
  render: function() {
    return (<input type='text' value={this.props.value} />);
  }
});

const StrikePriceTextBox = React.createClass({

  // shouldComponentUpdate: function(nextProps, nextState) {
  //   return nextProps.value != this.props.value;
  // },

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
              {/*<NotionalTextBox value={this.props.notional} />*/}
              {/*<DateChooser className='expiryDate' value={this.props.expiryDate} />*/}
              <StrikePriceTextBox className='strike' value={this.props.strike} onChange={this.props.handleStrikeChange} key='43' />
              <TwoChoice first='call' second='put' selected='call' />
            </div>);
  }
});

let select = tileId => state => {
  return state;
}

const Button = React.createClass({

  shouldComponentUpdate: function() {
    return true;
  },

  render: function() {

    let classNames = 'button';
    if (!this.props.valid) {
      classNames += ' invalid';
    }

    return <div className={classNames}>{this.props.text}</div>;
  }
});

module.exports = React.createClass({

  handleStrikeChange: function(value, legIndex) {
    this.props.dispatch(updateStrike(value, this.props.tileId, legIndex));
  },

  renderLegs: function(legs) {
    return legs.map((leg, index) => {
        debug('index', index);
        return <OptionLeg strike={this.props.strike} key={index} handleStrikeChange={e => this.handleStrikeChange(e.target.value, index)} />;
      });
  },

  render: function() {

    let legs = this.renderLegs(this.props.legs);

    debug('OptionTile.render(), props', this.props);

    return <div className='tile option-tile'>
              <div className='tile-title'>{this.props.ccyCpl}</div>
              <span>{this.props.ccyCpl}</span>
              <div>{legs}</div>
              <Button valid={this.props.valid} text='PRICE' />
            </div>;
  }
});