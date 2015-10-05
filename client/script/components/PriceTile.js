const React = require('react');

module.exports = React.createClass({
  render: function() {
    return (<div>
              <div>{this.props.ccyCpl}</div>

              <div>SELL</div>
              <div>{this.props.bid}</div>

              <div>BUY</div>
              <div>{this.props.offer}</div>
            </div>);
  }
});