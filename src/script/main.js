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
    return (<div className='container'>
      
              <div className='row'>
                <div className='col-lg-12 tiles'>
                  <Header dispatch={store.dispatch} />
                  <PriceTileList />
                </div>
              </div>

              <div className='blotter row'>
                  <Blotter />
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