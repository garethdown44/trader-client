const debug = require('debug')('trader:blotter');

import React from 'react'
import {connect} from 'react-redux'
import StreamingPriceReceiver from './StreamingPriceReceiver'
import blotter from '../system/blotter'
import moment from 'moment'
import Value from './Value'

const StreamingValue = StreamingPriceReceiver(Value);
//const StreamingValue = Value

function renderRows(rows) {
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
}

export default function ( { positions } ) {

  let rows = renderRows(positions);

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