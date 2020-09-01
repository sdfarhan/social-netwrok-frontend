import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import signupIcon from '../images/add.png'
import PropTypes from 'prop-types'
//MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';
//Redux
import { connect } from 'react-redux'
import { signupUser } from '../redux/actions/userActions' 
const styles = (theme) => ({
    ...theme.custom,
    circularProgress: {
        position: 'absolute'
    }
})
export class signup extends Component {
    apiUrl = 'https://us-central1-socialnetwork-5be42.cloudfunctions.net/api';
    
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {}
        }
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            loading: true,
        })
        let newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }
        this.props.signupUser(newUserData, this.props.history);
    }

    handleChange = (e) => {
        this.setState({ 
            [e.target.name]: e.target.value
        })
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            })
        }
    }

    render() {
        const {classes, UI: { loading }} = this.props
        const {errors} = this.state
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src={signupIcon} alt="Signup Icon" className={classes.staticImage}/>
                    <Typography variant="h3">
                        Sign Up
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit} >
                        <TextField
                            id="email"
                            label="Email"
                            name="email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            error={errors.email ? true : false}
                            helperText={errors.email}
                            onChange= {this.handleChange}
                            value={this.state.email}
                            className={classes.textField}
                        />
                        <TextField
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            error={errors.password ? true : false}
                            helperText={errors.password}
                            onChange= {this.handleChange}
                            value={this.state.password}
                            className={classes.textField}
                        />
                        <TextField
                            id="confirmPassword"
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            variant="outlined"
                            fullWidth
                            error={errors.confirmPassword ? true : false}
                            helperText={errors.confirmPassword}
                            onChange= {this.handleChange}
                            value={this.state.confirmPassword}
                            className={classes.textField}
                        />
                        <TextField
                            id="handle"
                            label="handle"
                            name="handle"
                            type="text"
                            variant="outlined"
                            fullWidth
                            error={errors.handle ? true : false}
                            helperText={errors.handle}
                            onChange= {this.handleChange}
                            value={this.state.handle}
                            className={classes.textField}
                        />
                        <Typography variant="body2" className={classes.error}>
                            {errors ? errors.general : ''}
                        </Typography>
                        <Button type="submit" disabled={loading} variant="contained" color="primary" className={classes.button} >
                            Signup{loading ? <CircularProgress size={"1.5rem"} className={classes.circularProgress} /> : ''}
                        </Button>
                        <br/>
                        <small>Already have an account ? click <Link to='/signup'>here</Link></small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>    
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI,
})

const mapActionsToProps = {
    signupUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(signup))
