const debug = require('debug')('trader:blotter');

import React from 'react'
import { connect } from 'react-redux'
import MyTrades from './MyTrades'
import TeamTrades from './TeamTrades'

import { changeTab } from '../../system/redux/actions/positions'

const mapStateToProps = state => {
  
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

export default connect(mapStateToProps, props)(( { activeTab, positions, teamTrades, changeTab }) => {
  return  <div className="blotter-container">
            <div>
              <ul className="nav nav-tabs tab-sm">

              {Object.keys(tabs).map(name => <li key={name} role="presentation" className={name == activeTab ? 'active':''} onClick={_ => changeTab(name)}><a href="#">{tabs[name].label}</a></li>)}
                
              </ul>
            </div>

            <section>
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