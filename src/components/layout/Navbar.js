import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AddPost from '../post/AddPost'
import Notifications from './Notifications'

//MUI
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar' 
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
//MUI Icons
import HomeIcon from '@material-ui/icons/Home'

export class Navbar extends Component {
    render() {
        const AuthenticatedLinks = (
            <Fragment>
                <AddPost />
                <Tooltip title="Home">
                    <IconButton component={Link} to='/' >
                        <HomeIcon color="primary"/>
                    </IconButton>
                </Tooltip>
                <Notifications />
            </Fragment>
        )
        const unAuthenticatedLinks = (
            <Fragment>
                <Button color="inherit" component={Link} to='/'>Home</Button>
                <Button color="inherit" component={Link} to='/login'>Login</Button>
                <Button color="inherit"component={Link} to='/signup'>Signup</Button>
            </Fragment>
        )
        return (
        <AppBar>
            <Toolbar className="nav-container">
             {this.props.authenticated ? AuthenticatedLinks : unAuthenticatedLinks}
            </Toolbar>
        </AppBar>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}
const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})
export default connect(mapStateToProps)(Navbar)
