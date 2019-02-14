import React from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const MenuDetails = props => {

	const { values, handleChange} = props;

	return (
		<>
			<AppBar title="Enter Menu Details" />
			<TextField
			hintText="Enter Your Menu Name"
			name="menu_name"
			floatingLabelText="Menu Name"
			onChange={handleChange}
			value={values.menu_name}
			/>
			<TextField
			name="categories"
			hintText="Enter the Number of Categories"
			floatingLabelText="Menu Categories"
			onChange={handleChange}
			value={values.categories}
			type="number"
			/>
			<RaisedButton
			label="Continue"
			primary={true}
			style={styles.button}
			onClick={props.nextStep}
			/>
		</>
	);
}

const styles = {
	button: {
		margin: 15
	}
};

export default MenuDetails;