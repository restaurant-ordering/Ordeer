import React from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const ItemDetails = props =>{
	const forward = e => {
		e.preventDefault();
		props.nextStep();
	};

	const back = e => {
		e.preventDefault();
		props.prevStep();
	};

	const { values, handleChange } = props;
	return (
		<>
			<AppBar title="Enter First Items Details" />
			<TextField
			hintText="Enter in the Item's Image"
			floatingLabelText="Image"
			onChange={handleChange('city')}
			defaultValue={values.city}
			/>
			<TextField
			hintText="Enter in the Item's Price"
			floatingLabelText="Price"
			onChange={handleChange('price')}
			defaultValue={values.price}
			/>
			<TextField
			hintText="Enter in the Item's Description"
			floatingLabelText="Description"
			onChange={handleChange('description')}
			defaultValue={values.desscription}
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