import React, {useState} from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const CategoryDetails = props => {

	const [ currentCategory, switchCategory ] = useState(1)
	const { values, handleChange, setValues } = props;

	const forward = e => {
		setValues({ ...values, category_details: [...values.category_details, { name: values.category_name, items: +values.itemQuantity }]})
		if(currentCategory === values.categories){
			props.nextStep();
		} else {
			setValues({...values, itemQuantity: ''})
			setValues({...values, category_name: ''})
			switchCategory(currentCategory + 1)
		}
	};

	const back = e => {
		if(currentCategory === 1){
			props.prevStep();
		}
		else {
			let category = values.category_details.pop()
			setValues({...values, itemQuantity: category.items})
			setValues({...values, category_name: category.name})
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
			/>
			<TextField
			hintText="Number items in category"
			floatingLabelText="Menu items"
			onChange={handleChange}
			value={values.itemQuantity}
			type="number"
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