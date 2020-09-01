import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
//Redux
import { connect } from 'react-redux'
import { addPost } from '../../redux/actions/dataActions'
//MUI Core
import withStyles from '@material-ui/core/styles/withStyles'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
//MUI Icons
import AddIcon from '@material-ui/icons/Add'

const styles = (theme) => ({
    ...theme.custom,
    edit: {
        float: "right"
    }
})


export class AddPost extends Component {
    constructor(){
        super();
        this.state = {
            post: '',
            open: false,
        }
    }

    handleChange = (e) => {
        this.setState({ 
            [e.target.name]: e.target.value
        })
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
    handleAddPost = () => {
        this.props.addPost(this.state.post)
        this.handleClose()
    }
    render() {
        const { classes } = this.props
        return (
            <Fragment>
                <Tooltip title="Add a post">
                    <IconButton onClick={this.handleOpen} >
                        <AddIcon color="primary"/>
                    </IconButton>
                </Tooltip>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="addPost-dialog-title"  fullWidth maxWidth="sm">
                    <DialogTitle id="addPost-dialog-title">What's on your Mind</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            id="post"
                            name="post"
                            placeholder="Type here"
                            type="text"
                            margin="dense"
                            multiline
                            rows="3"
                            className={classes.TextField}
                            value={this.state.post}
                            onChange={this.handleChange}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}  color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleAddPost} disabled={!this.state.post} variant="contained" color="primary">
                            Post
                        </Button>
                    </DialogActions>
                </Dialog>

            </Fragment>
        )
    }
}

AddPost.propTypes = {
    addPost: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
}


export default connect(null , { addPost })(withStyles(styles)(AddPost))
