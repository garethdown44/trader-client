import actions from '../../actions/options';
import reducer from '../options';
import {UPDATE_STRIKE} from '../../actions/options';
import {OptionTile, Leg} from '../../../workspace/data-structures';

describe('options reducer', () => {

  let state;

  beforeEach(() => {
    state = new OptionTile({ccyCpl: 'EURUSD'});
    let legs = state.get('legs');
    let leg = new Leg();

    legs = legs.add(leg);

    state = state.set('legs', legs);
  });

  it('sets the option invalid if the strike is greater than 3', () => {

    let action = actions.updateStrike(4, 0, 0);

    var newState = reducer(state, action);

    expect(newState.get('valid')).toEqual(true);
  });
});