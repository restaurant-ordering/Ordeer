import {firebase, auth, googleProvider} from '../../src/firebase/firebase'
import firebase from 'firebase'
const checkRestaurantEmail = async email => {
	let result = await firebase
		.database()
		.ref('restaurants')
		.once('value')
		.then(res => {
			return res.val()
		})
	let filterResult
	for (let i = 1; i < result.length; i++) {
		if (result[i].email == email) {
			filterResult = result[i]
		}
	}
	return filterResult
}
const checkAdminEmail = async email => {
	let result = await firebase
		.database()
		.ref('users')
		.once('value')
		.then(res => {
			return res.val()
		})
	if (result) {
		let filterResult
		for (let i = 1; i < result.length; i++) {
			if (result[i].email == email && result[i].isAdmin) {
				filterResult = result[i]
			}
		}
		return filterResult
	}
}
const login = async (req, res, next) => {
	let result = await checkRestaurantEmail(req.body.email)
	let adminResult = await checkAdminEmail(req.body.email)
	if (result) {
		//send to restaurant home page
		try {
			auth()
				.signInWithPopup(googleProvider)
				.then(result => {
					let user = result.user
					user.isRestaurant = true
					res.status(200).send(user)
				})
		} catch {
			res.status(400).send('Could not login')
		}
	} else if (adminResult) {
		try {
			auth()
				.signInWithPopup(googleProvider)
				.then(result => {
					let user = result.user
					user.isAdmin = true
					res.status(200).send(user)
				})
		} catch {
			res.status(400).send('Could not login')
		}
	} else {
		//send to user home page
		auth()
			.signInWithPopup(googleProvider)
			.then(result => {
				// let user = result.user
				res.status(200).send(result.user)
			})
	}
}
const logout = (req, res, next) => {
	auth()
		.signOut()
		.then(() => {
			res.status(200).send('Logout Successful')
		})
		.catch(err => console.log(err))
}
const register = async (req, res, next) => {
	const restaurantsRef = firebase.database().ref('restaurants')
	let result = await checkRestaurantEmail(req.body.email)
	if (!result) {
		try {
			let newRestaurant = req.body
			restaurantsRef.push(newRestaurant)
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
