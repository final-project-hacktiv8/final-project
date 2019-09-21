const initState = {
  
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

export default reducer