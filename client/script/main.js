require('bootstrap');

const React = require('react');
const PriceTile = require('./components/PriceTile');
const StreamingPriceReceiver = require('./components/StreamingPriceReceiver');

const PriceRow = require('./components/PriceRow');

const StreamingPriceTile = StreamingPriceReceiver(PriceTile);
const StreamingPriceRow = StreamingPriceReceiver(PriceRow);


window.myDebug = require('debug');
window.myDebug.enable('rv:');

var Component = React.createClass({
  render: function() {
    return <div>
              <div id="priceTiles">
                <PriceTile ccyCpl='EURUSD' bid={1.245} offer={1.256} />
                <StreamingPriceTile ccyCpl='EURUSD' />
              </div>

              <div>
                <h2>Quick prices</h2>
                <table>
                  <StreamingPriceRow ccyCpl='EURUSD' />
                  <PriceRow ccyCpl='EURUSD' bid={1.24} />
                </table>
              </div>


           </div>;
  }
});

React.render(<Component />, document.body);