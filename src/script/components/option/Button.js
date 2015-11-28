import React from 'react'

export default React.createClass({

  shouldComponentUpdate: function() {
    return true;
  },

  render: function() {

    let classNames = 'button';
    if (!this.props.valid) {
      classNames += ' invalid';
    }

    return <div {...this.props} className={classNames}>{this.props.text}</div>;
  }
});