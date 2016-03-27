const debug = require('debug')('trader:blotter');

import React from 'react'
import {connect} from 'react-redux'
import StreamingPriceReceiver from './StreamingPriceReceiver'
import blotter from '../system/blotter'
import moment from 'moment'
import Value from './Value'

import { AutoSizer, FlexTable, FlexColumn, VirtualScroll } from 'react-virtualized';
import 'react-virtualized/styles.css';
import './blotter/blotter.style.scss';

const StreamingValue = StreamingPriceReceiver(Value);
//const StreamingValue = Value

// function renderRows(rows) {
//   return rows.map((row, index) => {

//     return (<tr key={index}>
//               <td>{moment(row.date).format('D MMM YYYY h:mm:ss')}</td>
//               <td><span className={row.direction}>{row.direction}</span></td>
//               <td>{row.ccyCpl}</td>
//               <td>{row.notional}</td>
//               <td>{row.rate}</td>
//               <td><StreamingValue notional={row.notional} 
//                                   direction={row.direction} 
//                                   rate={row.rate} 
//                                   ccyCpl={row.ccyCpl} /></td>
//               <td>{row.status}</td>
//             </tr>);
//   });
// }

function renderContent(teamTrades) {

  return (props) => {

      debug('props', props);

      return <FlexTable
          width={props.width}
          height={300}
          headerHeight={20}
          rowHeight={30}
          rowsCount={teamTrades.length}
          rowGetter={index => teamTrades[index]}>
          <FlexColumn
            label='Date'
            dataKey='date'

          />
          <FlexColumn
            label='Direction'
            dataKey='direction'
          />

          <FlexColumn
            label='Rate'
            dataKey='rate' />

          <FlexColumn
            label='PnL'
            dataKey='rate'
            cellRenderer={ (cellData, cellDataKey, rowData, rowIndex, columnData) => <StreamingValue notional={rowData.notional} rate={rowData.rate} direction={rowData.direction} ccyCpl={rowData.ccyCpl} /> }
          />
        </FlexTable>};
}

export default function ( { teamTrades } ) {

  //let rows = renderRows(teamTrades);

  return  <div className="autosizer-container">
            <AutoSizer disableHeight>
              {renderContent(teamTrades)}
            </AutoSizer>
          </div>;

  // return (<table>
  //           <thead>
  //             <tr>
  //               <th>
  //                 Date
  //                 <div>Date</div>
  //               </th>
  //               <th>
  //                 Direction
  //                 <div>Direction</div>
  //               </th>
  //               <th>
  //                 CCY
  //                 <div>CCY</div>
  //               </th>
  //               <th>
  //                 Notional
  //                 <div>Notional</div>
  //               </th>
  //               <th>
  //                 Rate
  //                 <div>Rate</div>
  //               </th>
  //               <th>
  //                 PnL
  //                 <div>PnL</div>
  //               </th>
  //               <th>
  //                 Status
  //                 <div>Status</div>
  //               </th>
  //             </tr>
  //           </thead>

  //           <tbody>
  //             {rows}
  //           </tbody>

  //         </table>);
}