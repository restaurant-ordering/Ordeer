import React, {useState} from 'react';
import CreateRestaurant from './CreateRestaurant/CreateRestaurant';
import CreateMenu from './CreateMenu/CreateMenu';

const Register = props => {

	const [restaurant, updateRestaurant] = useState({})

	return (
		<CreateRestaurant updateRestaurant={updateRestaurant}/>
	)
}

export default Register;
