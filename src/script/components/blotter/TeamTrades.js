const debug = require('debug')('trader:blotter');

import React from 'react'
import {connect} from 'react-redux'
import StreamingPriceReceiver from '../StreamingPriceReceiver'
import blotter from '../../system/blotter'
import moment from 'moment'
import Value from '../Value'

import { AutoSizer, FlexTable, FlexColumn, VirtualScroll } from 'react-virtualized';
import 'react-virtualized/styles.css';
import './blotter.style.scss';

const StreamingValue = StreamingPriceReceiver(Value);

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

  return  <div className="autosizer-container">
            <AutoSizer disableHeight>
              {renderContent(teamTrades)}
            </AutoSizer>
          </div>;
}