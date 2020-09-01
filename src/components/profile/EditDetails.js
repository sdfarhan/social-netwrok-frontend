import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { updateUserDetails } from '../../redux/actions/userActions'
//Redux
import { connect } from 'react-redux'
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
import EditIcon from '@material-ui/icons/Edit'

const styles = (theme) => ({
    ...theme.custom,
    edit: {
        float: "right"
    }
})

export class EditDetails extends Component {
    constructor(){
        super();
        this.state = {
            bio: '',
            location: '',
            open: false
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
        this.mapUserDetailsToState(this.props.credentials)
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }
    handleUpdate = () => {
        const userDetails = {
            bio: this.state.bio,
            location: this.state.location
        }
        this.props.updateUserDetails(userDetails)
        this.handleClose()
    }
    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            location: credentials.location ? credentials.location : '',
        })
    }

    componentDidMount(){
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials)
    }

    render() {
        const {classes}  = this.props
        return (
            <Fragment>
                <Tooltip title="Edit Details" placement="top">
                    <IconButton onClick={this.handleOpen} className={classes.edit}>
                        <EditIcon color="primary" />
                    </IconButton>
                </Tooltip>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" maxWidth="sm">
                    <DialogTitle id="form-dialog-title">Edit Your Details</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            id="bio"
                            name="bio"
                            label="Bio"
                            placeholder="Tell something about yuorself"
                            type="text"
                            margin="dense"
                            className={classes.TextField}
                            value={this.state.bio}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            id="location"
                            name="location"
                            label="Location"
                            placeholder="Where do you live"
                            type="text"
                            margin="dense"
                            className={classes.TextField}
                            value={this.state.location}
                            onChange={this.handleChange}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}  color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleUpdate} variant="contained" color="primary">
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

EditDetails.propTypes = {
    updateUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    credentials: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials,
})

export default connect(mapStateToProps, { updateUserDetails })(withStyles(styles)(EditDetails))
