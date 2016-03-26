const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');
const PriceTile = require('./components/PriceTile');
const StreamingPriceReceiver = require('./components/StreamingPriceReceiver');
const PriceTileList = require('./components/PriceTileList');
const Blotter = require('./components/Blotter');
const Header = require('./components/Header');

window.myDebug = require('debug');
window.myDebug.enable('trader*');
window.Perf = require('react-addons-perf');

import store from './system/redux/store';
import { subscribePositions } from './system/redux/actions/positions';

store.dispatch(subscribePositions());

var Component = React.createClass({
  render: function() {
    return (<div>

              <Header dispatch={store.dispatch} />
      
              <div className='row'>
                <div className='col-lg-12 tiles'>
                  <PriceTileList />
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