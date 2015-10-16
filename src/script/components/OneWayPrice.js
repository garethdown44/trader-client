const React = require('react');
const getStreamingPrices = require('../system/getStreamingPrices');


module.exports = React.createClass({

  getInitialState: function() {
    return {
      first: '0.00',
      bigFigures: '00',
      tenthOfPips: '0',
      nonTradeable: true
    };
  },

  componentDidMount: function() {

    let side = this.props.side == 'buy' ? 'ask' : 'bid';

    this.subscription = getStreamingPrices('EURUSD').subscribe(p => {
      let priceStr = p[side].toString();

      let first = priceStr.substr(0, 4);
      let bigFigures = priceStr.substr(4, 2);
      let tenthOfPips = priceStr.substr(6) || 0;

      let state = {
        first: first,
        bigFigures: bigFigures,
        tenthOfPips: tenthOfPips,
        nonTradeable: p.nonTradeable,
        price: p[side]
      }

      this.setState(state);
    }.bind(this));
  },

  execute: function() {
    this.props.execute(this.state.price);
  },

  render: function() {

    let tradeable = this.state.nonTradeable ? 'non-tradeable' : '';

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