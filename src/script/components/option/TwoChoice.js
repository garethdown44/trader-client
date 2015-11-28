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
    // todo: replace with a button that flips the value
    //return (<select ><option>{this.props.first}</option><option>{this.props.second}</option></select>);

    return <button {...this.props} className='button' onClick={this.toggle}><FontAwesome name='exchange' />{this.state.value}</button>;
  }
});
