const React = require('react');
const Table = require('react-bootstrap/lib/Table');
const Router = require('react-router');
const Link = Router.Link;

module.exports = React.createClass({

  render: function() {

    console.log(this.props.erroredUsers);

    var rows = this.props.erroredUsers.map(function(user) {

      var numErrors = 0;
      if (user.errors) {
        numErrors = user.errors.length;
      }

      return (<tr>
                <td>{user.name}</td>
                <td><Link to="user" params={{uid: user.uid}}>{user.uid}</Link></td>
                <td>{user.uptime}</td>
                <td>{user.version}</td>
                <td>{numErrors}</td>
                <td><a href="mailto:blah@blah.com">email</a></td>
              </tr>);
    });

    return (
      <div>
      <Table striped bordered>
            <thead>
              <tr>
                <th>name</th>
                <th>uid</th>
                <th>uptime</th>
                <th>version</th>
                <th>#errors</th>
                <th>contact</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </Table>

          </div>);
  }
});