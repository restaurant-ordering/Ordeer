import React from 'react'

const Cart = props => {

	const map = props.cart.map(obj=> (
		<div key={obj.name}>
			<p>{obj.name}</p>
			<p>{obj.price}</p>
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
