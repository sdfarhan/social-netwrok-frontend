import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
//MUI 
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const styles = (theme) => ({
    ...theme.custom,
    commentImage: {
        width: '100%',
        height: 100,
        objectFit: 'cover',
        borderRadius: '50%'
    },
})

export class Comments extends Component {

    render() {
        dayjs.extend(relativeTime)
        const { classes, comments } = this.props
        return (
            <Grid container >
                {comments.map( (Comment, index) => {
                    const { comment, userImage, userHandle, createdAt } = Comment
                    return (
                        <Fragment key={createdAt}>
                            <Grid item sm={12}>
                                <Grid container spacing={2}>
                                    <Grid item sm={3}>
                                        <img src={userImage} alt={userHandle} className={classes.commentImage}/>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <div className={classes.commentData}>   
                                            <Typography variant="h5" color="primary" component={Link} to={`/users/${userHandle}`}>
                                                @{userHandle}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" >
                                                {dayjs(createdAt).fromNow()}  
                                            </Typography>
                                            <hr className={classes.invisibleSeparator}/>
                                            <Typography variant="body1">{comment}</Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <hr className={classes.visibleSeparator}/>          
                        </Fragment>
                    )
                } )}
            </Grid>    
        )
    }
}

Comments.propTypes = {
    classes: PropTypes.object.isRequired,
    Comments: PropTypes.array.isRequired
}

export default withStyles(styles)(Comments)
