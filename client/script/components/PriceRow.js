const React = require('react');

const PriceRow = React.createClass({

  render: function() {
    return (<tr><td>{this.props.ccyCpl}</td>
                <td>{this.props.bid}</td>
                <td>{this.props.offer}</td>
            </tr>);
  }
});

module.exports = PriceRow;