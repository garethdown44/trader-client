import React from 'react'
import {addTile} from '../system/redux/actions/workspace';

export default React.createClass({

  add: function(product) {
    this.props.dispatch(addTile(product));  
  },

  render: function() {

    return <div>
             <button onClick={() => this.add('spot')}>add spot</button>
             <button onClick={() => this.add('option')}>add option</button>
           </div>;
  }
});