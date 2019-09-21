const initState = {
  led: null,
  state: null,
  height: null
}

const reducer = (state = initState, action) => {
  switch (action.key) {
    case 'RECEIVE_FETCH_SOMETHING':
      return {
        ...state,
        coordinate: action.payload
      }
      
  
    default:
      return state
  }
}