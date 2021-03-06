import React, { useState } from 'react';
import CreateRestaurant from './CreateRestaurant/CreateRestaurant';
import CreateMenu from './CreateMenu/CreateMenu';

const Register = props => {

	const [restaurant, updateRestaurant] = useState({})

	return (
		Object.keys(restaurant).length === 0
			?
			<>
				<CreateRestaurant updateRestaurant={updateRestaurant} />
			</>
			:
			<>
				<CreateMenu restaurant={restaurant} />
			</>
	)
}

export default Register;
