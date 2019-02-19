import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
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
const MenuDetails = props => {
	const { classes } = props;
	const { values, handleChange } = props;

	return (
		<Paper className={classes.paper} elevation={1}>
			<AppBar>Enter Menu Details</AppBar>
			<TextField
				placeholder="Enter Your Menu Name"
				name="menu_name"
				onChange={handleChange}
				value={values.menu_name}
			/>
			<TextField
				name="categories"
				placeholder="Enter the Number of Categories"
				onChange={handleChange}
				value={values.categories}
				type="number"
			/>
			<Button
				className={classes.button}
				onClick={props.nextStep}
			>
				Continue
			</Button>
		</Paper>
	);
}


MenuDetails.propTypes = {
	classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(MenuDetails);
