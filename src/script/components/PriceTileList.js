const React = require('react');
const {connect} = require('react-redux');

const PriceTile = require('./PriceTile');
const StreamingPriceReceiver = require('./StreamingPriceReceiver');
const StreamingPriceTile = StreamingPriceReceiver(PriceTile);
const OptionTile = require('./option/OptionTile');
//const workspace = require('../system/workspace');

// const Loading = React.createClass({
//   render: function() {
//     return <div>loading...</div>;
//   }
// });

const PriceTileList = React.createClass({

  // getInitialState: function() {
  //   return { loading: true };
  // },

  // componentDidMount: function() {
  //   workspace.get((data) => {
  //     this.setState({loading: false, workspace: data});
  //   });
  // },

  renderTiles: function() {
    return this.props.tiles.map((tile, index) => {

      if (tile.type == 'option') {
        return (<OptionTile {...tile.data} key={index} />);
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