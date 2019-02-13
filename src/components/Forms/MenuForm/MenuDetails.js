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
			floatingLabelText="Menu Name"
			onChange={handleChange('menu_name')}
			defaultValue={values.menu_name}
			/>
			<TextField
			hintText="Enter the Number of Categories"
			floatingLabelText="Menu Categories"
			onChange={handleChange('categories')}
			defaultValue={values.categories}
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