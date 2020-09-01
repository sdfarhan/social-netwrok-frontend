import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {URL} from '../ApiUrl'
import PostSkeleton from '../util/PostSkeleton'
import ProfileSkeleton from '../util/ProfileSkeleton'

//Components
import Post from '../components/post/Post'
import UserProfile from '../components/profile/UserProfile'
//MUI Core
import Grid from '@material-ui/core/Grid'
//Redux
import { connect } from 'react-redux'
import { getUserData } from '../redux/actions/dataActions'
class user extends Component {
    constructor(){
        super()
        this.state = {
            user: {},
            postIdParams: '',
            userLoading: false
        }
    }

    componentDidMount(){
        this.setState({
            userLoading: true
        })
        const handle = this.props.match.params.handle
        const postId = this.props.match.params.postId
        if(postId) this.setState({postIdParams: postId})

        this.props.getUserData(handle)
        axios.get(`${URL}/user/${handle}`)
        .then( res => {
            this.setState({
                user: res.data.user,
                userLoading: false
            })
        })
        .catch(err => console.log(err))

    }
    
    render() {
        const { posts, loading } = this.props.data
        const { postIdParams } = this.state
        let userProfileMarkup = this.state.userLoading ? <ProfileSkeleton/> : 
        <UserProfile key={this.state.user.handle} user={this.state.user}/>
        let postMarkup = loading ? (<PostSkeleton/>) : (
            posts.length === 0 ? (<p>No posts from this user</p>) : (
                !postIdParams ? (
                    posts.map( post => <Post key={post.postId} post={post}/>)
                ) : (
                    posts.map( post => {
                        if(post.postId !== postIdParams) return <Post key={post.postId} post={post}/>
                        else return <Post key={post.postId} post={post} openDialog/>
                    })
                )   
            )
        ) 
        
        return (
            <Grid container spacing={3}>
                <Grid item sm={4} xs={12}>
                    {userProfileMarkup}
                </Grid>
                <Grid item sm={8} xs={12}>
                    {postMarkup}
                </Grid>
            </Grid>
        )
    }
}

user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired    
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionToProps = {
    getUserData
}

export default connect(mapStateToProps, mapActionToProps)(user)
