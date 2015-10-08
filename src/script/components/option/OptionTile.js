const debug = require('debug')('trader:components:OptionTile');
const React = require('react');

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

const WithValidation = (Child, validateFn) => React.createClass({

  onChange: function(e) {
    if (validateFn(e.target.value)) {
      this.setState({value:e.target.value, valid: true });
      this.props.isValidChanged(true);
    } else {
      this.setState({value:e.target.value, valid: false });
      this.props.isValidChanged(false);
    }
  },

  render: function() {
    return <Child onChange={this.onChange} />;
  }
});

const StrikePriceTextBox = React.createClass({

  getInitialState:function() {
    return {value: 0};
  },

  componentDidMount: function() {
    this.setState({value: this.props.value});
  },

  valueChanged: function(e) {
    this.setState({value: e.target.value});
  },

  render: function() {
    return <input type='text' value={this.state.value} onChange={this.valueChanged} />
  }
});

const ValidatedStrikePrice = WithValidation(StrikePriceTextBox, val => val < 2);

const OptionLeg = React.createClass({

  render: function() {

    debug(this.props);

    return (<div className='leg'>
              <TwoChoice first='buy' second='sell' selected='buy' />
              <NotionalTextBox value={this.props.notional} />
              <DateChooser className='expiryDate' value={this.props.expiryDate} />
              <ValidatedStrikePrice className='strike' value={this.props.strike} isValidChanged={this.props.strikePriceInvalid} />
              <TwoChoice first='call' second='put' selected='call' />
            </div>);
  }
});

// TODO: if a strike is invalid, the leg is invalid, then the price button is disabled

const Button = React.createClass({
  render: function() {

    let classNames = 'button';
    if (!this.props.valid) {
      classNames += ' invalid';
    }

    return <div className={classNames}>{this.props.text}</div>;
  }
});

// validates and returns the option with validation fields populated
const validateOption = function(option) {
  for (let leg in option.legs) {
    if (leg.strike > 2) {
      option.valid = false;
      leg.strike.valid = false;
    }
  }

  return option;
};

module.exports = React.createClass({

  getInitialState: function() {
    return {legs: [], valid: true};
  },

  componentDidMount: function() {

    debug('props', this.props);

    this.setState({legs: this.props.legs});
  },

  strikePriceInvalid: function() {
    this.setState({valid: false});
  },

  renderLegs: function(legs) {
    return legs.map(leg => {
        return <OptionLeg {...leg} 
                  strikePriceInvalid={this.strikePriceInvalid} />;
      });
  },

  render: function() {
    let legs = this.renderLegs(this.state.legs);

    return <div className='tile option-tile'>
              <div className='tile-title'>{this.props.ccyCpl}</div>
              <span>{this.props.ccyCpl}</span>
              <div>{legs}</div>
              <Button valid={this.state.valid} text='PRICE' />
            </div>;
  }

});