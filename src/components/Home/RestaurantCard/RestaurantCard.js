import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
const styles = {
	card: {
		// minWidth: 300,
		maxWidth: 300,
		minHeight: 300,
		maxHeight: 420
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	media: {
		// ⚠️ object-fit is not supported by IE 11.
		objectFit: 'cover',
	},
};
const RestaurantCard = props => {
	const { classes } = props;

	const restaurant = props.restaurant
	const [redirect, activateRedirect] = useState(false)
	const address = Object.keys(restaurant.addresses)[0]
	console.log(restaurant)
	return (
		<Card className={classes.card}>
			<CardMedia
				component="img"
				alt="Generic Restaurant Logo"
				className={classes.media}
				height="200"
				image={restaurant.image}
				title="Generic Restaurant Logo"
			/>
			<CardContent >
				<Typography className={classes.title} color="textPrimary" gutterBottom>
					{restaurant.name || "Tester Restaurant"}
				</Typography>
				<Typography className={classes.pos} color="textSecondary">
					{address || "123 Fake St"}
				</Typography>
				<Typography className={classes.pos} color="textSecondary">
					{restaurant.addresses[address].city || "Dallas Tx"}
				</Typography>
				<Typography className={classes.pos} color="textSecondary">
					{restaurant.addresses[address].zip || "12345"}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small" onClick={() => { activateRedirect(true) }}>Show Menu</Button>
				{redirect && <Redirect to={`/order/${restaurant.name}`} />}
			</CardActions>
		</Card >
	)
}

RestaurantCard.propTypes = {
	classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(RestaurantCard);
