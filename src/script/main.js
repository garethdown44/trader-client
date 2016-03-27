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
import { subscribePositions } from './system/redux/actions/positions';

require('../styles/main.css');

store.dispatch(subscribePositions());

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

              <div className="blotter-container">

                <div>
                  <ul className="nav nav-tabs tab-sm">
                    <li role="presentation" className="active"><a href="#">team trades</a></li>
                    <li role="presentation"><a href="#">my trades</a></li>
                    <li role="presentation"><a href="#">my orders</a></li>
                  </ul>
                </div>

                <section class="">
                  <div className='blotter'>
                    <Blotter />
                  </div>
                </section>
              </div>
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