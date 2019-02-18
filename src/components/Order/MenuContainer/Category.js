import React from 'react'
import MenuCard from './MenuCards/MenuCard'

const Category = props => {
	const map = props.items.map(menu_item => (
		<MenuCard addToCart={props.addToCart} key={menu_item.name} item={menu_item}/>
	))
	return (
		<>
			<h1>{props.category}</h1>
			<div className="menuItems">
				{map}
			</div>
		</>
	)
}

export default Category;
