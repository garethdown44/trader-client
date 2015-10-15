const React = require('react');
const {connect} = require('react-redux');

const PriceTile = require('./PriceTile');
const StreamingPriceReceiver = require('./StreamingPriceReceiver');
const StreamingPriceTile = StreamingPriceReceiver(PriceTile);
const OptionTile = require('./option/OptionTile');

const PriceTileList = React.createClass({

  renderTiles: function() {

    var tiles = this.props.workspace.tiles;

    return tiles.map((tile, tileId) => {

      tile = tile.toJS();


      if (tile.type == 'option') {
        return <OptionTile dispatch={this.props.dispatch} key={tileId} {...tile} tileId={tileId} />;
      } else {
        return <StreamingPriceTile ccyCpl={tile.ccyCpl} key={tileId} />;
      }
    });
  },

  render: function() {

    let view = this.renderTiles().toJS();

    return <div className='row'>{view}</div>;
  }
});

function selectWorkspace(state) {
  return {workspace: state.workspace};
}

export default connect(selectWorkspace)(PriceTileList);