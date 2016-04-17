import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from'react-redux'
import PriceTile from'./components/PriceTile'
import StreamingPriceReceiver from './components/StreamingPriceReceiver'
import PriceTileList from './components/PriceTileList'
import BlotterSection from './components/blotter/BlotterSection'
import Header from './components/Header'

window.myDebug = require('debug');
window.myDebug.enable('trader*');
window.Perf = require('react-addons-perf');

import store from './store';
import { subscribePositions, subscribeTeamTrades } from './actions/positions';

//require('style!raw!../styles/bootstrap2.css');
// require('style!raw!../../lib/font-awesome/css/font-awesome.css');

// require('expose?$!expose?jQuery!jquery');
// require('bootstrap');

var PriceAndSpread = require('./components/PriceAndSpread');

store.dispatch(subscribePositions());
store.dispatch(subscribeTeamTrades());

var Component = React.createClass({
  render: function() {
    return (<div>

              {<Header dispatch={store.dispatch} />}
      
              <div className='price-tile-list'>
                <PriceTileList />
              </div>

              <BlotterSection />
            </div>);
  }
});

const Root = React.createClass({

  render: function() {
    return <Provider store={store}>
             <Component />
           </Provider>;
  }
});

export default Root;