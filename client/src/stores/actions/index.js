import db from '../../services/firebase'
import ax from '../../services/server'

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
                dispatch({type: 'SET_LOADING_USER', payload: false})
                navigation.navigate('Dashboard')
            })
            .catch(err => {
                dispatch({type: 'SET_ERROR_USER', payload: err.response.data.message})
                dispatch({type: 'SET_LOADING_USER', payload: false})
            })
    }
}

export const signUp = (userData) => {
    return dispatch => {
        dispatch({type: 'SET_LOADING_USER', payload: true})
        ax.post('user/signup', userData)
            .then(({ data }) => {
                
            })
            .catch(err => {
                dispatch({type: 'SET_ERROR_USER', payload: err.response.data.message})
                dispatch({type: 'SET_LOADING_USER', payload: false})
            })
    }
}