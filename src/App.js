import React, { Component } from 'react'
import routes from './routes'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import { teal, amber } from '@material-ui/core/colors'

import './App.css';
const theme = createMuiTheme({
	palette: {
		primary: teal,
		secondary: {
			main: '#66bb6a',
		},
	},
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
