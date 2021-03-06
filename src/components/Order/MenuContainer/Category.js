import React from 'react'
import MenuCard from './MenuCards/MenuCard'

const Category = props => {
	const map = props.items.map(menu_item => (
		<MenuCard flipped={props.flipped} flipCard={props.flipCard} addToCart={props.addToCart} key={menu_item.name} category={props.category} item={menu_item}/>
	))
	return (
		<>
			{!props.flipped&&<h1>{props.category}</h1>}
			<div className="menuItems">
				{map}
			</div>
		</>
	)
}

export default Category;
