import React, {useState, useEffect} from 'react'
import axios from 'axios';
import RestaurantCard from './RestaurantCard/RestaurantCard';
import FilterBar from './FilterBar/FilterBar';

const Home = props => {

	const [restaurants, updateRestaurants] = useState()
	
	const getRestaurants = () => {
		axios.get('/api/restaurants')
		.then(response=>{
			console.log(response)
			//updateRestaurants(response.data)
		})
		.catch(err=>console.log(err))
	}
	
	useEffect(getRestaurants, [])
	
	return (
		<>
		</>
	)
}

export default Home
