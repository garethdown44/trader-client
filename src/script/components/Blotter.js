const debug = require('debug')('trader:blotter');

import React from 'react'
import {connect} from 'react-redux'
import StreamingPriceReceiver from './StreamingPriceReceiver'
//import blotter from '../system/blotter'
import moment from 'moment'
import Value from './Value'
import MyTrades from './MyTrades'
import TeamTrades from './TeamTrades'

import { changeTab } from '../system/redux/actions/positions'

const mapStateToProps = state => {
  //return { myTrades = state.myTrades, teamTrades = state.teamTrades }

  debug('state', state);

  return {  activeTab: state.positions.activeTab, 
            positions: state.positions.positions,
            teamTrades: state.positions.teamTrades };
};

const props = {
  changeTab
}

const tabs = {
  myTrades: { label: 'my trades', component: MyTrades },
  teamTrades: { label: 'team trades', component: TeamTrades },
}

// function getComponent(name, props) {
//   var component = tabs[name].component;
//   return React.createElement(component, props); 
// }

//<li role="presentation"><a href="#">my positions</a></li>
//<li role="presentation"><a href="#">my orders</a></li>
//<li role="presentation" onClick={_ => changeTab('teamTrades')}><a href="#">team trades</a></li>

export default connect(mapStateToProps, props)(( { activeTab, positions, teamTrades, changeTab }) => {
  return  <div className="blotter-container">
            <div>
              <ul className="nav nav-tabs tab-sm">

              {Object.keys(tabs).map(name => <li key={name} role="presentation" className={name == activeTab ? 'active':''} onClick={_ => changeTab(name)}><a href="#">{tabs[name].label}</a></li>)}
                
              </ul>
            </div>

            <section className="">
              <div className='blotter'>
                {(() => {
                  switch(activeTab) {
                    case 'myTrades': return <MyTrades positions={positions} />;
                    case 'teamTrades': return <TeamTrades teamTrades={teamTrades} />;
                  }
                })()}
              </div>
            </section>
          </div>;
});