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
	root: {
		display: 'flex',
		justify: 'space-between'
	},
	card: {
		minWidth: 300,
		maxWidth: 300,
		minHeight: 400,
		maxHeight: 400,
		margin: 10,
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'column'
	},
	title: {
		fontSize: 14,
		alignSelf: 'center'
	},
	pos: {
		marginBottom: 5,
	},
	media: {
		// ⚠️ object-fit is not supported by IE 11.
		backgroundSize: '100%',
		backgroundPosition: 'center',
		objectFit: 'fit',
	},
};
const RestaurantCard = props => {
	const { classes } = props;
	const restaurant = props.restaurant
	const [redirect, activateRedirect] = useState(false)
	const address = Object.keys(restaurant.addresses)[0]

	return (
		<Card className={classes.card} raised>
			<CardMedia
				component="img"
				alt="Generic Restaurant Logo"
				className={classes.media}
				height="200"
				image={restaurant.image || "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1024px-No_image_3x4.svg.png"}
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
				{restaurant.menus && <Button size="small" onClick={() => { activateRedirect(true) }}>Show Menu</Button>}
				{redirect && <Redirect to={`/order/${restaurant.name}`} />}
			</CardActions>
		</Card>
	)
}

RestaurantCard.propTypes = {
	classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(RestaurantCard);
