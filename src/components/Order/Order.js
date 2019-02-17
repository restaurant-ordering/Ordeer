import React, {useState, useEffect} from 'react'
import axios from 'axios'
import MenuCard from './MenuContainer/MenuCards/MenuCard'
import Cart from './CartContainer/Cart/Cart'

const Order = props => {
	//stores cart in state
	const [cart, updateCart] = useState([])
	//function to get cart
	const getCart = async () => {
		try {
			const response = await axios.get('/api/cart')
			console.log(response)
			// updateCart(response.data)
		} catch (error) {
			console.log(error)
		}
	}
	//function to post updated cart to db
	const putCart = async () => {
		try{
			if(cart.length){
				const response = await axios.put('/api/cart', cart)
				console.log(response)
			}
		} catch(error){
			console.log(error)
		}
	}
	//gets cart on mount
	useEffect(() => { getCart() }, [])
	//posts cart after items are added
	useEffect(()=>{ putCart()}, [cart])

	//function to add item to cart
	const addToCart = async (menu_item, category) => {
		console.log(menu_item)
		//adds menu item to cart on state
		const item = restaurantObj.menus.Default[category].filter(obj=>obj.name===menu_item)[0]
		updateCart([...cart, item])
		//posts cart and state to db
		//gets new cart from state
	}

	const filterlocation = () => {
		//gets the path from react router and returns the restaurant name
		return props.location.pathname.split('/')[2]
	}
	//the name of the current restaurant
	const restaurantname = filterlocation()
	//stores all of the restaurants
	const [restaurants, updateRestaurants] = useState([])
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
		} catch (error){
			console.log(error)
		}
	}
	//componentDidMount
	useEffect(()=>{getRestaurants()}, [])
	//gets current restaurant object from list of all restaurants
	const restaurantObj = restaurants.filter(restaurant=>restaurant.name===restaurantname)[0]

	let preMap = []
	let map;
	if(restaurantObj){
		//push objects within obj into an array
		for(let i in restaurantObj.menus.Default){
			preMap.push(i)
		}
		//map over that array to return menucards
		map = preMap.map(i=><MenuCard addToCart={addToCart} key={i} items={restaurantObj.menus.Default[i]} category={i}/>)
	}


	return (
		<div>
			{map}
			<Cart cart={cart}/>
		</div>
	)
}

export default Order
