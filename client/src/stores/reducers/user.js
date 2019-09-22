const initState = {
  fullName: null,
  email: null,
  photo: null,
  isLoading: false,
  isError: []
}

const userReducer = (state = initState, action) => {
  switch (action.key) {
    case 'RECEIVE_FETCH_USER':
      return {
        ...state,
        fullName: action.payload.fullName,
        email: action.payload.email,
        photo: action.payload.photo
      }
    case 'SET_LOADING_USER': 
      return {
        ...state,
        isLoading: action.payload
      }
    case 'SET_ERROR_USER':
      return {
        ...state,
        isError: action.payload
      }
  
    default:
      return state
  }
}