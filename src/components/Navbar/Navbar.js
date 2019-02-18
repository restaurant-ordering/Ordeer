import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { auth, googleProvider } from '../../firebase/firebase'
import { updateUser } from '../../ducks/reducer'
import { connect } from 'react-redux'
import Ordeer from '../../Images/ordeer.png'
// import Googler from '../../Images/Google2.png'
import { login, logout, checkAdminEmail, checkRestaurantEmail } from '../../functions/functions'
// import './Navbar.css'
//material ui imports
import PropTypes from 'prop-types'
import Avatar from './Avatar/Avatar'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import { convertColorToString } from 'material-ui/utils/colorManipulator';
const styles = {
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	}
};

const Navbar = props => {
	const { classes } = props;
	const [redirect, activateRedirect] = useState(false)

	//this will work like the componentDidMount, checking for a currently logged in user on our firebase Auth
	useEffect(() => {
		auth.onAuthStateChanged(async (user) => {
			console.log('user on auth listener', user)
			if (user) {
				let restaurantCheck = await checkRestaurantEmail(user.email)
				let adminCheck = await checkAdminEmail(user.email)
				let newUser = user
				adminCheck ? newUser.isAdmin = true : restaurantCheck ? newUser.isRestaurant = true : newUser = newUser
				props.updateUser(newUser)
			}
		})
	}, [])

	return (
		<>
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h6" color="inherit" align="left" text='center' className={classes.grow}>
							Ordeer
						</Typography>
						<Grid container justify="flex-start" alignItems="center">
							<img src={Ordeer} alt='Ordeer logo' height="80px" width="100px" />
						</Grid>
						{!Object.keys(props.user).length ?
							<Button color="inherit" onClick={async () => {
								let result = await login()
								console.log('result from login', result)
								props.updateUser(result)
								result && activateRedirect(true)
							}}>Login</Button>
							: <Avatar profile={props.user.photoURL}
								anchorEl={props.anchorEl}
								handleClose={props.handleClose}
								handleClick={props.handleClick}
								logout={logout}
							/>
						}
					</Toolbar>
				</AppBar>
				{redirect ? <Redirect to="/home" /> : <></>}
			</div>
		</>
	)
}
Navbar.propTypes = {
	classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => state
export default
	connect(
		mapStateToProps,
		{ updateUser }
	)(withStyles(styles)(Navbar))

// export default withStyles(styles)(Navbar);
