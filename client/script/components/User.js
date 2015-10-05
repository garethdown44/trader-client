// const React = require('react');
// const {RouteHandler} = require('react-router');

// var ApiResults = React.createClass({
//   render: function() {
//     return (<div>api results</div>);
//   }
// });


// var User = React.createClass({
//   render: function() {
//     return (<div><div>user page</div><RouteHandler /></div>);
//   }
// });

// module.exports = User;


const React = require('react');
const TabbedArea = require('react-bootstrap/lib/TabbedArea');
const TabPane = require('react-bootstrap/lib/TabPane');
const telemetry = require('../telemetry');
const ApiResults = require('./ApiResults');

var {RouteHandler, Link} = require('react-router'); // or var Router = ReactRouter; in browsers

// Note: this page might be hit whether the user is active or not, 
//       so we need to query the live telemetry data to see if they are
//       this will also need to query the api to get some enhanced details

var User = React.createClass({

  // contextTypes: {
  //   router: React.PropTypes.func
  // },

  componentDidMount: function() {
    // request enhanced telemetry

    // call the api to get the user details

    // var onAdded = function(obj) {
    //   debug('onAdded', obj);
    // };

    // var onChanged = function(id, obj) {
    //   debug('onChanged', obj);
    // };  

    // // todo: 2 hardcoded here
    // telemetry.subscribe('enhanced', [2], onAdded, onChanged)
  },

  getInitialState: function() {
    return { user: { name: 'Gareth Down', uid: '846736' }};
  },

  render: function() {

    //var { router } = this.context;

    //var uid = router.getCurrentParams().uid;

    return (<div>
        <h3>{this.state.user.name} - {this.state.user.uid}</h3>

        // <Link to="apiresults">api results</Link>
        // <Link to="somethingelse">something else</Link>
        
        <RouteHandler />
      </div>);
  }
});

module.exports = User;


// <TabbedArea defaultActiveKey={1} animation={false}>
//           <TabPane eventKey={1} tab='high level log'>High level log here</TabPane>
//           <TabPane eventKey={2} tab='debug log'>Debug log here</TabPane>
//           <TabPane eventKey={3} tab='open apps'>open apps content here</TabPane>
//           <TabPane eventKey={4} tab='available apps'>available apps content here</TabPane>
//           <TabPane eventKey={5} tab='persisted workspace state'>persisted workspace state</TabPane>
//           <TabPane eventKey={6} tab='api results'><ApiResults uid={this.state.user.uid} /></TabPane>
//           <TabPane eventKey={7} tab='database results'>database results</TabPane>
//         </TabbedArea>