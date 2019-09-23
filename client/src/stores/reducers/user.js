const initState = {
  _id: null,
  fullName: null,
  email: null,
  photo_path: null,
  token: null,
  isLoading: false,
  isError: null
}

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case 'RECEIVE_FETCH_USER':
      return {
        ...state,
        _id: action.payload.user._id,
        fullname: action.payload.user.fullname,
        email: action.payload.user.email,
        photo_path: action.payload.user.photo_path,
        token: action.payload.token
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
    case 'CHECKER_LOGIN':
      return {
        ...state,
        _id: action.payload._id,
        email: action.payload.email,
        fullname: action.payload.fullname,
        password: action.payload.password,
        photo_path: action.payload.photo_path,
        token: action.payload.token
      }
    case 'SET_PHOTO_USER':
      return {
        ...state,
        photo_path: action.payload
      }
    case 'REMOVE_ERROR_USER':
      return {
        ...state,
        isError: null
      }
    default:
      return state
  }
}

export default userReducer