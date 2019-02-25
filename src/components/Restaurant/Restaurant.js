import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Paper from '@material-ui/core/Paper'
import './Restaurant.css'
import RestaurantTabs from './RestaurantTabs';

const Restaurant = (props) => {
	//get all restaurants, find restaurant name that matches user email
	const getMyRestaurant = async () => {
		let response = await axios.get('/api/restaurants')
		let restaurantsObj = response.data
		for (let i in restaurantsObj) {
			if (restaurantsObj[i].email === props.user.email) {
				// console.log(i)
				return i
			}
		}
	}

	const [restaurant, updateRestaurant] = useState('')

	useEffect(() => {
		(async () => {
			let myRestaurantName = await getMyRestaurant()
			updateRestaurant(myRestaurantName)
		})()
	}, [])

	//get all orders based on restaurant name
	const [orders, updateOrders] = useState('')

	const getMyOrders = async () => {
		let response = await axios.get(`/api/restaurant-orders/${restaurant}`)
		return response.data
	}

	useEffect(() => {
		(async () => {
			if (restaurant.length) {
				let myOrders = await getMyOrders()
				updateOrders(myOrders)
			}
		})()
	}, [restaurant])

	const completeOrder = async (orderName) => {
		console.log(orderName)
		let order = await axios.get('/api/orders?orderId=' + orderName)
		console.log(order.data)
		await axios.post('/api/complete-order', order.data)
		let allOrders = await getMyOrders()
		updateOrders(allOrders)
		console.log(allOrders)
	}
	return (
		<Paper className="restaurant_homepage">
			<RestaurantTabs orders={orders} completeOrder={completeOrder} />
		</Paper>
	)
}
const mapStateToProps = (state) => state

export default connect(mapStateToProps)(Restaurant);
