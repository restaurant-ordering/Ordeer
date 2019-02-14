import React, { useState } from 'react';
import MenuDetails from './MenuDetails';
import CategoryDetails from './CategoryDetails';
import ItemDetails from './ItemDetails';
import MenuConfirmation from './MenuConfirmation';
import {Redirect} from 'react-router-dom';

//receiving updateMenu as props 

const MenuForm = (props) =>{

	//MenuDetails
		//used to switch pages
		const [step, changeStep] = useState(1)
		//stores overall menu name
		const [menu_name, changeMenuName] = useState('')
		//stores the numer of categories
		const [categories, changeCategories] = useState('')
	//CategoryDetails
		//stores name of category currently being edited
		const [category_name, changeCategoryName] = useState('')
		//stores the number of menu items in the current category
		const [itemQuantity, changeItemQuantity] = useState('')
		//an array to store category objects
		const [category_details, changeCategoryDetails] = useState([])
	//ItemDetails
		//stores the name of the current menu item
		const [menu_item, changeMenuItem] = useState('')
		//stores the img url of the current menu item
		const [image, changeImage] = useState('')
		//stores the price of the current menu item
		const [price, changePrice] = useState('')
		//stores the description of the current menu item
		const [description, changeDescription] = useState('')
		//stores the customization options for the current menu item (should be an object)
		const [customization, changeCustomization] = useState('')
		//an array to store menu items for the current category
		const [menu_items, changeMenuItems] = useState([])

	// Handle the Input Field Change Function
	const handleChange = input => e => {
		switch(input){
			case 'menu_name': 
			changeMenuName(e.target.value)
			break;
			case 'itemQuantity': 
			changeItemQuantity(e.target.value)
			break;
			case 'categories':
			changeCategories(+e.target.value)
			break;
			case 'category_name':
			changeCategoryName(e.target.value)
			break;
			case 'menu_item':
			changeMenuItem(e.target.value)
			break;
			case 'image':
			changeImage(e.target.value)
			break;
			case 'price':
			changePrice(e.target.value)
			break;
			case 'description':
			changeDescription(e.target.value)
			break;
			case 'customization':
			changeCustomization(e.target.value)
			break;
			default:
			console.log('no case match')
		}
	};

	// Go to the Next Step Function
	const nextStep = () => {
		changeStep(step+1)
	};

	// Go to the Previous Step Function
	const prevStep = () => {
		changeStep(step-1)
	};

	const values = { itemQuantity, category_details, menu_name, categories, category_name, menu_item, image, price, description, customization, menu_items};

	const stateControllers = {changeMenuName, changeItemQuantity, changeCategories, changeCategoryName, changeMenuItem, changeImage, changePrice, changeDescription, changeCustomization, changeCategoryDetails, changeMenuItems}

	console.log('values', values)

	switch (step) {
		case 1:
		// Directs user to the MenuDetails Page
		return (
		<MenuDetails
			nextStep={nextStep}
			handleChange={handleChange}
			values={values}
		/>
		)
		case 2:
		// Directs user to the FirstCategoryDetails Page      
		return (
		<CategoryDetails
			nextStep={nextStep}
			prevStep={prevStep}
			handleChange={handleChange}
			values={values}
			stateControllers={stateControllers}
		/>
		);
		case 3:
		// Directs user to the FirstItemDetails Page
		return (
		<ItemDetails
			stateControllers={stateControllers}
			nextStep={nextStep}
			prevStep={prevStep}
			handleChange={handleChange}
			values={values}
		/>
		);
		case 4:
		// Directs user to the MenuConfirmation Page
		return (
		<MenuConfirmation
			nextStep={nextStep}
			prevStep={prevStep}
			values={values}
			updateMenu={props.updateMenu}
		/>
		)
		case 5:
		// Directs user back to homepage
		return <Redirect to='/home'/>;
		default:
		return <div>Error</div>
	}

}

export default MenuForm