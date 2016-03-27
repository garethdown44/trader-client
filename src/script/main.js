import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from'react-redux'
import PriceTile from'./components/PriceTile'
import StreamingPriceReceiver from './components/StreamingPriceReceiver'
import PriceTileList from './components/PriceTileList'
import Blotter from './components/Blotter'
import Header from './components/Header'

window.myDebug = require('debug');
window.myDebug.enable('trader*');
window.Perf = require('react-addons-perf');

import store from './system/redux/store';
import { subscribePositions, subscribeTeamTrades } from './system/redux/actions/positions';

require('style!raw!../styles/bootstrap2.css');
require('style!raw!../../lib/font-awesome/css/font-awesome.css');
require('../styles/main.css');

require('jquery');
require('bootstrap');

store.dispatch(subscribePositions());
store.dispatch(subscribeTeamTrades());

var Component = React.createClass({
  render: function() {
    return (<div>

              {<Header dispatch={store.dispatch} />}
      
              <div className='row'>
                <div className='col-lg-12 tiles'>
                  <PriceTileList />

                  <div className="panel panel-default spot-tile">
                    <div className="panel-heading heading">EURUSD</div>
                    <div className="panel-body">the body here</div>
                  </div>
                </div>
              </div>

              <Blotter />
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

ReactDOM.render(<Root />, document.getElementById('cont'));