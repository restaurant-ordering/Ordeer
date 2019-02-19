import React, {useState, useEffect} from 'react';
import MenuForm from '../../Forms/MenuForm/MenuForm';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

const CreateMenu = props => {

	const [menu, updateMenu] = useState({})
	const [redirect, activateRedirect] = useState(false)

	let restaurantName;
	let menuName;
	let categories;

	if(props.restaurant){
		restaurantName = Object.keys(props.restaurant)[0]
	} else {
		restaurantName = '???'
	}
	console.log('menu', menu)

	if(Object.keys(menu).length>0){
		menuName = Object.keys(menu)[0]
		let preformattedCategories = Object.values(menu)[0].categories
		for(let i in preformattedCategories){
			let name = preformattedCategories[i].name
			let menu_items = preformattedCategories[i].menu_items
			categories = Object.assign({}, categories, {[name]:menu_items})
		}
		console.log(categories)
	}

	const submitMenu = async () => {
		if(Object.keys(menu).length>0){
			console.log('submitting menu')
			console.log('restaurantName', restaurantName, 'menuName', menuName, 'categories', categories)
			try{
				await axios.post('/api/add-menus', {restaurantName, menuName, categories})
				console.log('menu submitted')
			}catch (error){
				console.log(error)
			}
			activateRedirect(true)
		} else {
			console.log('first render')
		}
	}

	useEffect(()=>{submitMenu()},[menu])

	return (
		<>
			{redirect&&<Redirect to='/home'/>}
			<MenuForm updateMenu={updateMenu}/>
		</>
	)
}

export default CreateMenu;
