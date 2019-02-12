import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';

const RestaurantCard = props => {

	const restaurant = props.restaurant
	const [redirect, activateRedirect] = useState(false)

	return (
		//only render a restaurant card if there is a restaurant passed in as props
		restaurant.name
		?
		<div className="RestaurantCard" onClick={()=>activateRedirect(true)}>
			<img src={restaurant.imgUrl} alt="restaurant logo"></img>
			<p>{restaurant.name}</p>
			{redirect?<Redirect to={`/order/${restaurant.name}`}/>:<></>}
		</div>
		:
		<></>
	)
}

export default RestaurantCard;
