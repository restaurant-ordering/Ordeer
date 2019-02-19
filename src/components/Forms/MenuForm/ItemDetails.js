import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper'

const styles = {
	paper: {
		width: 500,
		padding: 5,
		height: 'auto',
		display: 'flex',
		marginTop: 200,
		flexDirection: 'column',
		justifyContent: 'center',
		margin: 'auto'
	}
}
const ItemDetails = props => {
	const { classes } = props;
	const [itemNumber, changeItemNumber] = useState(1)
	const [categoryNumber, changeCategoryNumber] = useState(0)
	const { values, handleChange, setValues } = props;

	console.log('categoryNumber', categoryNumber)
	console.log('values.category_details', values.category_details)

	const forward = e => {
		e.preventDefault();
		if (itemNumber === values.category_details[categoryNumber].items && categoryNumber + 1 >= values.categories) {
			let newMenuItem = { category: categoryNumber + 1, name: values.menu_item, image: values.image, price: values.price, description: values.description }
			setValues({ ...values, step: values.step + 1, menu_item: '', image: '', price: '', description: '', menu_items: [...values.menu_items, newMenuItem] })
		} else if (itemNumber === values.category_details[categoryNumber].items) {
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
		} else if (itemNumber === 1) {
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
			setValues({ ...values, menu_items: newMenuItems, menu_item: menuItem.name, image: menuItem.image, price: menuItem.price, description: menuItem.description })
			changeItemNumber(itemNumber - 1)
		}
	};

	return (
		<Paper className={classes.paper} elevation={1}>
			<AppBar>{`Enter Details for Item ${itemNumber} in ${values.category_details[categoryNumber].name} Category`}</AppBar>
			<TextField
				placeholder="Enter the name of this item"
				label="Name"
				onChange={handleChange}
				value={values.menu_item}
				name="menu_item"
			/>
			<TextField
				placeholder="Enter in the Item's Image"
				label="Image"
				onChange={handleChange}
				value={values.image}
				name="image"
			/>
			<TextField
				placeholder="Enter in the Item's Price"
				label="Price"
				onChange={handleChange}
				value={values.price}
				name="price"
			/>
			<TextField
				placeholder="Enter in the Item's Description"
				label="Description"
				onChange={handleChange}
				value={values.description}
				name="description"
			/>
			<Button

				className={classes.button}
				onClick={back}
			>Back</Button>
			<Button

				className={classes.button}
				onClick={forward}
			>Continue</Button>
		</Paper>
	);
}


ItemDetails.propTypes = {
	classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ItemDetails);
