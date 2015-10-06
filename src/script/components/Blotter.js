const React = require('react');
const StreamingPriceReceiver = require('./StreamingPriceReceiver');
const blotter = require('../system/blotter');
const moment = require('moment');
const debug = require('debug')('trader:blotter');

var Value = React.createClass({

  getInitialState: function() {
    return {value: 0};
  },

  componentWillReceiveProps: function(newProps) {
    let value;
    let valueAtTimeOfTrade = newProps.rate * newProps.notional;
    let valueNow = newProps.bid * newProps.notional;

    if (newProps.direction == 'buy') {
      value = valueNow - valueAtTimeOfTrade;
    } else if (newProps.direction == 'sell') {
      value = valueAtTimeOfTrade - valueNow;
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
    return {positions: [], loading: true};
  },

  componentDidMount: function() {
    this.subscription = blotter.subscribe(position => {

      debug(position);
      let positions = this.state.positions;
      positions.push(position);
      this.setState({positions: positions});
    });
  },

  componentWillUnmount: function() {
    this.subscription.dispose();
  },

  renderRows: function(rows) {

    return rows.map(row => {

      return (<tr>
                <td>{moment(row.date).format('D MMM YYYY h:mm:ss')}</td>
                <td><span className={row.direction}>{row.direction}</span></td>
                <td>{row.ccyCpl}</td>
                <td>{row.notional}</td>
                <td>{row.rate}</td>
                <td><StreamingValue notional={row.notional} 
                                    direction={row.direction} 
                                    rate={row.rate} 
                                    ccyCpl={row.ccyCpl} /></td>
                <td>{row.status}</td>
              </tr>);
    });
  },

  render: function() {

    let rows = this.renderRows(this.state.positions);

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
                {rows}
              </tbody>

            </table>);
  }
});