require('bootstrap');

const React = require('react');
const PriceTile = require('./components/PriceTile');
const StreamingPriceReceiver = require('./components/StreamingPriceReceiver');
const PriceRow = require('./components/PriceRow');
const StreamingPriceRow = StreamingPriceReceiver(PriceRow);
const PriceTileList = require('./components/PriceTileList');

//const StreamingTrades = require('./components/StreamingTrades');
//const RenderAsTable = require('./components/RenderAsTable');
//const Blotter = StreamingTrades(RenderAsTable);

const Blotter = require('./components/Blotter');

window.myDebug = require('debug');
window.myDebug.enable('trader:*');

var Component = React.createClass({
  render: function() {
    return <div className='container'>

            <div className='row'>

              <div className='col-lg-12 tiles'>
                <PriceTileList />
              </div>

            </div>

            <div className='blotter row'>
                <Blotter />
              </div>

           </div>;
  }
});

React.render(<Component />, document.body);