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

const mapOwnProps = {
  changeTab
}

function TabLabel({ changeTab, activeTab, name, tabs }) {
  return <li key={name} 
             role="presentation" 
             className={name == activeTab ? 'active':''} 
             onClick={_ => changeTab(name)}><a href="#">{tabs[name].label} ({tabs[name].data.length})</a></li>
}

export default connect(mapStateToProps, mapOwnProps)(( { activeTab, positions, teamTrades, changeTab }) => {

  const tabs = {
    myTrades: { label: 'my trades', component: MyTrades, data: positions },
    teamTrades: { label: 'team trades', component: TeamTrades, data: teamTrades },
  }

  return  <div className="blotter-container">
            <div>
              <ul className="nav nav-tabs tab-sm">

              {Object.keys(tabs).map(name => <TabLabel name={name} tabs={tabs} activeTab={activeTab} changeTab={changeTab} /> )}
                
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