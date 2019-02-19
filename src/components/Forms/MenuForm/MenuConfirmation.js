import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { List, ListItem } from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper'

const styles = {
	paper: {
		width: 500,
		padding: 5,
		height: 'auto',
		display: 'flex',
		marginTop: 200,
		flexDirection: 'column',
		justifyContent: 'center',
		margin: 'auto'
	},
	button: {
		margin: 15
	}
}
const MenuConfirmation = props => {
	const { classes } = props;
	const { values, updateMenu } = props;

	const valuesToUse = { ...values }
	for (let i = 0; i < valuesToUse.category_details.length; i++) {
		valuesToUse.category_details[i].menu_items = valuesToUse.menu_items.filter(item => {
			return item.category === i + 1
		})
	}

	console.log(valuesToUse.category_details)

	const forward = e => {
		e.preventDefault();
		updateMenu({
			[valuesToUse.menu_name]: {
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
		<Paper className={classes.paper} elevation={1}>
			<AppBar>Confirm Menu Data</AppBar>
			{/* <List>
				<ListItem>
					Confirm menu options go here!
				</ListItem>
			</List> */}
			<p>Confirm menu options go here!</p>
			<Button

				className={classes.button}
				onClick={back}
			>Back</Button>
			<Button

				className={classes.button}
				onClick={forward}
			>Confirm & Continue</Button>
		</Paper>
	);
}

MenuConfirmation.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuConfirmation);
