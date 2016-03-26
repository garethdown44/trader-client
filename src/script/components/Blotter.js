const React = require('react');
const {connect} = require('react-redux');
const StreamingPriceReceiver = require('./StreamingPriceReceiver');
const blotter = require('../system/blotter');
const moment = require('moment');
const debug = require('debug')('trader:blotter');
const Value = require('./Value');
const StreamingValue = StreamingPriceReceiver(Value);

function select(state) {
  return {positions: state.positions};
}

const Blotter = React.createClass({

  renderRows: function(rows) {

    return rows.map((row, index) => {

      return (<tr key={index}>
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

    debug('render, props', this.props);

    let rows = this.renderRows(this.props.positions);

    return (<table>
              <thead>
                <tr>
                  <th>
                    Date
                    <div>Date</div>
                  </th>
                  <th>
                    Direction
                    <div>Direction</div>
                  </th>
                  <th>
                    CCY
                    <div>CCY</div>
                  </th>
                  <th>
                    Notional
                    <div>Notional</div>
                  </th>
                  <th>
                    Rate
                    <div>Rate</div>
                  </th>
                  <th>
                    PnL
                    <div>PnL</div>
                  </th>
                  <th>
                    Status
                    <div>Status</div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {rows}
              </tbody>

            </table>);
  }
});

export default connect(select)(Blotter);