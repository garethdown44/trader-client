import React from 'react'
import {addTile} from '../system/redux/actions/workspace';

export default React.createClass({

  add: function(product) {
    this.props.dispatch(addTile(product));  
  },

  render: function() {

    return  <div className="header">
              <div className="buttons">
                <button className="btn btn-info btn-sm" onClick={() => this.add('spot')}>add spot</button>
                <button className="btn btn-success btn-sm" onClick={() => this.add('option')}>add option</button>
              </div>

              <div className="title">
                react<strong>trader</strong>
              </div>
           </div>;
  }
});