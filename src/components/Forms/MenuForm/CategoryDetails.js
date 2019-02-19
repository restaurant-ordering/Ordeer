import React, { useState } from 'react';
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
	}
}
const CategoryDetails = props => {
	const { classes } = props;
	const [currentCategory, switchCategory] = useState(1)
	const { values, handleChange, setValues } = props;

	const forward = async e => {
		if (currentCategory >= values.categories) {
			let storedValues = { name: values.category_name, items: +values.itemQuantity }
			setValues({ ...values, step: values.step + 1, category_name: '', itemQuantity: '', category_details: [...values.category_details, storedValues] })
		} else {
			let storedValues = { name: values.category_name, items: +values.itemQuantity }
			setValues({ ...values, category_name: '', itemQuantity: '', category_details: [...values.category_details, storedValues] })
			switchCategory(currentCategory + 1)
		}
	};

	const back = e => {
		if (currentCategory === 1) {
			props.prevStep();
		}
		else {
			let newCategoryDetails = [...values.category_details]
			let category = newCategoryDetails.pop()
			setValues({ ...values, category_details: newCategoryDetails, itemQuantity: category.items, category_name: category.name })
			switchCategory(currentCategory - 1)
		}
	};

	return (
		<Paper className={classes.paper} elevation={1}>
			<AppBar>{`Enter Category ${currentCategory} Details`}</AppBar>
			<TextField
				placeholder={`Category ${currentCategory} name`}
				onChange={handleChange}
				value={values.category_name}
				name="category_name"
			/>
			<TextField
				placeholder="Number items in category"
				onChange={handleChange}
				value={values.itemQuantity}
				type="number"
				name="itemQuantity"
			/>
			<Button

				className={classes.button}
				onClick={back}
			>Back</Button>
			<Button

				className={classes.button}
				onClick={forward}
			>Continue</Button>
		</Paper>
	);

}


CategoryDetails.propTypes = {
	classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(CategoryDetails);
