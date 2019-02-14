import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import FilterBar from './FilterBar/FilterBar';
import RestaurantCard from './RestaurantCard/RestaurantCard';

import './Home.css';

const Home = props => {

	const [restaurants, updateRestaurants] = useState([])
	const [displayedRestaurants, updateDisplayedRestaurants] = useState([])
	
	const getRestaurants = async () => {
		const response = await axios.get('/api/restaurants')
		console.log(response)
		//convert response to array of restaurant objects
		let restaurantArray = []
		for(let i in response.data){
			response.data[i].name = i
			restaurantArray.push(response.data[i])
		}
		updateRestaurants(restaurantArray)
		updateDisplayedRestaurants(restaurantArray)
	}
	
	useEffect(()=>{getRestaurants()}, [])

	console.log('displayed',displayedRestaurants)
	
	const map = displayedRestaurants.map(restaurant=>{
		return (
			<RestaurantCard key={restaurant.name} restaurant={restaurant} />
		)
	})

	return(
		<div className = "Home_Container">
			<Navbar />
			<FilterBar restaurants={restaurants} updateDisplayedRestaurants={updateDisplayedRestaurants}/>
			<div className = "RestaurantCard_Container">
				<h1> Restaurant Card </h1>
			</div>
			{/* {map} */}
		</div>
	)
}

export default Home;