// import { firebase, auth, googleProvider } from '../../src/firebase/firebase'
const { firebase } = require('../../src/firebase/firebase')

const checkRestaurantEmail = async email => {
	try {
		let ref = await firebase.database().ref('restaurants')
		let refResult = await ref.once('value')
		let result = await refResult.val()
		let filterResult
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
	register
}
