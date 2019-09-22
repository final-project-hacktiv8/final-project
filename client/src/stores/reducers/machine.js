import {CHANGE_DATA} from '../actions/index'

const initState = {
  led: null,
  state: null,
  height: null
}

const machineReducer = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_DATA:
      return { ...state, data: action.data}
    default:
      return state
  }
}

export default machineReducer