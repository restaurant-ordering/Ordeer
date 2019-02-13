import React, { Component } from 'react'
import routes from './routes'
import { firebase } from './firebase/firebase'

class App extends Component {
	render() {
		return (
			// <Router>
			<div className='App_Container'>{routes}</div>
			// </Router>
		)
	}
}

export default App
