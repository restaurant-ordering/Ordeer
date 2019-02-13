import React from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const MenuDetails = props => {

	const { values, handleChange } = props;

	return (
		<>
			<AppBar title="Enter Menu Details" />
			<TextField
			hintText="Enter Your Menu Name"
			floatingLabelText="Menu Name"
			onChange={handleChange('menu_name')}
			defaultValue={values.menu_name}
			/>
			<br />
			<TextField
			hintText="Enter the Number of Categories"
			floatingLabelText="Category"
			onChange={handleChange('categories')}
			defaultValue={values.categories}
			/>
			<br />
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