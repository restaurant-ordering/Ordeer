// import { firebase, auth, googleProvider } from '../../src/firebase/firebase'
const { firebase, auth, googleProvider } = require('../../src/firebase/firebase')

const checkRestaurantEmail = async email => {
	let ref = await firebase.database().ref('restaurants').once('value')
	let result
	if (ref) { async res => { result = await res.val() } }
	try {
		let filterResult
		for (let i = 1; i < result.length; i++) {
			if (result[i].email == email) {
				filterResult = result[i]
			}
		}
		return filterResult
	} catch{
		return 'could not check if restaurant'
	}
}
const checkAdminEmail = async email => {
	let ref = await firebase.database().ref('users').once('value')
	let result
	if (ref) { async res => { result = await res.val() } }
	try {
		let filterResult
		for (let i = 1; i < result.length; i++) {
			if (result[i].email == email && result[i].isAdmin) {
				filterResult = result[i]
			}
		}
		return filterResult
	} catch{
		return 'could not check if admin'
	}
}
const login = async (req, res, next) => {
	let result = await checkRestaurantEmail(req.body.email)
	let adminResult = await checkAdminEmail(req.body.email)
	if (result) {
		//send to restaurant home page
		try {
			let result = auth().signInWithPopup(googleProvider)
			if (result) {
				result => {
					let user = result.user
					user.isRestaurant = true
					res.status(200).send(user)
				}
			}
		} catch {
			res.status(400).send('Could not login')
		}
	} else if (adminResult) {
		try {
			let result = auth().signInWithPopup(googleProvider)
			if (result) {
				result => {
					let user = result.user
					user.isAdmin = true
					res.status(200).send(user)
				}
			}
		} catch {
			res.status(400).send('Could not login')
		}
	} else {
		//send to user home page
		let result = auth().signInWithPopup(googleProvider)
		if (result) {
			result => {
				// let user = result.user
				res.status(200).send(result.user)
			}
		}
	}
}
const logout = async (req, res, next) => {
	let result = await auth().signOut()
	if (result) {
		try { res.status(200).send('Logout Successful') } catch{ res.status(400).send('Logout Unsuccessful') }
	}
}
const register = async (req, res, next) => {
	const restaurantsRef = firebase.database().ref('restaurants')
	let result = await checkRestaurantEmail(req.body.email)
	if (!result) {
		try {
			// restaurantsRef.child(req.body.name).set(req.body)
			let info = req.body
			restaurantsRef.update(info)
			res.sendStatus(200)
		} catch {
			console.log('there was an error')
		}
	} else {
		res.status(400).send('There is already a restaurant with that email')
	}
}
module.exports = {
	login,
	logout,
	register
}
