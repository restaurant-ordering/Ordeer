import {auth} from 'firebase'
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
module.exports = {
	login
}
