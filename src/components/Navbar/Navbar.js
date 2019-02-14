import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { auth, googleProvider } from '../../firebase/firebase'
import { updateUser } from '../../ducks/reducer'
import { connect } from 'react-redux'
import Ordeer from '../../Images/ordeer.png'
import Googler from '../../Images/Google2.png'
import { checkAdminEmail, checkRestaurantEmail, alreadyUser, postUser } from '../../functions/functions'
import './Navbar.css'


const Navbar = props => {
	const [user, updateUser] = useState({})
	const [redirect, activateRedirect] = useState(false)
	return (
		<>
			<div className='Navbar_Container'>
				<div className='Navbar_Login'>
					<div className="Navbar_Container_Logo">
						<img className="Navbar_Logo" src={Ordeer} />
					</div>
				</div>
				<div className="Navbar_Container_Login"
					onClick={async () => {
						const result = await auth.signInWithPopup(googleProvider)
						console.log(result)
						let adminCheck = await checkAdminEmail(result.user.email)
						let restaurantCheck = await checkRestaurantEmail(result.user.email)
						let user = result.user
						// let jsonifiedUser = JSON.parse(JSON.stringify(user))
						adminCheck ? result.user.isAdmin = true : restaurantCheck ? result.user.isRestaurant = true : user = user
						console.log('this is the user', user)
						props.updateUser(user)
						//i'm going to fix this post user to db function soon.
						// let userCheck = await alreadyUser(user)
						// 	(!userCheck) && postUser(jsonifiedUser)
						activateRedirect(true)
					}}
				>
					<div className="Navbar_Container_Login_Logo">
						<img className="Navbar_Login_Logo" src={Googler} />
					</div>
					<div className="Navbar_Container_Login_Text">
						<p className="Navbar_Login_Text"> Login </p>
					</div>
				</div>
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
