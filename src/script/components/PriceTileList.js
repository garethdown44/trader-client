const React = require('react');
const {connect} = require('react-redux');

const PriceTile = require('./PriceTile');
const StreamingPriceReceiver = require('./StreamingPriceReceiver');
const StreamingPriceTile = StreamingPriceReceiver(PriceTile);
const OptionTile = require('./option/OptionTile');

const PriceTileList = React.createClass({

  renderTiles: function() {
    return this.props.tiles.map((tile, index) => {

      if (tile.type == 'option') {
        return (<OptionTile key={index} />);
      } else {
        return (<StreamingPriceTile ccyCpl={tile.ccyCpl} key={index} />) 
      }
    });
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