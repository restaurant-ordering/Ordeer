import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { auth } from '../../../firebase/firebase'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { updateUser } from '../../../ducks/reducer'
import { connect } from 'react-redux'
// import { endianness } from 'os';

const styles = {
  bigAvatar: {
    margin: 10,
    width: 60,
	height: 60,
	cursor: 'pointer'
  }
};

function ImageAvatars(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }
  function logout() {
    auth.signOut().then((res) => {
      console.log('logged out')
      props.updateUser({})
    })
  }
  function handleClose() {
    setAnchorEl(null);
  }
  const { classes } = props;
  return (
    <Grid container justify="flex-end" alignItems="center">
      <Avatar alt="User Avatar" src={props.profile} className={classes.bigAvatar} onClick={handleClick} />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </Grid>
  )
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => state
export default connect(mapStateToProps, { updateUser })(withStyles(styles)(ImageAvatars));
