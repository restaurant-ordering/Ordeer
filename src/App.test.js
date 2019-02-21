import {createData} from './components/Admin/RestaurantTable/'
import React from 'react'
import ReactDOM from 'react-dom'
import { checkAdminEmail, checkRestaurantEmail } from './functions/functions'
import { updateUser } from './ducks/reducer'
import Register from './components/Register/Register'
import CreateMenu from './components/Register/CreateMenu/CreateMenu'
import MenuForm from './components/Forms/MenuForm/MenuForm'
import Admin from './components/Admin/Admin'

describe('createData', () => {
	it('return an object with an id property that is one higher than the id in global scope', () => {
		let expectedResult = 1
		let actualResult = createData('name', 'address', 'city', 'state', 'zip', 'email')
		expect(actualResult.id).toBe(expectedResult)
	})
	it('inceases the id in global scope', () => {
		let expectedResult = 2
		let actualResult = createData('name', 'address', 'city', 'state', 'zip', 'email')
		expect(actualResult.id).toBe(expectedResult)
	})
	it('return an object with 1 more key than it had when passed in', () => {
		let expectedResult = 7
		let actualResult = Object.keys(createData('name', 'address', 'city', 'state', 'zip', 'email')).length
		expect(actualResult).toBe(expectedResult)
	})
	it('returns an object that contains all the keys passed in', () => {
		let expectedResult = true
		let actualResult = createData('name')
		expect(actualResult.hasOwnProperty('name')).toBe(expectedResult)
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

describe('updateUser', ()=> {
	it('returns an object with a type and a payload', ()=>{
		const user = {name:'literally anything',email:'hi'}
		const actualResult = updateUser(user)
		expect(actualResult).toHaveProperty('type')
		expect(actualResult).toHaveProperty('payload')
	})
	it('returns an object with a type of UPDATE_USER', ()=>{
		const user = {name:'literally anything',email:'hi'}
		const actualResult = updateUser(user)
		expect(actualResult.type).toBe('UPDATE_USER')
	})
	it('returns an object with a payload matching the user passed in', ()=>{
		const user = {name:'literally anything',email:'hi'}
		const actualResult = updateUser(user)
		expect(actualResult.payload).toBe(user)
	})
})

it('Register renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Register />, div);
	ReactDOM.unmountComponentAtNode(div);
});

it('CreateMenu renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<CreateMenu />, div);
	ReactDOM.unmountComponentAtNode(div);
});

it('MenuForm renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<MenuForm />, div);
	ReactDOM.unmountComponentAtNode(div);
});

it('Admin renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Admin />, div);
	ReactDOM.unmountComponentAtNode(div);
});
