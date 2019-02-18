import React, { useState } from 'react'

const MenuCard = props => {
	const menu_item = props.item
	const [flipped, flip] = useState(false)
	const [customization, editCustomization] = useState('')

	const flipper = () => {
		console.log('flipping')
		if(flipped){
			flip(false)
		}else{
			flip(true)
		}
	}

	const customize = (e) => {
		editCustomization(e.target.value)
	}

	return (
		<>
		{
		flipped
		?
		<div>
			<p>{menu_item.name}</p>
			<p>{menu_item.price}</p>
			<p>{menu_item.description}</p>
			<img src={menu_item.image} alt="menu_item"></img>
			<p>Notes:</p>
			<input value={customization} onChange={customize}/>
			<button onClick={() => { props.addToCart(menu_item.name, props.category) }}>Add to Cart</button>
			<button onClick={flipper}>Cancel</button>
		</div>
		:
			<div key={menu_item.name}>
				<p>{menu_item.name}</p>
				<p>{menu_item.price}</p>
				<p>{menu_item.description}</p>
				<img src={menu_item.image} alt="menu_item"></img>
				<button onClick={flipper}> + </button>
			</div>
		}
		</>
	)
}

export default MenuCard;