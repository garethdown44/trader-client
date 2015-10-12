require('bootstrap');

const React = require('react');
const {Provider} = require('react-redux');
const PriceTile = require('./components/PriceTile');
const StreamingPriceReceiver = require('./components/StreamingPriceReceiver');
const PriceTileList = require('./components/PriceTileList');
const Blotter = require('./components/Blotter');

const store = require('./components/option/store.js');

window.myDebug = require('debug');
window.myDebug.enable('trader*');

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