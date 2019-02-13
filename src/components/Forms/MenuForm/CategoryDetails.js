import React from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const CategoryDetails = props => {

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
			<AppBar title="Enter First Category Details" />
			<TextField
			hintText="Enter the Number of Items"
			floatingLabelText="Items"
			onChange={handleChange('category_name')}
			defaultValue={values.category_name}
			/>
			<br />
			<TextField
			hintText="Enter the Item's Name"
			floatingLabelText="Name"
			onChange={handleChange('menu_item')}
			defaultValue={values.menu_item}
			/>
			<br />
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