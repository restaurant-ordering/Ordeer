import React, {useState} from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const CategoryDetails = props => {

	const [ currentCategory, switchCategory ] = useState(1)
	const { values, handleChange, setValues } = props;

	const forward = async e => {
		if(currentCategory >= values.categories){
			let storedValues = {name: values.category_name, items: +values.itemQuantity}
			setValues({ ...values, step: values.step + 1, category_name: '', itemQuantity: '', category_details: [...values.category_details, storedValues] })
		} else {
			let storedValues = { name: values.category_name, items: +values.itemQuantity }
			setValues({ ...values, category_name: '', itemQuantity: '', category_details: [...values.category_details, storedValues] })
			switchCategory(currentCategory + 1)
		}
	};

	const back = e => {
		if(currentCategory === 1){
			props.prevStep();
		}
		else {
			let newCategoryDetails = [...values.category_details]
			let category = newCategoryDetails.pop()
			setValues({ ...values, category_details: newCategoryDetails, itemQuantity: category.items, category_name: category.name})
			switchCategory(currentCategory - 1)
		}
	};

	return (
		<>
			<AppBar title={`Enter Category ${currentCategory} Details`} />
			<TextField
			hintText={`Category ${currentCategory} name`}
			floatingLabelText="Category name"
			onChange={handleChange}
			value={values.category_name}
			name="category_name"
			/>
			<TextField
			hintText="Number items in category"
			floatingLabelText="Menu items"
			onChange={handleChange}
			value={values.itemQuantity}
			type="number"
			name="itemQuantity"
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

export default CategoryDetails;