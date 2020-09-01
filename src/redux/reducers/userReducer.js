import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, LIKE_UNLIKE_POST, MARK_NOTIFICATIONS_READ } from '../types'

const initialState = {
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: [],
    loading: false
};

export default function(state= initialState, action){
    switch(action.type){
        case SET_AUTHENTICATED:
            return{
                ...state,
                authenticated: true
            }
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return{
                ...action.payload,
                authenticated: true,
                loading: false
            }
        case LOADING_USER:
            return{
                ...state,
                loading: true
            }
        case LIKE_UNLIKE_POST:
            const index = state.likes.findIndex( like => like.postId === action.payload.postId );
            if(index === -1){
                return{
                    ...state,
                    likes: state.likes.concat({
                        postId: action.payload.postId,
                        userHandle: action.payload.userHandle
                    })
                };
            } else{
                state.likes.splice(index,1)
                return{
                    ...state,
                }   
            }
        case MARK_NOTIFICATIONS_READ:
            state.notifications.forEach( notification => notification.read = true )
            return{
                ...state
            }
        default:
            return state
    }
} 
                
                        