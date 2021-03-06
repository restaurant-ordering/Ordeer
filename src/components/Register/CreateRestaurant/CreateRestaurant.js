import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper'


const styles = {
	paper: {
		width: 500,
		padding: 5,
		height: 'auto',
		display: 'flex',
		marginTop: 200,
		flexDirection: 'column',
		justifyContent: 'center',
		margin: 'auto'
	}
}
const CreateRestaurant = props => {
	const { classes } = props;
	const [values, setValues] = useState({
		restaurantObj: {},
		address: '',
		city: '',
		state: '',
		zip: '',
		email: '',
		owner: '',
		name: '',
		image: ''
	})

	const onChange = e => {
		setValues({ ...values, [e.target.name]: e.target.value })
	}

	const {
		restaurantObj,
		address,
		city,
		state,
		zip,
		email,
		owner,
		name,
		image,
	} = values

	const captureBasicInfo = (e) => {
		e.preventDefault()
		let restaurantObject = { owner, email, image }
		setValues({ ...values, restaurantObj: restaurantObject })
	}

	const captureAddress = async (e) => {
		e.preventDefault()
		let restaurant = {
			[name]: {
				owner,
				email,
				image,
				addresses: {
					[address]: {
						city,
						state,
						zip
					}
				}
			}
		}
		try {
			console.log('submitting restaurant', restaurant)
			const response = await axios.post('/api/register', restaurant)
			console.log('submission successful', response)
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
			<Paper className={classes.paper} elevation={1}>
				<TextField value={name} onChange={onChange} placeholder="restaurant name" name="name" />
				<TextField value={owner} onChange={onChange} placeholder="owner name" name="owner" />
				<TextField value={email} onChange={onChange} placeholder="email" name="email" />
				<TextField value={image} onChange={onChange} placeholder="logo image url" name="image" />
				<Button onClick={captureBasicInfo}>Next</Button>
			</Paper>
			: //if restaurant object is not empty, add address
			<Paper className={classes.paper} elevation={1}>
				<TextField value={address} onChange={onChange} placeholder="address" name="address" />
				<TextField value={city} onChange={onChange} placeholder="city" name="city" />
				<TextField value={state} onChange={onChange} placeholder="state" name="state" />
				<TextField value={zip} onChange={onChange} placeholder="zip code" name="zip" />
				<Button onClick={captureAddress}>Submit</Button>
			</Paper>
	)
}
CreateRestaurant.propTypes = {
	classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(CreateRestaurant);
