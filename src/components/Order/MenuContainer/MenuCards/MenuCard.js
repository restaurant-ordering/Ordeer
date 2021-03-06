import React, { useState } from 'react'
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const styles = {
	card: {
		minWidth: 300,
		maxWidth: 300,
		maxHeight: 420,
		minHeight: 420,
		margin: 10,
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'column'
	},
	flippedcard: {
		minWidth: 600,
		maxWidth: 600,
		minHeight: 540,
		maxHeight: 540,
		margin: 10,
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'column'
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
	hide: {
		display: 'none'
	},
	addToCart: {
		marginRight: 6,
	}
};

const MenuCard = props => {
	const { classes } = props;
	const menu_item = props.item
	const [flipped, flip] = useState(false)
	const [customization, editCustomization] = useState('')

	const flipper = () => {
		('flipping')
		if (flipped) {
			props.flipCard(false)
			flip(false)
		} else {
			flip(true)
			props.flipCard(menu_item.name)
		}
	}

	const customize = (e) => {
		editCustomization(e.target.value)
	}

	const addToCart = () => {
		props.flipCard(false)
		flip(false)
		props.addToCart(menu_item.name, props.category, customization)
	}

	return (
		<>
		{
		flipped && props.flipped === menu_item.name
		?
			<Card className={classes.flippedcard}>
				<CardMedia
					component="img"
					alt="Menu item img"
					className={classes.media}
					height="200"
					width="auto"
					image={menu_item.image || "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1024px-No_image_3x4.svg.png"}
					title="Menu item pic"
				/>
				<CardContent>
					<Typography className={classes.title}>{menu_item.name}</Typography>
					<Typography className={classes.pos}>{menu_item.price}</Typography>
					<Typography className={classes.pos}>{menu_item.description}</Typography>
					<TextField
						label="Notes:"
						multiline
						rows="4"
						value={customization}
						onChange={customize}
					/>
				</CardContent>
				<CardActions>
					<Button onClick={flipper}>
						<i className="material-icons">
							arrow_back
						</i>
					</Button>
					<Button onClick={addToCart}>
						<i className="material-icons">
							add_shopping_cart
						</i>
					</Button>
				</CardActions>
			</Card>
		:
			<Card className={!props.flipped?classes.card:classes.hide}>
				<CardMedia
					component="img"
					alt="Menu item img"
					className={classes.media}
					height="200"
					image={menu_item.image || "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1024px-No_image_3x4.svg.png"}
					title="Menu item pic"
				/>
				<CardContent>
					<Typography className={classes.title} color="textPrimary">{menu_item.name}</Typography>
					<Typography>{menu_item.price}</Typography>
					<Typography>{menu_item.description}</Typography>
				</CardContent>
				<CardActions>
					<Button onClick={flipper}>
						<Typography className={classes.addToCart}>Add to cart</Typography>
						<i className="material-icons">
							add_circle_outline
						</i>
					</Button>
				</CardActions>
			</Card>
		}
		</>
	)
}
MenuCard.propTypes = {
	classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(MenuCard);
