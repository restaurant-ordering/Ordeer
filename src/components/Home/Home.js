import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { connect } from 'react-redux'
import FilterBar from './FilterBar/FilterBar';
import RestaurantCard from './RestaurantCard/RestaurantCard';
import Admin from '../Admin/Admin'

import './Home.css';

const Home = props => {
	const [display, changeDisplay] = useState('user')
	const [searchResult, setSearchResult] = useState('')

	//gets query params from url to store search input from home screen
	const getLandingSearchResults = () => {
		if (props.location.search) {
			setSearchResult(props.location.search.split('=')[1])
		}
	}

	useEffect(() => { getLandingSearchResults() }, [])

	const checkUser = () => {
		if (props.user.isRestaurant) {
			changeDisplay('restaurant')
		} else if (props.user.isAdmin) {
			changeDisplay('admin')
		}

	}

	useEffect(checkUser, [props.user])

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
				<FilterBar restaurants={restaurants} landingSearchResults={searchResult} updateDisplayedRestaurants={updateDisplayedRestaurants} />
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
						<Navbar />
						<Admin />
					</div>
					:
					<div>
						<p>{display}</p>
					</div>
	)
}
const mapStateToProps = state => state
export default connect(mapStateToProps)(Home);
