import React, {useState, useEffect} from 'react';
import MenuForm from '../../Forms/MenuForm/MenuForm';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

const CreateMenu = props => {

	const [menu, updateMenu] = useState({})
	const [redirect, activateRedirect] = useState(false)

	const submitMenu = async () => {
		try{
			await axios.post('/api/add-menus', {menu})
		}catch (error){
			console.log(error)
		}
		activateRedirect(true)
	}

	useEffect(()=>{submitMenu()},[menu])
	
	return (
		<>
			{redirect?<Redirect to='/home'/>:<></>}
			<MenuForm updateMenu={updateMenu}/>
		</>
	)
}

export default CreateMenu;