const React = require('react');
const {connect} = require('react-redux');

const PriceTile = require('./PriceTile');
const StreamingPriceReceiver = require('./StreamingPriceReceiver');
const StreamingPriceTile = StreamingPriceReceiver(PriceTile);
const OptionTile = require('./option/OptionTile');

const PriceTileList = React.createClass({

  renderTiles: function() {

    let tiles = [];

    for (let tileId in this.props.tiles) {

      let tile = this.props.tiles[tileId];

      if (tile.type == 'option') {

        let Ot = OptionTile(tileId);

        tiles.push(<Ot key={tileId} {...tile} tileId={tileId}  />);
      } else {
        tiles.push(<StreamingPriceTile ccyCpl={tile.ccyCpl} key={tileId} />);
      }
    }

    return tiles;
  },

  render: function() {

    let view = this.renderTiles();

    return <div className='row'>{view}</div>;
  }
});

function selectWorkspace(state) {
  return state.workspace;
}

export default connect(selectWorkspace)(PriceTileList);