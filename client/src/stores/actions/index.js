import db from '../../services/firebase'
import ax from '../../services/server'
import { AsyncStorage } from 'react-native'

// Machine Creators
export const changeData = data => {
    return ({
        type: 'RECEIVE_DATA_MACHINE',
        data
    })
}

export const fetchData = (machineId) => {
    return dispatch => {
        db.collection("machines").doc(machineId).onSnapshot(querySnapshot => {
            dispatch(changeData(querySnapshot.data()))
        })
    }
}

// User Creators
export const signIn = (userData, navigation) => {
    return dispatch => {
        dispatch({type: 'SET_LOADING_USER', payload: true})
        ax.post('/user/signin', userData)
            .then(({ data }) => {
                dispatch({type: 'RECEIVE_FETCH_USER', payload: {user: data.data, token: data.token} })
                AsyncStorage.setItem('user', JSON.stringify(data.data), () => {
                    AsyncStorage.mergeItem('user', JSON.stringify({token: data.token}), () => {
                        dispatch({type: 'SET_LOADING_USER', payload: false})
                        setTimeout(() => {
                            navigation.navigate('Dashboard', {transition: 'collapseTransition'})
                        }, 1000);
                    });
                  });
            })
            .catch(err => {
                dispatch({type: 'SET_ERROR_USER', payload: err.response.data.message})
                dispatch({type: 'SET_LOADING_USER', payload: false})
            })
    }
}

export const signUp = (userData, navigation) => {
    return dispatch => {
        dispatch({type: 'SET_LOADING_USER', payload: true})
        ax.post('user/signup', userData)
            .then(({ data }) => {
                dispatch({type: 'RECEIVE_FETCH_USER', payload: {user: data.data, token: data.token} })
                AsyncStorage.setItem('user', JSON.stringify(data.data), () => {
                    AsyncStorage.mergeItem('user', JSON.stringify({token: data.token}), () => {
                        dispatch({type: 'SET_LOADING_USER', payload: false})
                        setTimeout(() => {
                            navigation.navigate('Dashboard')
                        }, 1000);
                    });
                  });
            })
            .catch(err => {
                dispatch({type: 'SET_ERROR_USER', payload: err.response.data.message})
                dispatch({type: 'SET_LOADING_USER', payload: false})
            })
    }
}

export const changePhoto = (base64Image, token) => {
    return dispatch => {
        dispatch({type: 'SET_LOADING_USER', payload: true})
        ax.post('user/changephoto', {photo : base64Image}, {headers: {token}})
            .then(({ data }) => {
<<<<<<< HEAD
                dispatch({type:'SET_PHOTO_USER', payload: data.photo_path })
                dispatch({type: 'SET_LOADING_USER', payload: false})
            })
=======
                AsyncStorage.getItem('user', (error, result) => {
                    if (result) {
                       let resultParsed = JSON.parse(result)
                       AsyncStorage.setItem('user', JSON.stringify({...resultParsed, photo_path: data.photo_path}), () => {
                        dispatch({type:'SET_PHOTO_USER', payload: data.photo_path })
                        dispatch({type: 'SET_LOADING_USER', payload: false})
                    })
                }
            })
        })
>>>>>>> dee388e6cd2b657d13dcc4fe6aac03685a05d107
            .catch(err => {
                console.log(err.response.data.message);
                dispatch({type: 'SET_ERROR_USER', payload: err.response.data.message})
                dispatch({type: 'SET_LOADING_USER', payload: false})
            })

    }
}

export const checkerLogin = (userData, navigation) => {
    return dispatch => {
        dispatch({type: 'CHECKER_LOGIN', payload: userData})
        navigation.navigate('Dashboard')
    }
}

export const removeErrorUser = () => {
    return dispatch => {
        dispatch({type: 'REMOVE_ERROR_USER'})
    }
}