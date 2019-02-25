import React, { useState, useEffect } from 'react';
import Search from '../../../Images/Search.png';
import './FilterBar.css';

const FilterBar = props => {
	console.log(props.restaurants)
	const [searchTerm, changeSearchTerm] = useState('')
	const [searchCity, changeSearchCity] = useState(props.landingSearchResults)

	const filter = () => {
		if (searchTerm && searchCity) {
			let searchFilter = props.restaurants.filter(restaurant => restaurant.name.includes(searchTerm))
			let doubleFilter = searchFilter.filter(restaurant => {
				let includesCity = []
				for (let i in restaurant.addresses) {
					includesCity.push(restaurant.addresses[i].city.includes(searchCity))
				}
				return includesCity
			})
			props.updateDisplayedRestaurants(doubleFilter)
		} else if (searchTerm) {
			let searchFilter = props.restaurants.filter(restaurant => restaurant.name.includes(searchTerm))
			props.updateDisplayedRestaurants(searchFilter)
		} else if (searchCity) {
			let cityFilter = []
			let restaurants = Object.values(props.restaurants)
			for (let i = 0; i < restaurants.length; i++) {
				if (restaurants[i].addresses[Object.keys(restaurants[i].addresses)[0]].city.includes(searchCity)) {
					cityFilter.push(restaurants[i])
				}
			}
			props.updateDisplayedRestaurants(cityFilter)
		} else {
			props.updateDisplayedRestaurants(props.restaurants)
		}
	}
	const getInitialCity = () => {
		changeSearchCity(props.landingSearchResults)
	}

	useEffect(getInitialCity, [props.landingSearchResults])

	useEffect(filter, [searchTerm, searchCity])
	

	const search = (e) => {
		switch (e.target.name) {
			case 'changeSearchTerm':
				changeSearchTerm(e.target.value)
				break;
			case 'changeSearchCity':
				changeSearchCity(e.target.value)
				break;
			default:
				console.log('no match')
		}
	}

	return (
		<div className="FilterBar_Container">
			<div className="Filter_Input_Container">
				<div className="Filter_Input_Button_Container">
					<img className="Filter_Input_Button_Icon" alt="" src={Search} />
				</div>
				<input
					className="Filter_Input"
					type="text"
					value={searchTerm}
					name="changeSearchTerm"
					placeholder="Search by Name"
					onChange={search}
				/>
			</div>
			<div className="Filter_Input_Container">
				<div className="Filter_Input_Button_Container">
					<img className="Filter_Input_Button_Icon" alt="" src={Search} />
				</div>
				<input
					className="Filter_Input"
					type="text"
					value={searchCity}
					name="changeSearchCity"
					placeholder="Search by City"
					onChange={search}
				/>
			</div>
		</div>
	)
}

export default FilterBar
