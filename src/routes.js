import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Home from './components/Home/Home'
import Account from './components/Account/Account'
import Order from './components/Order/Order'
import Register from './components/Register/Register'

export default (
	<Switch>
		<Route exact path='/' component={Landing} />
		<Route path='/home' component={Home} />
		<Route path='/account' component={Account} />
		<Route path='/register' component={Register} />
		<Route path='/order' component={Order} />
	</Switch>
)
