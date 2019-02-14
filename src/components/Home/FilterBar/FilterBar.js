import React, {useState} from 'react';
import './FilterBar.css';

const FilterBar = props => {
	console.log(props.restaurants)

	const [searchTerm, changeSearchTerm] = useState('')
	const [searchCity, changeSearchCity] = useState('')

	const search = async (e) => {
		switch(e.target.name){
			case 'changeSearchTerm':
				await changeSearchTerm(e.target.value)
				if(searchTerm.length>0){
					props.updateDisplayedRestaurants(props.restaurants.filter(restaurant => restaurant.name.includes(searchTerm)))
				} else {
					props.updateDisplayedRestaurants(props.restaurants)
				}
				break;
			case 'changeSearchCity':
				await changeSearchCity(e.target.value)
				if(searchCity.length>0){
					props.updateDisplayedRestaurants(props.restaurants.filter(restaurant => {for(let i in restaurant.addresses){return restaurant.addresses[i].city.includes(searchCity)}}))
				} else {
					props.updateDisplayedRestaurants(props.restaurants)
				}
				break;
		}
	}

	return (
		<div className = "FilterBar_Container">
			<h1> FilterBar </h1>
		</div>
	)
}

export default FilterBar
{/* <p>Filter restaurants by name</p>
<input value={searchTerm} name="changeSearchTerm" onChange={search}/>
<p>Filter restaurants by city</p>
<input value={searchCity} name="changeSearchCity" onChange={search}/> */}