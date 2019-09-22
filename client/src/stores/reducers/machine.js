const initState = {
  led: null,
  state: null,
  height: null,
  isLoading: false,
  isError: []
}

const machineReducer = (state = initState, action) => {
  switch (action.type) {
    case 'RECEIVE_DATA_MACHINE':
      return { 
        ...state, 
        data: action.data
      }


    default:
      return state
  }
}

export default machineReducer