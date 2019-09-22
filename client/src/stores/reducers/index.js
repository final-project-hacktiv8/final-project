import { combineReducers } from 'redux'
import machineReducer from './machine'

const appReducer = combineReducers({
    machineReducer
})

export default appReducer