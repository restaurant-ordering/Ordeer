import React from 'react';
import AppBar from 'material-ui/AppBar';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';

const MenuConfirmation = props => {

	const { values, updateMenu } = props;

	const valuesToUse = { ...values }
	for (let i = 0; i < valuesToUse.category_details.length; i++) {
		valuesToUse.category_details[i].menu_items = valuesToUse.menu_items.filter(item => {
			return item.category === i+1
		})
	}

	console.log(valuesToUse.category_details)

	const forward = e => {
		e.preventDefault();
		updateMenu({
			[valuesToUse.menu_name]:{
				categories: {
					...valuesToUse.category_details
				}
			}
		})
	};

	const back = e => {
		e.preventDefault();
		props.prevStep();
	};

	return (
		<>
			<AppBar title="Confirm Menu Data" />
			<List>
				<ListItem primaryText="Menu Name" secondaryText={values.menu_name} />
				<ListItem primaryText="Categories" secondaryText={values.categories} />
			</List>
			<RaisedButton
			label="Back"
			primary={false}
			style={styles.button}
			onClick={back}
			/>
			<RaisedButton
			label="Confirm & Continue"
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

export default MenuConfirmation;