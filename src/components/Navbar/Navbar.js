import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {auth, googleProvider} from '../../firebase/firebase'
import {updateUser} from '../../ducks/reducer'
import {connect} from 'react-redux'
import './Navbar.css'

const Navbar = props => {
	const [user, updateUser] = useState({})
	console.log(user)
	return (
		<div className='Navbar_Container'>
			<Link to='/home'>
				<div className='Navbar_Login'>
					<p
						className='Navbar_Login_Text'
						onClick={() =>
							auth.signInWithPopup(googleProvider).then(result => {
								const user = result.user
								props.updateUser(result.user)
							})
						}>
						{' '}
						Login{' '}
					</p>
				</div>
			</Link>
		</div>
	)
}
const mapStateToProps = state => state
export default connect(
	mapStateToProps,
	{updateUser}
)(Navbar)
