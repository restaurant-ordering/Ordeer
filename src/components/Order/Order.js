import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Category from './MenuContainer/Category'
import Cart from './CartContainer/Cart/Cart'
import Navbar from '../Navbar/Navbar'
import { connect } from 'react-redux'
import './Order.css'
// import { app } from 'firebase';
import uniqid from 'uniqid';

const Order = props => {

	//stores cart in state
	const [cart, updateCart] = useState([])
	//stores all of the restaurants
	const [restaurants, updateRestaurants] = useState([])
	const [orderId, updateOrderID] = useState([])
	const [flipped, flip] = useState(false)
	const [total, updateTotal] = useState(0)

	const getOrderID = async () => {
		try {
			let response = await axios.get('/api/orderId')
			console.log('orderId', response.data)
			updateOrderID(response.data)
		}
		catch (error) {
			let response = await axios.post('/api/orders')
			updateOrderID(response.data)
		}
	}

	useEffect(() => { getOrderID() }, [])

	//function to get cart
	const getCart = async () => {
		try {
			const response = await axios.get(`/api/cart?orderId=${orderId}`)
			updateCart(response.data)
		} catch (error) {
			console.log(error)
		}
	}
	//function to post updated cart to db
	const putCart = async () => {
		try {
			if (cart.length) {
				await axios.put('/api/cart', { cart, orderId })
			}
		} catch (error) {
			console.log(error)
		}
	}
	//function to add item to cart
	const addToCart = async (menu_item, category, customize) => {
		//adds menu item to cart on state
		const item = restaurantObj.menus[Object.keys(restaurantObj.menus)[0]][category].filter(obj => obj.name === menu_item)[0]
		const itemWithKey = {...item, key: uniqid(), customization: customize}
		let newTotal = +total + +item.price.replace(/[^\d.]/g, '')
		updateTotal(newTotal.toFixed(2))
		updateCart([...cart, itemWithKey])
	}

	const removeItem = async (key) => {
		const index = cart.findIndex(obj => { return obj.key === key })
		const newCart = [...cart]
		let item = newCart.splice(index, 1)
		let newTotal = +total - +item[0].price.replace(/[^\d.]/g, '')
		updateTotal(newTotal.toFixed(2))
		updateCart(newCart)
	}
	//gets all the restaurants from the backend
	const getRestaurants = async () => {
		try {
			const response = await axios.get('/api/restaurants')
			//convert response to array of restaurant objects
			let restaurantArray = []
			for (let i in response.data) {
				response.data[i].name = i
				restaurantArray.push(response.data[i])
			}
			updateRestaurants(restaurantArray)
		} catch (error) {
			console.log(error)
		}
	}
	//gets the path from react router and returns the restaurant name
	const filterlocation = () => {
		return props.location.pathname.split('/')[2]
	}
	//gets cart on mount
	useEffect(() => { getCart() }, [orderId])
	//gets restaurants on mount
	useEffect(() => { getRestaurants() }, [])
	//posts cart after items are added
	useEffect(() => { putCart() }, [cart])
	//the name of the current restaurant
	const restaurantname = filterlocation()
	//gets current restaurant object from list of all restaurants
	const restaurantObj = restaurants.filter(restaurant => restaurant.name === restaurantname)[0]

	const flipCard = (num) => {
		flip(num)
	}
	//set up to map over menu items
	let categories = []
	if (restaurantObj) {
		//push category components into array
		for (let i in restaurantObj.menus[Object.keys(restaurantObj.menus)[0]]) {
			categories.push(<Category flipped={flipped} flipCard={flipCard} addToCart={addToCart} key={i} items={restaurantObj.menus[Object.keys(restaurantObj.menus)[0]][i]} category={i} />)
		}
	}

	return (
		<div>
			<Navbar cart={cart} restaurant={filterlocation()} page="order"/>
			<div className="orderPage">
				<div className="categoryContainer">
					{categories}
				</div>
				{cart.length > 0 && <Cart user={props.user} total={total} orderId={orderId} restaurantname={restaurantname} removeItem={removeItem} cart={cart} />}
			</div>
		</div>
	)
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Order);
