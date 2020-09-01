import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
//components

//MUI Core
import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import MuiLink from '@material-ui/core/Link'

//MUI Icons
import LocationOn from '@material-ui/icons/LocationOn'
import CalendarToday from '@material-ui/icons/CalendarToday'

 
const styles = (theme) => ({
    ...theme.custom
})

export class Profile extends Component {
    handleLogout = () => {
        this.props.logoutuser();
    }
    render() {
        const { 
            classes,
            user: { handle, createdAt, imageUrl, bio, location },
            } = this.props;
        let profileMarker =  (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <hr/>
                    <div className="profile-details">
                        <div className="image-wrapper">
                            <img src={imageUrl} alt="profile" className="profile-image"/>
                        </div>
                        <MuiLink component={Link} to={`/user/${handle}`} variant="h5" color="primary">
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
                </div>
            </Paper>
        )         
        return profileMarker
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

export default (withStyles(styles)(Profile))
