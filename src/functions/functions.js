import { firebase, auth, googleProvider } from '../firebase/firebase'
import { updateUser } from '../ducks/reducer'

export const checkRestaurantEmail = async email => {
	try {
		let ref = await firebase.database().ref('restaurants').once('value')
		let result = await ref.val()
		console.log('this is the result', result)
		let filterResult
		for (let i in result) {
			if (result[i].email == email) {
				filterResult = true
			}
		}
		return filterResult
	} catch{
		console.log('could not check if restaurant')
	}
}
export const checkAdminEmail = async email => {
	try {
		let ref = await firebase.database().ref('admins').once('value')
		let result = await ref.val()
		let filterResult
		for (let i in result) {
			if (result[i].email == email && result[i].isAdmin) {
				filterResult = true
			}
		}
		return filterResult
	} catch{
		console.log('could not check if admin')
		return false
	}
}
export const alreadyUser = async (user) => {
	try {
		console.log('got to alreadyUser')
		const ref = await firebase.database().ref('users')
		const result = await ref.once('value')
		const users = await result.val()
		for (let i = 0; i < users.length; i++) {
			if (users[i].email == user.email) {
				console.log('adding to db')
				return true
			}
			console.log('already user')
			return false
		}
	} catch{
		console.log('couldnt check if user')
	}
}
export const login = async () => {
	const result = await auth.signInWithPopup(googleProvider)
	console.log('this is the email we are checking', result.user.email)
	let adminCheck = await checkAdminEmail(result.user.email)
	console.log(adminCheck)
	let restaurantCheck = await checkRestaurantEmail(result.user.email)
	console.log(restaurantCheck)
	let user = result.user
	console.log(jsonifiedUser)
	let userCheck = await alreadyUser(user)
	console.log(userCheck)
	adminCheck ? user.isAdmin = true : restaurantCheck ? user.isRestaurant = true : user = user
	let jsonifiedUser = JSON.parse(JSON.stringify(user))
	console.log(jsonifiedUser)
	if (!userCheck) { postUser(jsonifiedUser) }
	console.log('this is the user', user)
	return user
	// props.updateUser(user)
}
export const postUser = async (user) => {
	let ref = firebase.database().ref('users')
	let username = user.displayName
	let objectToPush = {
		[username]: user
	}
	ref.update(objectToPush)
}
export const logout = () => {
	auth.signOut().then((res) => { updateUser({}) })
}
