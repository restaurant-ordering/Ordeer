// import { firebase, auth, googleProvider } from '../../src/firebase/firebase'
const {firebase} = require('../../src/firebase/firebase')

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
	} catch {
		console.log('could not check if restaurant')
	}
}
const register = async (req, res, next) => {
	try {
		console.log(Object.keys(req.body)[0])
		const restaurantsRef = firebase.database().ref('restaurants')
		let result = await checkRestaurantEmail(req.body.email)
		if (!result) {
			const restaurantName = Object.keys(req.body)[0]
			console.log('restaurantName :', restaurantName)
			const restaurantCheck = await firebase
				.database()
				.ref('restaurants')
				.child(restaurantName)
			const restaurantCheckVal = await restaurantCheck.once('value')
			const restaurantResult = await restaurantCheckVal.val()
			console.log('restaurantResult: ', restaurantResult)
			if (!restaurantResult) {
				console.log('updating')
				restaurantsRef.update(req.body)
				res.sendStatus(200)
			} else {
				res.status(400).send('There is already a restaurant with that name')
			}
		}
	} catch (error){
		console.log(error)
		res.status(400).send('There was an error')
	}
}
module.exports = {
	register
}
