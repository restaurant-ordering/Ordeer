import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { connect } from 'react-redux'
import FilterBar from './FilterBar/FilterBar';
import RestaurantCard from './RestaurantCard/RestaurantCard';
import Admin from '../Admin/Admin'
import Restaurant from '../Restaurant/Restaurant'

import './Home.css';

const Home = props => {
	const [display, changeDisplay] = useState('user')
	const [searchResult, setSearchResult] = useState('')

	//gets query params from url to store search input from home screen
	const getLandingSearchResults = () => {
		if (props.location.search) {
			setSearchResult(props.location.search.split('=')[1])
			return props.location.search.split('=')[1]
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
	
	const [displayedRestaurants, updateDisplayedRestaurants] = useState([])
	const [restaurants, updateRestaurants] = useState([])

	const getRestaurants = async () => {
		const response = await axios.get('/api/restaurants')
		//convert response to array of restaurant objects
		let restaurantArray = []
		for (let i in response.data) {
			response.data[i].name = i
			restaurantArray.push(response.data[i])
		}
		updateRestaurants(restaurantArray)
		let cityFilter = []
		let searchCity = getLandingSearchResults()
		for (let i = 0; i < restaurantArray.length; i++) {
			if (restaurantArray[i].addresses[Object.keys(restaurantArray[i].addresses)[0]].city.includes(searchCity)) {
				cityFilter.push(restaurantArray[i])
			}
		}
		updateDisplayedRestaurants(cityFilter)
	}

	useEffect(() => { getRestaurants() }, [])

	const map = displayedRestaurants && displayedRestaurants.map(restaurant => {
		return (
			<RestaurantCard key={restaurant.name} restaurant={restaurant} />
		)
	})

	return (
		display === 'user'
			?
			<div className="Home_Container">
				<Navbar page="home"/>
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
					<Restaurant />
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