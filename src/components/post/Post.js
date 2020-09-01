import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
import DeletePost from './DeletePost'
import PostDetails from './PostDetails'
import LikeButton from './LikeButton'
 //Redux
import { connect } from 'react-redux'
//MUI
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
//MUI Icons
import CommentIcon from '@material-ui/icons/Comment'
const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: 150,
        objectFit: 'cover'
    },
    content: {
        padding: 25
    },
}


export class Post extends Component {
    render() {
        dayjs.extend(relativeTime)
        const {
            classes, 
            post: {
                postId, 
                userImage,
                userHandle,
                createdAt, 
                body, 
                likeCount, 
                commentCount
            },
            user: {
                authenticated,
                credentials: { 
                    handle 
                }
            }
        } = this.props
        const deleteButton = authenticated && userHandle === handle ? (
            <DeletePost postId={postId}/>
        ) : null
        return (
            <Card className={classes.card}>
                 <CardMedia
                    title="profile image"
                    image={userImage}
                    className={classes.image}
                />
                <CardContent className={classes.content}>
                    <Typography
                        variant="h5"
                        color="primary"
                        component={Link}
                        to={`/users/${userHandle}`}
                    >
                        {userHandle}
                    </Typography>
                    {deleteButton }
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).fromNow()}                    
                    </Typography>
                    <Typography variant="body1">
                        {body}
                    </Typography>
                    <LikeButton post={this.props.post}/>
                    <span>{likeCount} Likes</span>
                    <Tooltip title="comments">
                        <IconButton >
                            <CommentIcon color="primary"/>
                        </IconButton>
                    </Tooltip>
                    <span>{commentCount} comments</span>
                    <PostDetails postId={postId} userHandle={userHandle} openDialog={this.props.openDialog}/>
                </CardContent> 
            </Card>
        )
    }npm
}
Post.propTypes = {
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool 
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Post))
