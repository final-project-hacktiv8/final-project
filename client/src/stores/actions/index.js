import db from '../services/firebase'

//ACTION TYPES
export const CHANGE_DATA = 'CHANGE_DATA'

//ACTION CREATORS
export const changeData = data => {
    return ({
        type: CHANGE_DATA,
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