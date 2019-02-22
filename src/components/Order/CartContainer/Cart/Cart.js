import React, {useState} from 'react'
import CartItem from './CartItem'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import {Redirect} from 'react-router-dom'

const styles = {
	card: {
		minWidth: 340,
		maxWidth: 340,
		margin: 5,
		display: 'flex',
		flexDirection: 'column',
		alignItems: "flex-end"
	}
};

const Cart = props => {
	const { classes } = props;
	const [flipped, flip] = useState(false)
	const [redirect, activateRedirect] = useState(false)

	const [values, setValues] = useState({
		displayName: '',
		email: '',
		phone: ''
	})

	const map = props.cart && props.cart.map(obj => (
		<div key={obj.key}>
			<CartItem
				name={obj.name}
				itemid={obj.key}
				description={obj.description}
				price={obj.price}
				customization={obj.customization}
				removeItem={props.removeItem} />
		</div>
	))

	const checkout = async () => {
		if(Object.keys(props.user).length || flipped){
			if(!Object.keys(props.user).length){
				var guestUser = values
			}
			const orderId = props.orderId
			const price = props.total
			const cart = props.cart
			const date = new Date()
			const restaurant = props.restaurantname
			let user = guestUser || props.user
			try {
				let result = await axios.post('/api/checkout', {orderId, cart, date, price,restaurant, user})
				result && activateRedirect(true)
			}
			catch (error) {
				console.log(error)
			}
		}
		else {
			flip(true)
		}
	}
	const onChange = e => {
		setValues({ ...values, [e.target.name]: e.target.value })
	}

	switch(flipped){
		case false:
			return (
				<div className="Cart">
					<h1>Cart</h1>
					<Card className={classes.card}>
						<CardActions>
							<div>Total: ${props.total}</div>
							<Button onClick={checkout} color="primary" variant="contained">Checkout</Button>
						</CardActions>
						{map}
					</Card>
					{redirect && <Redirect to={`/r/${props.orderId}`}></Redirect>}
				</div>
			)
		case true:
			return (
				<div className="Cart">
					<h1>Cart</h1>
					<Card className={classes.card}>
						<TextField onChange={onChange} name="displayName" placeholder="name"/>
						<TextField onChange={onChange} name="email" placeholder="email"/>
						<TextField onChange={onChange} name="phone" placeholder="phone number"/>
						<CardActions>
							<Button onClick={checkout} color="primary" variant="contained">Checkout</Button>
						</CardActions>
					</Card>
					{ redirect && <Redirect to={`/r/${props.orderId}`}></Redirect> }
				</div>
			)
		default:
		return (
			<div>
				<p>loading</p>
			</div>
		)
	}
}
Cart.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Cart);
