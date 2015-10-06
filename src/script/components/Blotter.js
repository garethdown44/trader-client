const React = require('react');

const StreamingPriceReceiver = require('./StreamingPriceReceiver');

var Value = React.createClass({

  getInitialState: function() {
    return {value: 0};
  },

  componentWillReceiveProps: function(newProps) {
    let value;
    if (newProps.direction == 'buy') {
      let valueAtTimeOfTrade = newProps.rate * newProps.notional;
      let valueNow = newProps.bid * newProps.notional;
      value = valueNow - valueAtTimeOfTrade;
    }

    this.setState({value: value.toFixed(0)});
  },

  render: function() {

    let className = this.state.value < 0 ? 'negative' : 'positive';

    return <span className={className}>{this.state.value}</span>;
  }
});

var StreamingValue = StreamingPriceReceiver(Value);

module.exports = React.createClass({
  getInitialState: function() {
    return {trades: [], loading: true};
  },

  render: function() {
    return (<table className='table'>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Direction</th>
                  <th>CCY</th>
                  <th>Notional</th>
                  <th>Rate</th>
                  <th>PnL</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>6 Oct 2015</td>
                  <td><span className='sell'>sell</span></td>
                  <td>EURUSD</td>
                  <td>1,500,000</td>
                  <td>1.1234</td>
                  <td><StreamingValue notional={1500000} direction='buy' rate={1.1234} ccyCpl='EURUSD' /></td>
                  <td>Done</td>
                </tr>

                <tr>
                  <td>6 Oct 2015</td>
                  <td><span className='buy'>buy</span></td>
                  <td>EURUSD</td>
                  <td>1,000,000</td>
                  <td>1.3455</td>
                  <td><StreamingValue notional={1000000} direction='buy' rate={1.3455} ccyCpl='EURUSD' /></td>
                  <td>Done</td>
                </tr>
              </tbody>

            </table>);
  }
});