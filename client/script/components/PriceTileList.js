const React = require('react');

const PriceTile = require('./PriceTile');
const StreamingPriceReceiver = require('./StreamingPriceReceiver');
const StreamingPriceTile = StreamingPriceReceiver(PriceTile);

const workspace = require('../system/workspace');

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
    workspace.get((data) => {
      this.setState({loading: false, workspace: data});
    });
  },

  renderTiles: function() {
    return this.state.workspace.tiles.map((tile, index) => (<StreamingPriceTile ccyCpl={tile.ccyCpl} key={index} />));
  },

  render: function() {

    let view = this.state.loading ? (<Loading />) : this.renderTiles();

    return <div className='row'>{view}</div>;
  }
});