import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Order = props => {

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
	useEffect(getRestaurants, [])
	//gets current restaurant object from list of all restaurants
	const restaurantObj = restaurants.filter(restaurant=>restaurant.name===restaurantname)[0]

	console.log(restaurantObj)

	return (
		<>
		</>
	)
}

export default Order
