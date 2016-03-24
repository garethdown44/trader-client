import positions from '../positions';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

var mockPositions = {
  subscribe: cb => {
    var pos = { ccyCpl: 'EURUSD' };
    cb(pos);
  }
}

positions.__set__('positions', mockPositions);

describe('positions', () => {
  it('is ')
});