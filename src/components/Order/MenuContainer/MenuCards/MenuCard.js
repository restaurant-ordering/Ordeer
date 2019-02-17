import React from 'react'

const MenuCard = props => {
	const map = props.items.map(menu_item=> (
		<div key={menu_item.name}>
			<p>{menu_item.name}</p>
			<p>{menu_item.price}</p>
			<p>{menu_item.description}</p>
			<img src={menu_item.image} alt="menu_item"></img>
			<button onClick={()=>{props.addToCart(menu_item.name, props.category)}}>Add to Cart</button>
		</div>
	))
	return (
		<>
		<h1>{props.category}</h1>
		{map}
		</>
	)
}

export default MenuCard;
