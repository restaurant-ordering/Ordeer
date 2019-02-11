// import { auth } from 'firebase'
import firebase from 'firebase'
import {googleProvider} from '../../src/firebase/firebase'

// const login = async (req, res, next) => {
// 	let user
// 	let result = await auth.signInWithPopup(googleProvider).then(result => {
// 		user = result.user
// 	})
// 	if (result) {
// 		try {
// 			res.status(200).send(user)
// 		} catch {
// 			res.status(400).send('Could not login')
// 		}
// 	}
// }
const register = async (req, res, next) => {
	const restaurantsRef = firebase.database().ref('restaurants')
	let result = await firebase
		.database()
		.ref('restaurants')
		.once('value')
		.then(res => {
			return res.val()
		})
	let filterResult
	for (let i = 1; i < result.length; i++) {
		if (result[i].email == req.body.email) {
			filterResult = result[i]
		}
	}
	if (!filterResult) {
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
	// login,
	register
}
