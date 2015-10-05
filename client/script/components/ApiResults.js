var React = require('react');

module.exports = React.createClass({

  render: function() {
    return (<div>
              <div>this shows the results of http://cortex-api.staging.echonet/applications/user/{this.props.uid}</div>

              <div></div>

            </div>);
  }
});