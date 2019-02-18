import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { endianness } from 'os';

const styles = {
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,

    // float: 'right
  }
};

function ImageAvatars(props) {
  const { classes } = props;
  return (
    <Grid container justify="flex-end" alignItems="center">
      <Avatar alt="User Avatar" src={props.profile} className={classes.bigAvatar} onClick={props.handleClick} />
      <Menu
        id="simple-menu"
        anchorEl={props.anchorEl}
        open={Boolean(props.anchorEl)}
        onClose={props.handleClose}
      >
        <MenuItem onClick={props.logout}>Logout</MenuItem>
      </Menu>
    </Grid>
  )
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageAvatars);
