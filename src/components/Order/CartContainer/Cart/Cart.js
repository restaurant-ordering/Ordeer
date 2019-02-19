import React from 'react'
import CartItem from './CartItem'
const Cart = props => {

	const map = props.cart && props.cart.map(obj => (
		<div key={obj.key}>
			<CartItem
				name={obj.name}
				itemid={obj.key}
				description={obj.description}
				price={obj.price}
				removeItem={props.removeItem} />
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
