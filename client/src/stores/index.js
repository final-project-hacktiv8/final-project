import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './reducers/user'
import machineReducer from './reducers/machine'

const rootReducer = combineReducers({ user: userReducer, machine: machineReducer })

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;