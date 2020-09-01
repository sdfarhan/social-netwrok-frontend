import React, { Component } from 'react'
import PropTypes from 'prop-types'
//Redux
import { connect } from 'react-redux'
import { addComment } from '../../redux/actions/dataActions'
//MUI Core
import withStyles from '@material-ui/core/styles/withStyles'
import { Grid } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
const styles = (theme) => ({
    ...theme.custom,
    buttonDiv: {
        textAlign: 'center'
    } 
})
export class AddComment extends Component {
    constructor(){
        super()
        this.state = {
            comment: ''
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.addComment(this.props.postId, this.state.comment)
        this.setState({
            comment: ''
        })
    }
    render() {
        const { classes, authenticated } = this.props
        return (
            authenticated ? (
            <Grid item sm={12}>
                <form onSubmit={this.handleSubmit}>
                    <TextField 
                        name="comment"
                        label="Comment on this post"
                        type="text"
                        placeholder="Type here"
                        rows="3"
                        multiline
                        onChange={this.handleChange}
                        value={this.state.comment}
                        fullWidth
                        className={classes.textField}
                    >
                    </TextField>
                    <div className={classes.buttonDiv}>
                        <Button 
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={!this.state.comment}
                            className={classes.button}
                        >
                            Comment
                        </Button>
                    </div>
                    <hr className={classes.visibleSeparator} />
                </form>
            </Grid>) : null
        )
    }
}

AddComment.propTypes = {
    classes: PropTypes.object.isRequired,
    addComment: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
    postId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

const mapActionToProps = {
    addComment
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(AddComment))
