import { LOADING_POSTS, SET_POSTS, SET_POST, LIKE_UNLIKE_POST, ADD_COMMENT, DELETE_POST, ADD_POST, LOADING_UI, STOP_LOADING_UI } from '../types'
import { URL } from '../../ApiUrl'
import axios from 'axios'

export const  getPosts = () => dispatch => {
    dispatch({type: LOADING_POSTS})
    axios.get(URL+'/post')
    .then(res => {
        dispatch({
            type: SET_POSTS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: SET_POSTS,
            payload: []
        })
    });
}

export const likeUnlikePost = postId => dispatch => {
    axios.get(`${URL}/post/${postId}/like`)
    .then(res => {
        dispatch({
            type: LIKE_UNLIKE_POST,
            payload: res.data
        })
    })
    .catch(err => console.error(err))
}

export const addComment = (postId, comment) => dispatch => {
    axios.post(`${URL}/post/${postId}/comment`, {comment})
    .then( res => {
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })
    })
    .catch(err => console.error(err))
}

export const addPost = post => dispatch => {
    axios.post(URL+'/post', {body: post})
        .then( res => {
            dispatch({
                type: ADD_POST,
                payload: res.data
            })
        })
        .catch(err => console.error(err))
} 

export const deletePost = postId => dispatch => {
    axios.delete(`${URL}/post/${postId}`)
    .then( () => {
        dispatch({
            type: DELETE_POST,
            payload: postId
        })
    })
    .catch(err => console.error(err))
}

export const getPost = postId => dispatch => {
    dispatch({type: LOADING_UI})
    axios.get(`${URL}/post/${postId}`)
        .then(res => {
            dispatch({
                type: SET_POST,
                payload: res.data
            })
            dispatch({type: STOP_LOADING_UI})
        })
        .catch(err => console.error(err))
}

export const  getUserData = userHandle => dispatch => {
    dispatch({type: LOADING_POSTS})
    axios.get(`${URL}/user/${userHandle}`)
    .then(res => {
        dispatch({
            type: SET_POSTS,
            payload: res.data.posts
        })
    })
    .catch(err => {
        dispatch({
            type: SET_POSTS,
            payload: []
        })
    });
}