import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import ProfileSkeleton from '../../util/ProfileSkeleton'
//components
import EditDetails from '../profile/EditDetails'
//redux
import { connect } from 'react-redux' 
import { uploadImage, logoutuser } from '../../redux/actions/userActions'
 
//MUI Core
import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MuiLink from '@material-ui/core/Link'
import Tooltip from '@material-ui/core/Tooltip';

//MUI Icons
import LocationOn from '@material-ui/icons/LocationOn'
import CalendarToday from '@material-ui/icons/CalendarToday'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

 
const styles = (theme) => ({
    ...theme.custom
})

export class Profile extends Component {
    handleImageChange = (e) => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    } 
    handleEditPicture = (e) => {
        const fileinput = document.getElementById("imageUpload")
        fileinput.click();
    }
    handleLogout = () => {
        this.props.logoutuser();
    }
    render() {
        const { 
            classes,
            user : {credentials: { handle, createdAt, imageUrl, bio, location }, loading, authenticated }
            } = this.props;
        let profileMarker = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image"/>
                        <input 
                            type="file"
                            id="imageUpload"
                            hidden={true}
                            onChange={this.handleImageChange}
                        />
                        <Tooltip title="change image" placement="top-start" >
                            <IconButton onClick={this.handleEditPicture} className={classes.buttons}>
                                <AddAPhotoIcon color="primary"/>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <hr/>
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${handle}`} variant="h5" color="primary">
                            @{handle}
                        </MuiLink>
                        <hr/>
                        {bio && <Typography variant="body2">{bio}</Typography>}
                        <hr/>
                        {location && (
                            <Fragment>
                                <LocationOn color="primary" /> <span>{location}</span>
                                <hr/>
                            </Fragment>
                        )}
                        <CalendarToday color="primary" />{' '}
                        <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                    </div>
                    <Tooltip title="Logout" placement="top">
                        <IconButton onClick={this.handleLogout}>
                            <KeyboardReturn color="primary" />
                        </IconButton>
                    </Tooltip>
                    <EditDetails />
                </div>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    No Profile Found, Please Login Again
                </Typography>
                <div className={classes.buttons}>
                    <Button variant="contained" color="primary" component={Link} to='/login'>Login</Button>
                    <Button variant="contained" color="secondary" component={Link} to='/signup'>signup</Button>
                </div>
                
            </Paper>
        )) : <ProfileSkeleton/>        
        return profileMarker
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    uploadImage: PropTypes.func.isRequired,
    logoutuser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user
})
 const mapActionToProps = {
    uploadImage,
    logoutuser
 }
export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Profile))
