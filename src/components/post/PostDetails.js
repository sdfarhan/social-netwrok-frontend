import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
//Components
import LikeButton from './LikeButton'
import Comments from './Comments'
import AddComment from './AddComment'
//Redux
import { connect } from 'react-redux'
import { getPost } from '../../redux/actions/dataActions'
//MUI Core
import withStyles from '@material-ui/core/styles/withStyles'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

//MUI Icons
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore'
import CloseIcon from '@material-ui/icons/Close'
import CommentIcon from '@material-ui/icons/Comment'

const styles = (theme) => ({
    ...theme.custom,
    btnUnfolded:{
        position: 'absolute',
        left: '90%',    
    },
    exitButton: {
        position: 'absolute',
        left: '90%',
        top: '1%'
    },
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    spinner: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
})

export class PostDetails extends Component {
    constructor(){
        super()
        this.state = {
            open: false,
            oldPath: '',
            newPath: ''
        }
    }
    
    handleOpen = () => {
        let oldPath = window.location.pathname
        let newPath = `/users/${this.props.userHandle}/post/${this.props.postId}`
        this.setState({
            open: true,
            oldPath,
            newPath
        })
        if(oldPath === newPath) oldPath = `/users/${this.props.userHandle}`
        window.history.pushState(null, null, newPath)
        this.props.getPost(this.props.postId)
    }
    handleClose = () => {
        this.setState({
            open: false
        })
        window.history.pushState(null, null, this.state.oldPath)
    }
    componentDidMount(){
        if(this.props.openDialog)
        this.handleOpen()
    }
    render() {
        const { 
            classes,
            authenticated,
            post: {
                body,
                createdAt,
                userHandle,
                userImage,
                likeCount,
                commentCount,
                comments,
                postId
             },
             UI : { loading }
        } = this.props
        const dialogMarkup = loading ? (
            <div className={classes.spinner}> 
                <CircularProgress size={150} thickness={2} />
            </div>
        ) : (
            <Grid container spacing={3}>
                <Grid item sm={5}>
                    <img src={userImage} alt="profile" className={classes.profileImage}/>
                </Grid>
                <Grid item sm={7} className={classes.userDetails}>
                    <Typography variant="h4" color="primary" component={Link} to={`/users/${userHandle}`}>
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant="body1" color="textSecondary">
                        {dayjs(createdAt).format('hh:mm a MMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant="body2" >
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
                </Grid>
                <hr className={classes.visibleSeparator} />
                <AddComment postId={postId} />
                <Comments comments={comments} />
            </Grid>
        )
        const expandButton = authenticated ? (
            <Tooltip title="expand details" placement="top">
                <IconButton onClick={this.handleOpen} className={classes.btnUnfolded} >
                    <UnfoldMoreIcon color="primary"/>
                </IconButton>
            </Tooltip>
        ) : (
            <Tooltip title="expand details" placement="top">
                <IconButton component={Link} to="/login" className={classes.btnUnfolded} >
                    <UnfoldMoreIcon color="primary"/>
                </IconButton>
            </Tooltip>
        )
        return (
            <Fragment>
                {expandButton} 
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="addPost-dialog-title"  fullWidth maxWidth="sm">
                    <Tooltip title="close" placement="bottom">
                        <IconButton onClick={this.handleClose} className={classes.exitButton} >
                            <CloseIcon color="secondary"/>
                        </IconButton>
                    </Tooltip>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

PostDetails.propTypes = {
    getPost: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    userHandle: PropTypes.string.isRequired,
    postId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    post: state.data.post,
    authenticated: state.user.authenticated,
    UI : state.UI
})

const mapActionToProps = {
    getPost
}
export default connect(mapStateToProps , mapActionToProps)(withStyles(styles)(PostDetails))

