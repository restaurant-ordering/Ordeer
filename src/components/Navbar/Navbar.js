import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { auth, googleProvider } from '../../firebase/firebase'
import { updateUser } from '../../ducks/reducer'
import { connect } from 'react-redux'
import { checkAdminEmail, checkRestaurantEmail } from '../../functions/functions'
import './Navbar.css'

const Navbar = props => {
	const [user, updateUser] = useState({})
	const [redirect, activateRedirect] = useState(false)
	return (
		<>
			<div className='Navbar_Container'>
				<div className='Navbar_Login'>
					<p
						className='Navbar_Login_Text'
						onClick={async () => {
							const result = await auth.signInWithPopup(googleProvider)
							let adminCheck = await checkAdminEmail(result.user.email)
							let restaurantCheck = await checkRestaurantEmail(result.user.email)
							let user = result.user
							adminCheck ? result.user.isAdmin = true : restaurantCheck ? result.user.isRestaurant = true : user = user
							props.updateUser(user)
							console.log(user)
							activateRedirect(true)
						}}>
						{' '}
						Login{' '}
					</p>
				</div>
			</div>
			{//redirects you to home after you are logged in using activateRedirect()
				redirect ? <Redirect to="/home" /> : <></>
			}
		</>
	)
}
const mapStateToProps = state => state
export default connect(
	mapStateToProps,
	{ updateUser }
)(Navbar)
