import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Card from '@material-ui/core/Card'
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

	//view all orders for this restaurant
	let ordersMap = orders.length && orders.map((order, i) => {
		let cart = order.cart.map((cart_item, i) => {
			return (
				<Card className="cart_item" key={i}>
					<div>{cart_item.name}</div>
					<div>{cart_item.customize || 'No customization'}</div>
					<div>{cart_item.price}</div>
				</Card>
			)
		})
		return (
			<Card className="order_card" key={i}>
				<p>{order.user.displayName}</p>
				<p>{order.user.email}</p>
				<>{cart}</>
				<p>{order.price}</p>
			</Card>
		)
	})
	//mark if orders are ready
	return (
		<Paper className="restaurant_homepage">
			<RestaurantTabs orders={orders} />
		</Paper>
	)
}
const mapStateToProps = (state) => state

export default connect(mapStateToProps)(Restaurant);
