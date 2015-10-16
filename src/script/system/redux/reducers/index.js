const debug = require('debug')('trader:redux:reducers');

import { combineReducers } from 'redux';

import workspace from './workspace';
import positions from './positions';

export default combineReducers( { 
                                  workspace, 
                                  positions 
                                } );