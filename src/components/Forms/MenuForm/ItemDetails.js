import React, {useState} from 'react';
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

	const [itemNumber, changeItemNumber] = useState(0)
	const [categoryNumber, changeCategoryNumber] = useState(0)

	const { values, handleChange, stageControllers } = props;
	return (
		<>
			<AppBar title={`Enter Details for Item ${itemNumber} in ${values.category_details[categoryNumber].name} Category`} />
			<TextField
			hintText="Enter in the Item's Image"
			floatingLabelText="Image"
			onChange={handleChange('city')}
			value={values.city}
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
			value={values.desscription}
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