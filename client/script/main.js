require('bootstrap');

const React = require('react');
const PriceTile = require('./components/PriceTile');
const StreamingPriceReceiver = require('./components/StreamingPriceReceiver');

const PriceRow = require('./components/PriceRow');

const StreamingPriceTile = StreamingPriceReceiver(PriceTile);
const StreamingPriceRow = StreamingPriceReceiver(PriceRow);

const PriceTileList = require('./components/PriceTileList');


window.myDebug = require('debug');
window.myDebug.enable('trader:*');

var Component = React.createClass({
  render: function() {
    return <div className='container'>

            <div className='row'>

              <div className='col-lg-10'>
                <PriceTileList />
              </div>

              <div className='col-lg-2 quick-prices'>
                <h4 className='side-heading'>Quick prices</h4>
                <table>
                  {<StreamingPriceRow ccyCpl='EURUSD' />
                  }
                </table>
              </div>

            </div>

           </div>;
  }
});

React.render(<Component />, document.body);