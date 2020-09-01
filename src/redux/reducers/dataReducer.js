import { LOADING_POSTS, SET_POSTS, SET_POST, LIKE_UNLIKE_POST, DELETE_POST, ADD_POST, ADD_COMMENT  } from '../types'

const initialState = {
    posts: [],
    post: {},
    loading: false,
}


export default function(state = initialState, action){
    switch(action.type){
        case LOADING_POSTS:
            return{
                ...state,
                loading: true
            }
        case SET_POSTS:
            return{
                ...state,
                loading: false,
                posts: action.payload
            }
        case SET_POST:
            return{
                ...state,
                post: action.payload
            }
        case ADD_POST:
            return{
                ...state,
                posts: [
                    action.payload,
                    ...state.posts
                ]
            }
        case LIKE_UNLIKE_POST:
            let index = state.posts.findIndex(post => post.postId === action.payload.postId)
            state.posts[index] = action.payload
            if(state.post.postId === action.payload.postId){
                state.post = {
                    ...state.post,
                    likeCount: action.payload.likeCount
                }
            }
            return{
                ...state,
            }
        case ADD_COMMENT:
            return{
                ...state,
                post: {
                    ...state.post,
                    comments: [ action.payload, ...state.post.comments ]
                }
            }
        case DELETE_POST:
            let delIndex = state.posts.findIndex(post => post.postId === action.payload)
            state.posts.splice(delIndex, 1)
            return{
                ...state
            }
        default:
            return state
    }
}