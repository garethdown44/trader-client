const React = require('react');

const PriceTile = require('./components/PriceTile');
const StreamingPriceReceiver = require('./components/StreamingPriceReceiver');
const StreamingPriceTile = StreamingPriceReceiver(PriceTile);

const Loading = React.createClass({
  render: function() {
    return <div>loading...</div>;
  }
});

module.exports = React.createClass({

  getInitialState: function() {
    return { loading: true };
  },

  componentDidMount: function() {

  },

  render: function() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      return this.state.tiles.map(tile => {
        <StreamingPriceTile ccyCpl={tile.ccyCpl} />
      });
    }
  }
});