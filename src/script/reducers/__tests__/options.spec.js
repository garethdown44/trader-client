import * as actions from '../../actions/options';
import reducer from '../options';
import {UPDATE_STRIKE} from '../../actions/options';
import {OptionTile, Leg} from '../../services/workspace/data-structures';

describe('options reducer', () => {

  let state;

  // set up initial state
  beforeEach(() => {
    state = new OptionTile({ccyCpl: 'EURUSD'});
    let legs = state.get('legs');
    let leg = new Leg();

    legs = legs.push(leg);

    state = state.set('legs', legs);
  });

  it('sets the option valid if the strike is less than 3', () => {

    let action = actions.updateStrike(2, 0, 0);

    var newState = reducer(state, action);

    expect(newState.get('status')).toEqual('PRICEABLE');
  });

  it('sets the option invalid if the strike is 3', () => {

    let action = actions.updateStrike(3, 0, 0);

    var newState = reducer(state, action);

    expect(newState.get('status')).toEqual('INVALID');
  });

  it('sets the option invalid if the strike is greater than 3', () => {

    let action = actions.updateStrike(4, 0, 0);

    var newState = reducer(state, action);

    expect(newState.get('status')).toEqual('INVALID');
  });

  it('sets the strike price', function() {
    let action = actions.updateStrike(4, 0, 0);

    var newState = reducer(state, action);

    expect(newState.get('legs').get(0).strike).toEqual(4);
  });
});