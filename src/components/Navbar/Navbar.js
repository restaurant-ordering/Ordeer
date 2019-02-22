import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { auth } from '../../firebase/firebase'
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
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// import { convertColorToString } from 'material-ui/utils/colorManipulator';
const styles = {
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
		marginLeft: 10,
		cursor: 'default'
	},
	logo: {
		cursor: 'pointer'
	},
	Navbar: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	logoContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	userInfo: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	badge: {
		top: '90%',
		right: -4,
	}
};

const Navbar = props => {
	const { classes } = props;
	const [redirect, activateRedirect] = useState(false)
	const page = props.page

	//this will work like the componentDidMount, checking for a currently logged in user on our firebase Auth
	useEffect(() => {
		auth.onAuthStateChanged(async (user) => {
			if (user) {
				let restaurantCheck = await checkRestaurantEmail(user.email)
				let adminCheck = await checkAdminEmail(user.email)
				let newUser = user
				adminCheck ? newUser.isAdmin = true : restaurantCheck ? newUser.isRestaurant = true : newUser = newUser
				props.updateUser(newUser)
			}
		})
	}, [])


	const linkToHome = () => {
		if(page!=='home'){
			activateRedirect(true)
		}
	}

	return (
		<>
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar className={classes.Navbar}>
						<div className={classes.logoContainer} onClick={linkToHome}>
							<img className={classes.logo} src={Ordeer} alt='Ordeer logo' height="80px" width="100px" />
							<Typography variant="h6" color="inherit" align="left" text='center' className={classes.grow}>
								Ordeer
							</Typography>
						</div>
						<div className={classes.userInfo}>
							{	// only display cart icon on order page if user has a cart
								props.cart.length>0 && 
								<IconButton aria-label="Cart">
									<Badge badgeContent={props.cart.length} color="primary" classes={{ badge: classes.badge }}>
										<ShoppingCartIcon />
									</Badge>
								</IconButton>
							}
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
						</div>
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
