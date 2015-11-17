const React = require('react');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      first: '0.00',
      bigFigures: '00',
      tenthOfPips: '0',
      nonTradeable: true
    };
  },

  componentWillReceiveProps: function(newProps) {
    this.setState(this.extractPrice(newProps.price));
  },

  execute: function() {
    this.props.execute(this.state.price);
  },

  extractPrice: function(price) {
    let priceStr = price.toString();

    let first = priceStr.substr(0, 4);
    let bigFigures = priceStr.substr(4, 2);
    let tenthOfPips = priceStr.substr(6) || 0;

    return {
      first: first,
      bigFigures: bigFigures,
      tenthOfPips: tenthOfPips
    }
  },

  render: function() {

    let tradeable = this.props.nonTradeable ? 'non-tradeable' : '';

    let classes = 
      ['one-way-price', tradeable, this.props.side].join(' ');

    return  <div className={classes}>
              <div>{this.props.side}</div>
              <span onClick={this.execute}>
                <span>{this.state.first}</span>
                <span className='big-figures'>{this.state.bigFigures}</span>
                <span>{this.state.tenthOfPips}</span>
              </span>
            </div>;
  }
});