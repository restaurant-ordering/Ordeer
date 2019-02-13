import React, { useState } from 'react';
import MenuDetails from './MenuDetails';
import CategoryDetails from './CategoryDetails';
import ItemDetails from './ItemDetails';
import MenuConfirmation from './MenuConfirmation';
import {Redirect} from 'react-router-dom';

//receiving updateMenu as props 

const MenuForm = (props) =>{

	const [step, changeStep] = useState(1)
	const [menu_name, changeMenuName] = useState('')
	const [categories, changeCategories] = useState('')
	const [category_name, changeCategoryName] = useState('')
	const [menu_item, changeMenuItem] = useState('')
	const [image, changeImage] = useState('')
	const [price, changePrice] = useState('')
	const [description, changeDescription] = useState('')
	const [customization, changeCustomization] = useState('')

	// Handle the Input Field Change Function
	const handleChange = input => e => {
		switch(input){
			case 'menu_name': 
			changeMenuName(e.target.value)
			break;
			case 'categories':
			changeCategories(e.target.value)
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

	const values = { menu_name, categories, category_name, menu_item, image, price, description, customization};

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
		/>
		);
		case 3:
		// Directs user to the FirstItemDetails Page
		return (
		<ItemDetails
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