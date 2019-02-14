import React, {useState} from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const ItemDetails = props =>{
	const forward = e => {
		e.preventDefault();
		if(itemNumber === values.category_details[categoryNumber].items && categoryNumber +1 === values.categories){
			//add item details to item number @ category number

			//go to menu confirmation if this is the last item in the last category
			props.nextStep();
		} else if (itemNumber === values.category_details[categoryNumber].items){
			//add item details to item number @ category number
			//reset input form
			//go to the next category if this is the last item in a category
			changeCategoryNumber(categoryNumber + 1)
			changeItemNumber(1)
		} else {
			//add item details to item number @ category number
			//reset input form
			//go to the next item
			changeItemNumber(itemNumber + 1)
		}
	};

	const back = e => {
		e.preventDefault();
		props.prevStep();
	};

	const [itemNumber, changeItemNumber] = useState(1)
	const [categoryNumber, changeCategoryNumber] = useState(0)

	const { values, handleChange, stageControllers } = props;
	return (
		<>
			<AppBar title={`Enter Details for Item ${itemNumber} in ${values.category_details[categoryNumber].name} Category`} />
			<TextField
			hintText="Enter the name of this item"
			floatingLabelText="Name"
			onChange={handleChange('menu_item')}
			value={values.menu_item}
			/>
			<TextField
			hintText="Enter in the Item's Image"
			floatingLabelText="Image"
			onChange={handleChange('image')}
			value={values.image}
			/>
			<TextField
			hintText="Enter in the Item's Price"
			floatingLabelText="Price"
			onChange={handleChange('price')}
			value={values.price}
			/>
			<TextField
			hintText="Enter in the Item's Description"
			floatingLabelText="Description"
			onChange={handleChange('description')}
			value={values.description}
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