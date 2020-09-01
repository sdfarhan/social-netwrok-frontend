import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
//MUI Core
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'

//MUI Icons
import NotificationsIcon from '@material-ui/icons/Notifications'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ChatIcon from '@material-ui/icons/Chat'
//Redux
import { connect } from 'react-redux'
import { markNotificationsRead } from '../../redux/actions/userActions'
class Notifications extends Component {
    constructor(){
        super()
        this.state = {
            anchorEl: null
        }
    }
    handleOpen = e => {
        this.setState({anchorEl: e.target})
    }
    handleClose = () => {
        this.setState({anchorEl: null})
    }
    onMenuOpened = () => {
        let unReadNotifications = this.props.notifications
        .filter(notification => !notification.read)
        .map(notification => notification.notificationId)
        this.props.markNotificationsRead(unReadNotifications)
    }
    render() {
        dayjs.extend(relativeTime)
        const notifications = this.props.notifications
        const anchorEl = this.state.anchorEl
        
        let notificationIcon;
        if(notifications && notifications.length > 0){
            notifications.filter( notification => !notification.read ).length > 0 ? (
                notificationIcon = 
                <Badge
                    badgeContent={notifications.filter(notification => !notification.read).length}
                    color="secondary">
                    <NotificationsIcon />
                </Badge>
            ) : (
                notificationIcon =  <NotificationsIcon />
                )
            }
        else{
            notificationIcon =  <NotificationsIcon />    
        }
        let notificationsMarkup = notifications && notifications.length > 0 ? (
            notifications.map( notification => {
                const verbose = notification.type === 'like' ? "liked" : "commented on"
                const time = dayjs(notification.createdAt).fromNow()
                const iconColor = notification.read ? 'primary' : 'secondary'
                const icon = notification.type === 'like' ? (
                    <FavoriteIcon color={iconColor} style={{marginRight: 10}} />
                ) : (
                    <ChatIcon color={iconColor} style={{marginRight: 10}} />
                )
                return(
                    <MenuItem key={notification.createdAt} onClick={this.handleClose}>
                        {icon}
                        <Typography
                            component={Link}
                            color="default"
                            variant="body2"
                            to={`/users/${notification.recipient}/post/${notification.postId}`}
                            >
                            {notification.sender} {verbose} your post {time}
                        </Typography>
                    </MenuItem>
                )
            })
        ) : ( 
            <MenuItem onClick={this.handleClose}>
                You have no notifications yet
            </MenuItem> 
        )
        return(
             <Fragment>
                 <Tooltip title="Notifications" placement="top">
                    <IconButton aria-owns = {anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleOpen}
                        >
                        {notificationIcon}
                    </IconButton>
                 </Tooltip>
                 <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    onEntered={this.onMenuOpened}
                    > 
                    {notificationsMarkup}
                 </Menu>
             </Fragment>

        )
    }   
}

Notifications.propTypes = {
    notifications: PropTypes.array.isRequired,
    markNotificationsRead: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    notifications: state.user.notifications
})

const mapActionToProps = {
    markNotificationsRead
}

export default connect(mapStateToProps, mapActionToProps)(Notifications)
