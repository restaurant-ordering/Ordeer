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
	
	if(menu.categories){
		menuName = Object.keys(menu)[0]
		categories = Object.values(menu.categories)
	}

	const submitMenu = async () => {
		if(Object.keys(menu).length>0){
			console.log('submitting menu')
			try{
				await axios.post('/api/add-menus', {restaurantName, menuName, categories})
			}catch (error){
				console.log(error)
			}
			activateRedirect(true)
		} else {
			console.log('first render')
		}
	}
	//find a way to prevent useEffect from firing when component mounts
	useEffect(()=>{submitMenu()},[menu])
	
	return (
		<>
			{redirect&&<Redirect to='/home'/>}
			<MenuForm updateMenu={updateMenu}/>
		</>
	)
}

export default CreateMenu;