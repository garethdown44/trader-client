const React = require('react');
const executeTrade = require('../system/executeTrade');
const OneWayPrice = require('./OneWayPrice');
const Spread = require('./Spread');

module.exports = React.createClass({

  getInitialState: function() {
    return { executing: false, notional: 1000000, firstCcy: this.props.ccyCpl.substr(0, 3) };
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({bid: newProps.bid, ask: newProps.ask});
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

  execute: function(action, price, amount) {

    this.setState({executing: true});

    executeTrade(action, price, amount, () => {
      this.setState({executing: false, bid: this.props.bid, ask: this.props.ask});
    });
  },

  render: function() {

    if (this.state.executing) {
      return <div className='tile col-md-2'>executing...</div>;
    }

    console.log(this.props);

    return (<div className='tile col-md-2'>
              <div className='tile-content'>
                <div className='tile-title'>{this.props.ccyCpl}</div>

                <div>
                  <div className='row'>

                    <OneWayPrice side='sell'
                                 price={this.state.bid}
                                 execute={() => this.execute('sell', this.state.bid, this.state.amount)} />

                    <OneWayPrice side='buy'
                                 price={this.state.ask} />
                  </div>

                  <div className='spread'>
                    <Spread bid={this.state.bid} 
                            ask={this.state.ask} />
                  </div>

                  <div className='row'>
                    <span className='notional-ccy'>{this.state.firstCcy}</span>
                    <input type="text" 
                           value={this.state.notional} 
                           onChange={this.notionalChanged}
                           className='notional' />
                  </div>
                </div>
              </div>
          </div>);
  }
});

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};