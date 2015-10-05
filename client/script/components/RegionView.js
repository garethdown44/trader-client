var React = require('react');
var ErrorTable = require('./ErrorTable');

module.exports = React.createClass({

  componentDidMount: function() {
    
  },

  getInitialState: function() {
    return { }
  },

  renderErrorSummary: function() {
    if (this.props.erroredUsers.length > 0) {
      return (<div>
                <h4 className="error">{this.props.erroredUsers.length} users with errors</h4>

                <ErrorTable erroredUsers={this.props.erroredUsers} />
              </div>
        );
    } else {
      return null;
    }
  },

  render: function() {
    return (
          <div>
            <h2>{this.props.regionName}</h2>
            <h4>{this.props.activeUserCount} active users</h4>

            {this.renderErrorSummary()}
          </div>
      );
  }
});