import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import FilterBar from './FilterBar/FilterBar';
import RestaurantCard from './RestaurantCard/RestaurantCard';

const Home = props => {

	const [restaurants, updateRestaurants] = useState([])
	const [displayedRestaurants, updateDisplayedRestaurants] = useState([])
	
	const getRestaurants = () => {
		axios.get('/api/restaurants')
		.then(response=>{
			console.log(response)
			//convert response to array of restaurant objects
			let restaurantArray = []
			for(let i in response.data){
				response.data[i].name = i
				restaurantArray.push(response.data[i])
			}
			updateRestaurants(restaurantArray)
			updateDisplayedRestaurants(restaurantArray)
		})
		.catch(err=>console.log(err))
	}
	
	useEffect(getRestaurants, [])

	console.log('displayed',displayedRestaurants)
	
	const map = displayedRestaurants.map(restaurant=>{
		return (
			<RestaurantCard key={restaurant.name} restaurant={restaurant} />
		)
	})

	return (
		<>
		<Navbar/>
		<FilterBar restaurants={restaurants} updateDisplayedRestaurants={updateDisplayedRestaurants}/>
		{map}
		</>
	)
}

export default Home
