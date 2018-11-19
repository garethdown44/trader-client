import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from'react-redux'
import PriceTileList from './components/PriceTileList'
import BlotterSection from './components/blotter/BlotterSection'
import Header from './components/Header'

window.myDebug = require('debug');
window.myDebug.enable('trader*');
window.Perf = require('react-addons-perf');

import store from './store';
import { subscribePositions, subscribeTeamTrades } from './actions/positions';

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