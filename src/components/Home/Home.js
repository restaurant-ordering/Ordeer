import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import FilterBar from './FilterBar/FilterBar';
import RestaurantCard from './RestaurantCard/RestaurantCard';

const Home = props => {

	const [restaurants, updateRestaurants] = useState([])
	
	const getRestaurants = () => {
		axios.get('/api/restaurants')
		.then(response=>{
			console.log(response)
			//updateRestaurants(response.data)
		})
		.catch(err=>console.log(err))
	}

	useEffect(getRestaurants, [])
	
	const map = restaurants.map(restaurant=>{
		return <RestaurantCard restaurant={restaurant} />
	})

	return (
		<>
		<Navbar/>
		<FilterBar updateRestaurants={updateRestaurants}/>
		{map}
		</>
	)
}

export default Home
