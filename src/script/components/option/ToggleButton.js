const debug = require('debug')('trader:components:option:TwoChoice');
import React from 'react'
import FontAwesome from 'react-fontawesome'

export default React.createClass({

  getInitialState: function() {
    return { value: this.props.first };
  },

  toggle: function() {
    let value = this.state.value == this.props.first
                     ? this.props.second
                     : this.props.first;

    this.setState({value: value});
  },

  render: function() {
    return <button {...this.props} 
                    className='button' 
                    onClick={this.toggle}><FontAwesome name='exchange' />{this.state.value}</button>;
  }
});
