import React, { useState } from 'react';
import MenuDetails from './MenuDetails';
import CategoryDetails from './CategoryDetails';
import ItemDetails from './ItemDetails';
import MenuConfirmation from './MenuConfirmation';
import {Redirect} from 'react-router-dom';

//receiving updateMenu as props 

const MenuForm = (props) =>{

		const [values, setValues] = useState({
			step: 1,
			menu_name: '',
			categories: '',
			category_name: '',
			itemQuantity: '',
			category_details: [],
			menu_item: '',
			image: '',
			price: '',
			description: '',
			customization: '',
			menu_items: []
		})

	const handleChange =  e => {
		setValues({...values, [e.target.name]: e.target.value})
	};

	const nextStep = () => {
		setValues({...values, step: values.step+1})
	};

	const prevStep = () => {
		setValues({ ...values, step: values.step - 1 })
	};

	console.log('values', values)

	switch (values.step) {
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
		// Directs user to the CategoryDetails Page
		return (
		<CategoryDetails
			nextStep={nextStep}
			prevStep={prevStep}
			setValues={setValues}
			handleChange={handleChange}
			values={values}
		/>
		);
		case 3:
		// Directs user to the ItemDetails Page
		return (
		<ItemDetails
			nextStep={nextStep}
			prevStep={prevStep}
			setValues={setValues}
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
			setValues={setValues}
			updateMenu={props.updateMenu}
		/>
		)
		default:
		return <div>Error</div>
	}

}

export default MenuForm