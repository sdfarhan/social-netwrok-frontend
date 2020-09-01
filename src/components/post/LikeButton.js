import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
//Redux
import { connect } from 'react-redux'
import { likeUnlikePost } from '../../redux/actions/dataActions'
//MUI Core
import { withStyles } from '@material-ui/core/styles' 
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
 //MUI Icons
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

const styles = (theme) => ({
    ...theme.custom
})

export class LikeButton extends Component {
    isLiked = () => { 
        if(this.props.user.likes && 
            this.props.user.likes.find((like) => like.postId === this.props.post.postId ))
                return true;
        else
            return false;
    }
    likeUnlikePost = () => {
        this.props.likeUnlikePost(this.props.post.postId);
    }
    render() {
        const {
            user: {
                authenticated,
            }
        } = this.props
        const LikeButton = !authenticated ? (
            <Tooltip title="like">
                <IconButton component={Link} to='/login'>
                    <FavoriteBorderIcon color="primary"/>
                </IconButton>
            </Tooltip>
        ) : (
            <Tooltip title="unlike">
                    <IconButton onClick={this.likeUnlikePost}>
                        {this.isLiked() ? <FavoriteIcon color="primary"/> : <FavoriteBorderIcon color="primary"/> }
                    </IconButton>
            </Tooltip>
        )
        return LikeButton
    }
}

LikeButton.propTypes = {
    likeUnlikePost: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired 
}

const mapStateToProps = (state) => ({
    user: state.user
})
const mapActionToProps = {
    likeUnlikePost
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(LikeButton))
