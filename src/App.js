import React, { Component } from 'react'
import routes from './routes'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import { teal, amber, red } from '@material-ui/core/colors'

import './App.css';
const theme = createMuiTheme({
	palette: {
		primary: teal,
		secondary: amber,
		error: red,
		contrastThreshold: 3,
		tonalOffset: 0.2
	},
	typography: {
		useNextVariants: true,
<<<<<<< HEAD
	},
=======
	}
>>>>>>> master
});

class App extends Component {
	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<div className='App_Container'>{routes}</div>
			</MuiThemeProvider>
		)
	}
}

export default App
