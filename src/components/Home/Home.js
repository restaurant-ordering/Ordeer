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
			//convert response to array of restaurant objects
			// let restaurantArray = []
			// for(let i in response.data){
			// 	restaurantArray.push(response.data[i])
			// }
			// updateRestaurants(restaurantArray)
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
		<FilterBar restaurants={restaurants} updateRestaurants={updateRestaurants}/>
		{map}
		</>
	)
}

export default Home
