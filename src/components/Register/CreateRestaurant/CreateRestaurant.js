import React, {useState} from 'react';
import axios from 'axios';

const CreateRestaurant = props => {

	const [restaurantObj, updateRestaurantObj] = useState({})
	const [address, updateAddress] = useState('')
	const [city, updateCity] = useState('')
	const [state, updateState] = useState('')
	const [zip, updateZip] = useState('')
	const [email, updateEmail] = useState('')
	const [owner, updateOwner] = useState('')
	const [name, updateName] = useState('')
	
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
		try {
			console.log('submitting restaurant', restaurant)
			const response = await axios.post('/api/register', {restaurant})
			console.log('submission successful',response)
		} catch (error) {
			console.log('submission not successful')
			console.log(error)
		}
		props.updateRestaurant(restaurant)
	}


	return (
		//if restaurant object is empty, capture basic info
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