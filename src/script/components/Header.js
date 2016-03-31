import React from 'react'
import {addTile} from '../system/redux/actions/workspace';

const ccyCpls = [
  'EURUSD',
  'EURGBP',
  'AUDCHF',
  'GBPCHF',
  'AUDUSD',
  'EURHKD',
]

function renderCcyList(add, product) {
  return ccyCpls.map(ccyCpl => <li><a href="#" onClick={_ => add(product, ccyCpl)}>{ccyCpl}</a></li>)
}

export default React.createClass({

  add: function(product, ccyCpl) {
    this.props.dispatch(addTile(product, ccyCpl));  
  },

  render: function() {

    return  <div className="header">
              <div className="buttons">
                {/*<button className="btn btn-info btn-sm" onClick={() => this.add('spot')}>add spot</button>*/}

                <div className="btn-group">
                  <a href="#" className="btn btn-sm btn-info" data-toggle="dropdown">add spot</a>
                  <a href="#" className="btn btn-sm btn-info dropdown-toggle" data-toggle="dropdown">
                    <span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu">
                    {renderCcyList(this.add, 'spot')}
                  </ul>
                </div>

                <div className="btn-group">
                  <a href="#" className="btn btn-sm btn-success" data-toggle="dropdown">add option</a>
                  <a href="#" className="btn btn-sm btn-success dropdown-toggle" data-toggle="dropdown">
                    <span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu">
                    {renderCcyList(this.add, 'option')}
                  </ul>
                </div>
              </div>

              <div className="title">
                react<strong>trader</strong>
              </div>
           </div>;
  }
});