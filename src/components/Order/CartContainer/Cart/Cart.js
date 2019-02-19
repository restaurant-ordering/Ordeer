import React from 'react'
import CartItem from './CartItem'
const Cart = props => {

	const map = props.cart && props.cart.map(obj => (
		<div key={obj.name}>
			<CartItem
				name={obj.name}
				description={obj.description}
				price={obj.price}
				handleClick={() => {
					console.log('remove item from cart')
				}} />
		</div>
	)
	)

	return (
		<div className="Cart">
			<h1>Cart:</h1>
			{map}
		</div>
	)
}

export default Cart
