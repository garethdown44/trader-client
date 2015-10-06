const React = require('react');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      first: '0.00',
      bigFigures: '00',
      tenthOfPips: '0'
    };
  },

  componentWillReceiveProps: function(newProps) {

    let priceStr = newProps.price.toString();

    let first = priceStr.substr(0,4);
    let bigFigures = priceStr.substr(4, 2);
    let tenthOfPips = priceStr.substr(6) || 0;

    let state = {
      first: first,
      bigFigures: bigFigures,
      tenthOfPips: tenthOfPips
    }

    this.setState(state);
  },

  render: function() {

    let classes = 
      ['one-way-price', this.props.side].join(' ');

    return  <div className={classes}>
              <div>{this.props.side}</div>
              <span onClick={() => this.props.execute(this.props.price)}>
                <span>{this.state.first}</span>
                <span className='big-figures'>{this.state.bigFigures}</span>
                <span>{this.state.tenthOfPips}</span>
              </span>
            </div>;
  }
});