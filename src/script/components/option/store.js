import {createStore} from 'redux';
import operations from './reducers';

let store = createStore(operations);

export default store;