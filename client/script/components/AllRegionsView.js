const React = require('react');
const debug = require('debug')('rv:AllRegionsView');
const RegionView = require('./RegionView');
const Immutable = require('immutable');
const telemetry = require('../telemetry');
const PureRenderMixin = require('react/addons').addons.PureRenderMixin;

module.exports = React.createClass({

  //mixins: [PureRenderMixin],

  componentDidMount: function() {

    this.activeUsers = Immutable.Map();
    this.erroredUsers = Immutable.Map();

    var added = function(self) {
      return function(message) {

        debug('added: ');
        debug(message);

        var overview = message.fields;

        // ensure erroredUsers is at least an empty array
        if (!overview.erroredUsers) {
          overview.erroredUsers = [];
        }

        var state = self.state.items;

        var region = Immutable.Map();

        region = region.set('activeUserCount', overview.activeUserCount);
        region = region.set('erroredUsers', overview.erroredUsers);

        state = state.set(message.id, region);

        self.setState({items: state});
      };
    };

    var changed = function(self) {
      return function(message) {
        var overview = message.fields;

        debug('changed: ');
        debug(message);

        var state = self.state.items;

        var region = state.get(message.id);

        if (overview.activeUserCount) {
          region = region.set('activeUserCount', overview.activeUserCount);
        }

        if (overview.erroredUsers) {
          region = region.set('erroredUsers', overview.erroredUsers);
        }

        state = state.set(message.id, region);

        self.setState({items: state});
      };
    };

    telemetry.subscribe('overview', [], added(this), changed(this));
  },

  getInitialState: function() {
    return { items: Immutable.Map() };
  },

  render: function () {

    var regions = this.state.items.map(function(overview, region) {

      var o = overview.toJS();

      return (<RegionView regionName={region} 
                          activeUserCount={o.activeUserCount} 
                          erroredUsers={o.erroredUsers} />);
    });

    var view = regions.count() > 0 ? regions : 'there are no active users';

    return (
      <div className="row">
        <div className="col-md-12">
          {view}
        </div> 
      </div>
    )
  }
});