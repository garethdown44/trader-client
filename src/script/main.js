require('bootstrap');

const React = require('react');
const {Provider} = require('react-redux');
const PriceTile = require('./components/PriceTile');
const StreamingPriceReceiver = require('./components/StreamingPriceReceiver');
const PriceTileList = require('./components/PriceTileList');
const Blotter = require('./components/Blotter');

//const store = require('./system/redux/store.js');




window.myDebug = require('debug');
window.myDebug.enable('trader*');



import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { subscribePositions } from './system/redux/actions';
import rootReducer from './system/redux/reducers';

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
  loggerMiddleware // neat middleware that logs actions
)(createStore);

const store = createStoreWithMiddleware(rootReducer);

store.dispatch(subscribePositions());






var Component = React.createClass({
  render: function() {
    return (<div className='container'>
      
              <div className='row'>
                <div className='col-lg-12 tiles'>
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
             {() => <Component />}
           </Provider>;
  }
});

React.render(<Root />, document.body);