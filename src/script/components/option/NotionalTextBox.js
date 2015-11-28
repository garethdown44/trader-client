import React from 'react'

export default React.createClass({
  render: function() {
    return (<input type='text' value={this.props.value} onChange={this.props.onChange} />);
  }
});
