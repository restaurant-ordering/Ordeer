import React, {useState} from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const ItemDetails = props =>{
	
	const [itemNumber, changeItemNumber] = useState(1)
	const [categoryNumber, changeCategoryNumber] = useState(0)
	const { values, handleChange, setValues} = props;

	console.log('categoryNumber', categoryNumber)
	console.log('values.category_details', values.category_details)

	const forward = e => {
		e.preventDefault();
		if(itemNumber === values.category_details[categoryNumber].items && categoryNumber +1 >= values.categories){
			let newMenuItem = {category: categoryNumber+1, name: values.menu_item, image: values.image, price: values.price, description: values.description}
			setValues({...values, step: values.step + 1, menu_item: '', image: '', price: '', description: '', menu_items: [...values.menu_items, newMenuItem]})
		} else if (itemNumber === values.category_details[categoryNumber].items){
			let newMenuItem = { category: categoryNumber + 1, name: values.menu_item, image: values.image, price: values.price, description: values.description }
			setValues({ ...values, menu_item: '', image: '', price: '', description: '', menu_items: [...values.menu_items, newMenuItem] })
			changeCategoryNumber(categoryNumber + 1)
			changeItemNumber(1)
		} else {
			let newMenuItem = { category: categoryNumber + 1, name: values.menu_item, image: values.image, price: values.price, description: values.description }
			setValues({ ...values, menu_item: '', image: '', price: '', description: '', menu_items: [...values.menu_items, newMenuItem] })
			changeItemNumber(itemNumber + 1)
		}
	};

	const back = e => {
		e.preventDefault();
		if (categoryNumber === 0 && itemNumber === 1) {
			props.prevStep();
		} else if (itemNumber ===1){
			let newMenuItems = [...values.menu_items]
			let menuItem = newMenuItems.pop()
			let prevCategory = categoryNumber - 1
			setValues({ ...values, menu_items: newMenuItems, menu_item: menuItem.name, image: menuItem.image, price: menuItem.price, description: menuItem.description })
			changeItemNumber(values.category_details[prevCategory].items)
			changeCategoryNumber(prevCategory)
		}
		else {
			let newMenuItems = [...values.menu_items]
			let menuItem = newMenuItems.pop()
			setValues({ ...values, menu_items: newMenuItems, menu_item: menuItem.name, image: menuItem.image, price: menuItem.price, description: menuItem.description})
			changeItemNumber(itemNumber - 1)
		}
	};

	return (
		<>
			<AppBar title={`Enter Details for Item ${itemNumber} in ${values.category_details[categoryNumber].name} Category`} />
			<TextField
			hintText="Enter the name of this item"
			floatingLabelText="Name"
			onChange={handleChange}
			value={values.menu_item}
			name="menu_item"
			/>
			<TextField
			hintText="Enter in the Item's Image"
			floatingLabelText="Image"
			onChange={handleChange}
			value={values.image}
			name="image"
			/>
			<TextField
			hintText="Enter in the Item's Price"
			floatingLabelText="Price"
			onChange={handleChange}
			value={values.price}
			name="price"
			/>
			<TextField
			hintText="Enter in the Item's Description"
			floatingLabelText="Description"
			onChange={handleChange}
			value={values.description}
			name="description"
			/>
			<RaisedButton
			label="Back"
			primary={false}
			style={styles.button}
			onClick={back}
			/>
			<RaisedButton
			label="Continue"
			primary={true}
			style={styles.button}
			onClick={forward}
			/>
		</>
	);
}

const styles = {
	button: {
		margin: 15
	}
};

export default ItemDetails;