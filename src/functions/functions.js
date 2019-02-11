import firebase from '../firebase/firebase'
import {checkPropTypes} from 'prop-types'
module.exports = {
	login: () => {
		auth.signInWithPopup(provider).then(result => {
			const user = result.user
			this.setState({user})
		})
	},
	postUser: user => {
		const usersRef = firebase.database().ref('users')
		const userRef = firebase.database().ref(`users/${user.id}`)
		let isRestaurant = firebase.database().ref(`users/${user.id.isRestaurant}`)

		let newUser = {
			first_name: user.firstName,
			last_name: user.lastName,
			photoUrl: user.photoUrl,
			email: user.email,
			isRestaurant: isRestaurant ? true : false
		}
		usersRef.push(newUser)
	}
}
