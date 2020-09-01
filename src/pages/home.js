import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PostSkeleton from '../util/PostSkeleton'
//Components
import Post from '../components/post/Post'
import Profile from '../components/profile/Profile' 
//MUI
import Grid from '@material-ui/core/Grid'
//redux
import { connect } from 'react-redux'
import { getPosts } from '../redux/actions/dataActions'

export class home extends Component {
    constructor(){
        super();
        this.state = {
            posts: [],
            loading: false
        }
    }
    componentDidMount(){
        this.props.getPosts()
    }

    render() {
        const { posts, loading } = this.props.data
        let postMarkup = loading
         ? <PostSkeleton />
         :(posts.map( post => <Post key={post.postId} post={post} />))
        return (
            <Grid container spacing={2}>
                <Grid item sm={8} xs={12}>
                    {postMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        )
    }
}
home.propTypes = {
    data: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionToProps = {
    getPosts
}
export default connect(mapStateToProps, mapActionToProps)(home)
