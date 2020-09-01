import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

//Redux
import { connect } from 'react-redux'
import { deletePost } from '../../redux/actions/dataActions'
//MUI Core
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
//MUI Icons
import DeleteIcon from '@material-ui/icons/Delete'

const styles = {
    deleteButton: {
        position:'absolute',
        left: '90%',
        top: '10%' 
    }
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export class DeletePost extends Component {
    constructor(){
        super();
        this.state = {
            open: false
        }
    }
    handleOpen = () => {
        this.setState({
            open: true
        })
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }
    handleDelete = () => {
        this.props.deletePost(this.props.postId)
        this.handleClose()
    }
    render() {
        const { classes } = this.props  
        return (
            <Fragment>
                <Tooltip title="delete">
                    <IconButton className={classes.deleteButton} onClick={this.handleOpen}>
                        <DeleteIcon color="secondary" />
                    </IconButton>
                </Tooltip>
                <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    maxWidth="sm"
                    onClose={this.handleClose}
                    aria-labelledby="delete-dialog-slide-title"
                    aria-describedby="delete-dialog-slide-description"
                >
                    <DialogTitle id="delete-dialog-slide-title">{"Are You sure want to delete?"}</DialogTitle>
                    <DialogActions>
                    <Button onClick={this.handleClose}  color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleDelete} variant="contained" color="secondary">
                        Delete
                    </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

DeletePost.propTypes = {
    classes: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired
}


const mapActionToProps = {
    deletePost
}

export default connect(null, mapActionToProps)(withStyles(styles)(DeletePost))
