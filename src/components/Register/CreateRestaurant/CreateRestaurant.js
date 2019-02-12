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
	const [name, updateName] = useState('')
	const [redirect, activateRedirect] = useState(false)
	
	const captureBasicInfo = (e) => {
		e.preventDefault()
		let restaurantObject = {owner, email}
		updateRestaurantObj(restaurantObject)
	}

	const captureAddress = async (e) => {
		e.preventDefault()
		let restaurant = {
			[name]:{
				owner, 
				email, 
				addresses: {
					address: {
						city,
						state,
						zip
					}
				}
			}
		}
		axios.post('/api/register', {restaurant})
		.then(response=> {
			props.updateRestaurant(restaurant)
			activateRedirect(true)
		})
		.catch(err=>console.log(err))
	}


	return (
		redirect
		? //after form is complete, redirect to home
			<Redirect to="/home"></Redirect>
		: //if restaurant object is empty, capture basic info
		!restaurantObj.email
		? 
			<form onSubmit={captureBasicInfo}>
				<input value={name} onChange={(e)=>updateName(e.target.value)} placeholder="restaurant name" name="name"/>
				<input value={owner} onChange={(e)=>{updateOwner(e.target.value)}} placeholder="owner name" name="owner"/>
				<input value={email} onChange={(e)=>{updateEmail(e.target.value)}} placeholder="email" name="email"/>
				<button>Next</button>
			</form>
		: //if restaurant object is not empty, add address
			<form onSubmit={captureAddress}>
				<input value={address} onChange={(e)=>{updateAddress(e.target.value)}} placeholder="address" name="address"/>
				<input value={city} onChange={(e)=>{updateCity(e.target.value)}} placeholder="city" name="city"/>
				<input value={state} onChange={(e)=>{updateState(e.target.value)}} placeholder="state" name="state"/>
				<input value={zip} onChange={(e)=>{updateZip(e.target.value)}} placeholder="zip code" name="zip"/>
				<button>Submit</button>
			</form>
	)
}

export default CreateRestaurant;