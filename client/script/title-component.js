const React = require('react');

const Title = React.createClass({
  render: function() {
    return (<h1>cib launchpad realtime use - {this.props.environment}</h1>);
    }
});

module.exports = Title;