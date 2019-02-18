import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { connect } from 'react-redux'
import FilterBar from './FilterBar/FilterBar';
import RestaurantCard from './RestaurantCard/RestaurantCard';

import './Home.css';

const Home = props => {
	console.log(props.user)

	const [display, changeDisplay] = useState('user')

	if(props.user.isRestaurant){
		changeDisplay('restaurant')
	} else if (props.user.isAdmin) {
		changeDisplay('admin')
	}

	const [restaurants, updateRestaurants] = useState([])
	const [displayedRestaurants, updateDisplayedRestaurants] = useState([])

	const getRestaurants = async () => {
		const response = await axios.get('/api/restaurants')
		//convert response to array of restaurant objects
		let restaurantArray = []
		for (let i in response.data) {
			response.data[i].name = i
			restaurantArray.push(response.data[i])
		}
		updateRestaurants(restaurantArray)
		updateDisplayedRestaurants(restaurantArray)
	}

	useEffect(() => { getRestaurants() }, [])

	const map = displayedRestaurants.map(restaurant => {
		return (
			<RestaurantCard key={restaurant.name} restaurant={restaurant} />
		)
	})

	return (
		display === 'user'
		?
		<div className="Home_Container">
			<Navbar />
			<FilterBar restaurants={restaurants} updateDisplayedRestaurants={updateDisplayedRestaurants} />
			<div className="RestaurantCard_Container">
				{map}
			</div>
		</div>
		:
		display === 'restaurant'
		?
		<div>
			<Navbar />
			<p>Restaurant view</p>
		</div>
		:
		display === 'admin'
		?
		<div>
			<Navbar/>
			<p>Admin view</p>
		</div>
		:
		<div>
			<p>{display}</p>
		</div>
	)
}
const mapStateToProps = state => state
export default connect(mapStateToProps)(Home);
