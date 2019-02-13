import React, {useState} from 'react';
import axios from 'axios';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

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
			<>
				<TextField value={name} onChange={(e)=>updateName(e.target.value)} placeholder="restaurant name" name="name"/>
				<TextField value={owner} onChange={(e)=>{updateOwner(e.target.value)}} placeholder="owner name" name="owner"/>
				<TextField value={email} onChange={(e)=>{updateEmail(e.target.value)}} placeholder="email" name="email"/>
				<RaisedButton onClick={captureBasicInfo}>Next</RaisedButton>
			</>
		: //if restaurant object is not empty, add address
			<>
				<TextField value={address} onChange={(e)=>{updateAddress(e.target.value)}} placeholder="address" name="address"/>
				<TextField value={city} onChange={(e)=>{updateCity(e.target.value)}} placeholder="city" name="city"/>
				<TextField value={state} onChange={(e)=>{updateState(e.target.value)}} placeholder="state" name="state"/>
				<TextField value={zip} onChange={(e)=>{updateZip(e.target.value)}} placeholder="zip code" name="zip"/>
				<RaisedButton onClick={captureAddress}>Submit</RaisedButton>
			</>
	)
}

export default CreateRestaurant;