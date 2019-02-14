<<<<<<< HEAD
import React, {useState, useEffect} from 'react'
=======
import React, {useState} from 'react';
import Search from '../../../Images/Search.png';
import './FilterBar.css';
>>>>>>> master

const FilterBar = props => {

	const [searchTerm, changeSearchTerm] = useState('')
	const [searchCity, changeSearchCity] = useState('')

	const search = (e) => {
		switch(e.target.name){
			case 'changeSearchTerm':
				changeSearchTerm(e.target.value)
					console.log('filter',props.restaurants.filter(restaurant => restaurant.name.includes(searchTerm)))
					props.updateDisplayedRestaurants(props.restaurants.filter(restaurant => restaurant.name.includes(searchTerm)))
				break;
			case 'changeSearchCity':
				changeSearchCity(e.target.value)
					props.updateDisplayedRestaurants(props.restaurants.filter(restaurant => {
						let includesCity = []
						for(let i in restaurant.addresses){
							includesCity.push(restaurant.addresses[i].city.includes(searchCity))
						}
						return includesCity
					}))
				break;
			default:
				console.log('no match')
		}
	}

	return (
		<div className = "FilterBar_Container">
			<div className = "Filter_Input_Container">
				<div className = "Filter_Input_Button_Container">
					<img className = "Filter_Input_Button_Icon" src = { Search } />
				</div>
				<input 
					className = "Filter_Input" 
					type = "text" 
					value = {searchTerm} 
					name = "changeSearchTerm" 
					placeholder = "Search by Name" 
					type = "text" 
					onChange={search} 
				/>
			</div>
			<div className = "Filter_Input_Container">
				<div className = "Filter_Input_Button_Container">
					<img className = "Filter_Input_Button_Icon" src = { Search } />
				</div>
				<input 
					className = "Filter_Input" 
					type = "text" 
					value = {searchCity} 
					name = "changeSearchCity" 
					placeholder = "Search by City" 
					onChange={search} 
				/>
			</div>
		</div>
	)
}

export default FilterBar
{/* <p>Filter restaurants by name</p>
<input value={searchTerm} name="changeSearchTerm" onChange={search}/>
<p>Filter restaurants by city</p>
<input value={searchCity} name="changeSearchCity" onChange={search}/> */}