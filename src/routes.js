import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Home from './components/Home/Home'
import Order from './components/Order/Order'
import Register from './components/Register/Register'
import CreateMenu from './components/Register/CreateMenu/CreateMenu'
import Receipt from './components/Order/CartContainer/Receipt/Receipt'

export default (
	<Switch>
		<Route exact path='/' component={Landing} />
		<Route path='/home' component={Home} />
		<Route path='/r/' component={Receipt} />
		<Route path='/register' component={Register} />
		<Route path='/addmenu' component={CreateMenu} />
		<Route path='/order' component={Order} />
	</Switch>
)
