import { firebase, auth } from '../firebase/firebase'
// import {checkPropTypes} from 'prop-types'

export const checkRestaurantEmail = async email => {
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
export const checkAdminEmail = async email => {
	try {
		let ref = await firebase.database().ref('users').once('value')
		let result = await ref.val()
		let filterResult
		for (let i = 1; i < result.length; i++) {
			if (result[i].email == email && result[i].isAdmin) {
				filterResult = result[i]
			}
		}
		return filterResult
	} catch{
		console.log('could not check if admin')
	}

}
export const logout = async () => {
	auth().signOut()

}
