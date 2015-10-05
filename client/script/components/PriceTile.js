const React = require('react');
const OneWayPrice = require('./OneWayPrice');

module.exports = React.createClass({

  

  render: function() {
    return (<div className='tile col-md-2'>
              <div className='tile-content'>
                <div className='tile-title'>{this.props.ccyCpl}</div>

                <div className='container'>
                  <div className='row'>

                    <OneWayPrice side='sell' price={this.props.bid} />

                    <OneWayPrice side='buy' price={this.props.ask} />
                  </div>
                </div>
              </div>
          </div>);
  }
});