import React, {useState} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

const CreateRestaurant = props => {

	const [restaurantObj, updateRestaurantObj] = useState({})
	const [address, updateAddress] = useState('')
	const [city, updateCity] = useState('')
	const [state, updateState] = useState('')
	const [zip, updateZip] = useState('')
	const [email, updateEmail] = useState('')
	const [owner, updateOwner] = useState('')
	const [redirect, activateRedirect] = useState(false)

	const captureAddress = async (e) => {
		e.preventDefault()
		let restaurant = {owner, email, addresses: {
			address: {
				city,
				state,
				zip
			}
		}}
		axios.post('/api/register', {restaurant})
		.then(response=> activateRedirect(true))
		.catch(err=>console.log(err))
	}

	const captureBasicInfo = (e) => {
		e.preventDefault()
		let restaurantObject = {owner, email}
		updateRestaurantObj(restaurantObject)
	}

	return (
		!restaurantObj.email
		? 
		<form onSubmit={captureBasicInfo}>
			<input value={owner} onChange={(e)=>{updateOwner(e.target.value)}} placeholder="owner name" name="owner"></input>
			<input value={email} onChange={(e)=>{updateEmail(e.target.value)}} placeholder="email" name="email"></input>
			<button>Next</button>
		</form>
		:
		redirect
		?
		<Redirect to="/home"></Redirect>
		:
		<form onSubmit={captureAddress}>
			<input value={address} onChange={(e)=>{updateAddress(e.target.value)}} placeholder="address" name="address"></input>
			<input value={city} onChange={(e)=>{updateCity(e.target.value)}} placeholder="city" name="city"></input>
			<input value={state} onChange={(e)=>{updateState(e.target.value)}} placeholder="state" name="state"></input>
			<input value={zip} onChange={(e)=>{updateZip(e.target.value)}} placeholder="zip code" name="zip"></input>
			<button>Submit</button>
		</form>
	)
}

export default CreateRestaurant;