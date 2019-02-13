import React, {Component} from 'react'
import routes from './routes'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
	render() {
		return (
			// <Router>
			<MuiThemeProvider>
				<div className='App_Container'>{routes}</div>
			</MuiThemeProvider>
			// </Router>
		)
	}
}

export default App
