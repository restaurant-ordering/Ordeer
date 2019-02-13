import React, {useState, useEffect} from 'react'

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
		<>
			<p>Filter restaurants by name</p>
			<input value={searchTerm} name="changeSearchTerm" onChange={search}/>
			<p>Filter restaurants by city</p>
			<input value={searchCity} name="changeSearchCity" onChange={search}/>
		</>
	)
}

export default FilterBar