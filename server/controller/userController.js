// import { firebase, auth, googleProvider } from '../../src/firebase/firebase'
const { firebase, auth, googleProvider } = require('../../src/firebase/firebase')

const checkRestaurantEmail = async email => {
	try {
		let ref = await firebase.database().ref('restaurants')
		let refResult = await ref.once('value')
		// console.log('this is ref in checkRestaurantEmail:', refResult)
		let result = await refResult.val()
		let filterResult
		// console.log('this is filterResult in checkRestaurantEmail:', filterResult)
		for (let i = 1; i < result.length; i++) {
			if (result[i].email == email) {
				filterResult = result[i]
			}
		}
		return filterResult
	} catch{
		console.log('could not check if restaurant')
	}
}
// const checkAdminEmail = async email => {
// 	try {
// 		let ref = await firebase.database().ref('users').once('value')
// 		let result = await ref.val()
// 		let filterResult
// 		for (let i = 1; i < result.length; i++) {
// 			if (result[i].email == email && result[i].isAdmin) {
// 				filterResult = result[i]
// 			}
// 		}
// 		return filterResult
// 	} catch{
// 		console.log('could not check if admin')
// 	}
// }
// const login = async (req, res, next) => {
// 	//i need to fix this one so please don't look at it too hard
// 	let result = await checkRestaurantEmail(req.body.email)
// 	let adminResult = await checkAdminEmail(req.body.email)
// 	if (result) {
// 		//send to restaurant home page
// 		try {
// 			let result = auth().signInWithPopup(googleProvider)
// 			if (result) {
// 				result => {
// 					let user = result.user
// 					user.isRestaurant = true
// 					res.status(200).send(user)
// 				}
// 			}
// 		} catch {
// 			res.status(400).send('Could not login -restaurant')
// 		}
// 	} else if (adminResult) {
// 		try {
// 			let result = auth().signInWithPopup(googleProvider)
// 			if (result) {
// 				result => {
// 					let user = result.user
// 					user.isAdmin = true
// 					res.status(200).send(user)
// 				}
// 			}
// 		} catch {
// 			res.status(400).send('Could not login -admin')
// 		}
// 	} else {
// 		try {
// 			auth().signInWithPopup(googleProvider)
// 			res.sendStatus(200)
// 		} catch {
// 			res.status(400).send("Could not login as user")
// 		}
// 	}
// }
const logout = async (req, res, next) => {
	auth().signOut()

}
const register = async (req, res, next) => {
	try {
		const restaurantsRef = firebase.database().ref('restaurants')
		let result = await checkRestaurantEmail(req.body.email)
		if (!result) {
			let info = req.body.restaurant
			restaurantsRef.update(info)
			res.sendStatus(200)
		}
	} catch {
		res.status(400).send('There is already a restaurant with that email')
	}
}
module.exports = {
	logout,
	register
}
