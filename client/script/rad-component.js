const React = require('react');

const RadComponent = React.createClass({
  render: function() {
    return (<div className="rad-component">
      <p>is this component rad? {this.props.rad}</p>
    </div>);
    }
});

module.exports = RadComponent;