import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import {auth, googleProvider} from '../../firebase/firebase'
import {updateUser} from '../../ducks/reducer'
import {connect} from 'react-redux'
import Ordeer from '../../Images/ordeer.png'
import Googler from '../../Images/Google2.png'
import './Navbar.css'

const Navbar = props => {
	const [user, updateUser] = useState({})
	const [redirect, activateRedirect] = useState(false)
	return (
		<>
			<div className='Navbar_Container'>
				<div className="Navbar_Container_Logo">
					<img className="Navbar_Logo" src = { Ordeer} />
				</div>
				<div className="Navbar_Container_Login" 
					onClick={ async() =>{
						 const result = await auth.signInWithPopup(googleProvider)
						 props.updateUser(result.user)
						 activateRedirect(true)
					}}
				>
					<div className="Navbar_Container_Login_Logo">
						<img className="Navbar_Login_Logo" src = { Googler } />
					</div>
					<div className="Navbar_Container_Login_Text">
						<p className="Navbar_Login_Text"> Login </p>
					</div>
				</div>
			</div>
			{//redirects you to home after you are logged in using activateRedirect()
			redirect?<Redirect to="/home"/>:<></>
			}
		</>
	)
}
const mapStateToProps = state => state
export default connect(
	mapStateToProps,
	{updateUser}
)(Navbar)
