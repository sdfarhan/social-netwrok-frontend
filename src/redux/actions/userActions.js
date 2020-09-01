import { SET_ERRORS, SET_USER, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER, MARK_NOTIFICATIONS_READ } from '../types'
import axios from 'axios'
import { URL } from '../../ApiUrl'
 
export const loginUser = (userData, history) => (dispatch) => {
    dispatch({type: LOADING_UI})
    axios.post(URL+"/login", userData)
        .then(res => {
            setAuthenticationToken(res.data.token)
            dispatch(getUserData());
            dispatch({type: CLEAR_ERRORS});
            history.push('/');
        })
        .catch( err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({type: LOADING_UI})
    axios.post(URL+"/signup", newUserData)
        .then(res => {
            setAuthenticationToken(res.data.token)
            dispatch(getUserData());
            dispatch({type: CLEAR_ERRORS});
            history.push('/');
        })
        .catch( err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const uploadImage = (imageData) => (dispatch) => {
    dispatch({type: LOADING_USER})
    axios.post(URL+"/user/image", imageData)
        .then( res => {
            dispatch(getUserData())
        })
        .catch( err => console.log(err))
}

export const updateUserDetails = (userDetails) => (dispatch) => {
    dispatch({type: LOADING_USER})
    axios.post(URL+"/user", userDetails )
        .then( () => {
            dispatch(getUserData());
        })
        .catch(err => console.error(err));
}

export const logoutuser = () => (dispatch) => {
    localStorage.removeItem('SNAuthToken');
    delete axios.defaults.headers.common['Authorization']
    dispatch({
        type: SET_UNAUTHENTICATED
    })
}


export const getUserData = () => (dispatch) => {
    dispatch({
        type: LOADING_USER
    })
    axios.get(URL+"/user")
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.error(err));
}

export const markNotificationsRead = notificationIds => dispatch => {
    axios.post(`${URL}/notifications`, notificationIds)
    .then( res => {
        dispatch({
            type: MARK_NOTIFICATIONS_READ
        })
    })
    .catch(err => console.error(err))
}

const setAuthenticationToken = token => {
    const SNAuthToken = `Bearer ${token}`;
    localStorage.setItem('SNAuthToken', SNAuthToken);
    axios.defaults.headers.common['Authorization'] = SNAuthToken;
} 
