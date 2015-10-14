const React = require('react');
const {connect} = require('react-redux');

const PriceTile = require('./PriceTile');
const StreamingPriceReceiver = require('./StreamingPriceReceiver');
const StreamingPriceTile = StreamingPriceReceiver(PriceTile);
const OptionTile = require('./option/OptionTile');

const {updateStrike} = require('../system/redux/actions');

const PriceTileList = React.createClass({

  updateStrike: function(value, tileId, legIndex) {
    this.props.dispatch(updateStrike(value, tileId, legIndex));
  },

  renderTiles: function() {

    let tiles = [];

    for (let tileId in this.props.tiles) {

      let tile = this.props.tiles[tileId];

      if (tile.type == 'option') {

        tiles.push(<OptionTile dispatch={this.props.dispatch} key={tileId} {...tile} tileId={tileId} updateStrike={this.updateStrike} />);
      } else {
        tiles.push(<StreamingPriceTile ccyCpl={tile.ccyCpl} key={tileId} />);
      }
    }

    return tiles;
  },

  componentDidMount: function() {
    this.isProfiling = false;
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