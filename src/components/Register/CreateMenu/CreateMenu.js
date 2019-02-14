import React, {useState, useEffect} from 'react';
import MenuForm from '../../Forms/MenuForm/MenuForm';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

const CreateMenu = props => {

	const [menu, updateMenu] = useState({})
	const [redirect, activateRedirect] = useState(false)

	const submitMenu = async () => {
		if(Object.keys(menu).length>1){
			console.log('submitting menu')
			try{
				await axios.post('/api/add-menus', {menu})
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
			{redirect?<Redirect to='/home'/>:<></>}
			<MenuForm updateMenu={updateMenu}/>
		</>
	)
}

export default CreateMenu;