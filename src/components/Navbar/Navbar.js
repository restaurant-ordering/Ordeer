import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { auth, googleProvider } from '../../firebase/firebase'
import { updateUser } from '../../ducks/reducer'
import { connect } from 'react-redux'
import Ordeer from '../../Images/ordeer.png'
import Googler from '../../Images/Google2.png'
import { checkAdminEmail, checkRestaurantEmail, alreadyUser, postUser } from '../../functions/functions'
import './Navbar.css'
import { convertColorToString } from 'material-ui/utils/colorManipulator';


const Navbar = props => {
	// const [user, updateUser] = useState({})
	const [redirect, activateRedirect] = useState(false)
	//this will work like the componentDidMount, checking for a currently logged in user on our firebase Auth
	useEffect(() => {
		auth.onAuthStateChanged(user => {
			if (user) {
				updateUser({ user })
			}
		})
	}, [])
	const logout = () => {
		auth.signOut().then((res) => { props.updateUser({}) })
	}
	return (
		<>
			<div className='Navbar_Container'>
				<div className='Navbar_Login'>
					<div className="Navbar_Container_Logo">
						<img className="Navbar_Logo" src={Ordeer} />
					</div>
				</div>
				{!Object.keys(props.user).length ?
					<div className="Navbar_Container_Login"
						onClick={async () => {
							const result = await auth.signInWithPopup(googleProvider)
							let adminCheck = await checkAdminEmail(result.user.email)
							// console.log(adminCheck)
							let restaurantCheck = await checkRestaurantEmail(result.user.email)
							// console.log(restaurantCheck)
							let user = result.user
							let jsonifiedUser = JSON.parse(JSON.stringify(user))
							console.log(jsonifiedUser)
							let userCheck = await alreadyUser(user)
							console.log(userCheck)
							if (!userCheck) { postUser(jsonifiedUser) }

							adminCheck ? result.user.isAdmin = true : restaurantCheck ? result.user.isRestaurant = true : user = user
							console.log('this is the user', user)
							props.updateUser(user)
							//i'm going to fix this post user to db function soon.
							activateRedirect(true)
						}}
					>
						<div className="Navbar_Container_Login_Logo">
							<img className="Navbar_Login_Logo" src={Googler} />
						</div>
						<div className="Navbar_Container_Login_Text">
							<p className="Navbar_Login_Text"> Login </p>
						</div>
					</div> : <button onClick={() => logout()}>logout</button>}
				{//redirects you to home after you are logged in using activateRedirect()
					redirect ? <Redirect to="/home" /> : <></>
				}
			</div>
		</>
	)
}
const mapStateToProps = state => state
export default connect(
	mapStateToProps,
	{ updateUser }
)(Navbar)
