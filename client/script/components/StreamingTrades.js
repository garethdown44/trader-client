const React = require('react');

module.exports = Child => React.createClass({

  


  render: function() {
    <Child {...this.props} />
  }
});