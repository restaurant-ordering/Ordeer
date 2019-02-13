import React from 'react';
import AppBar from 'material-ui/AppBar';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';

const MenuConfirmation = props => {
	const forward = e => {
		e.preventDefault();
		//create menu object
		//post menu object to db
		//props.updateMenu
		this.props.nextStep();
	};

	const back = e => {
		e.preventDefault();
		this.props.prevStep();
	};

	const {
		values: { menu_name, categories, category_name, menu_item, image, price, description, customization }
	} = props;

	return (
		<>
			<AppBar title="Confirm Menu Data" />
			<List>
				<ListItem primaryText="Menu Name" secondaryText={menu_name} />
				<ListItem primaryText="Categories" secondaryText={categories} />
				<ListItem primaryText="Category Name" secondaryText={category_name} />
				<ListItem primaryText="Menu Item" secondaryText={menu_item} />
				<ListItem primaryText="Image" secondaryText={image} />
				<ListItem primaryText="Price" secondaryText={price} />
				<ListItem primaryText="Description" secondaryText={description} />
				<ListItem primaryText="Customization" secondaryText={customization} />
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