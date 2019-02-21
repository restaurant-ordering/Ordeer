import {createData} from './components/Admin/RestaurantTable/'
import { firebase, auth, googleProvider } from './firebase/firebase'
import { login, logout, checkAdminEmail, checkRestaurantEmail } from './functions/functions'

describe('createData', () => {
	it('return an object with an id property that is one higher than the id in global scope', () => {
		let id = 0
		let expectedResult = 1
		let actualResult = createData('name', 'address', 'city', 'state', 'zip', 'email')
		expect(actualResult.id).toBe(expectedResult)
	})
})

describe('checkRestaurantEmail', ()=>{
	it('returns true for a valid restaurant email', async ()=>{
		let email = 'kayceeshipley@gmail.com'
		expect(await checkRestaurantEmail(email)).toBeTruthy()
	})
	it('returns false for an invalid restaurant email', async ()=>{
		let email = "ordeerapp@gmail.com"
		let actualResult = await checkRestaurantEmail(email)
		expect(actualResult).toBeFalsy()
	})
})

describe('checkAdminEmail', ()=>{
	it('returns true for an valid Admin email', async ()=>{
		let email = "ordeerapp@gmail.com"
		let actualResult = await checkAdminEmail(email)
		expect(actualResult).toBeTruthy()
	})
	it('returns false for an invalid Admin email', async ()=>{
		let email = 'kayceeshipley@gmail.com'
		let actualResult = await checkAdminEmail(email)
		expect(actualResult).toBe(false)
	})
})
