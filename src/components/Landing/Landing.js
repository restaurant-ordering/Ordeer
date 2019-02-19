import React, { useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Navbar from '../Navbar/Navbar';
import TextField from '@material-ui/core/TextField';

// import RightArrow from '../../Images/RightArrow.png';
import './Landing.css';
// import { AutoComplete } from 'material-ui';

const styles = {
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	button: {
		margin: 10,
	},
	textField: {
		marginLeft: 15,
		marginRight: 15,
	},
	fab: {
		position: 'absolute',
		bottom: 10,
		right: 15,
	}
}
const Landing = props => {
	const { classes } = props;

	const [search, updateSearch] = useState('')
	const [redirect, activateRedirect] = useState(false)

	const onChange = e => {
		updateSearch(e.target.value)
	}

	const clickRedirect = e => {
		activateRedirect(true)
	}

	return (
		<div className="Landing_Page">
			{redirect && <Redirect to={`/home?city=${search}`} />}
			<Navbar />
			<div className="Landing_Header">
				<p className="Landing_Header_Title_Text"> Ordeer </p>
				<p className="Landing_Header_Slogan_Text"> a leap above the rest </p>
			</div>
			<div className="Landing_MC">
				<div className="Landing_MC_Top">
					{/* <div className="Landing_MC_Container_Paragraph">
						<p className="Landing_MC_Paragraph_Text"> Explore restaurants that are close to you </p>
					</div> */}
					<div className="Landing_MC_Container_Input">
						{/* <input placeholder="City" value={search} className="Landing_MC_Input" onChange={onChange} type="text" /> */}
						<TextField
							id="outlined-full-width"
							style={{ margin: 8 }}
							placeholder="Search For Restaurants In Your City"
							value={search}
							onChange={onChange}
							fullWidth
							margin="normal"
							variant="outlined"
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</div>
					<Button size="large" color='primary' variant="outlined" onClick={clickRedirect} className={classes.button} >Enter</Button>
				</div>
			</div>
			<Button variant="outlined" size='large' className={classes.fab} color='secondary' onClick={clickRedirect}>
				Register As A Restaurant
      </Button>
		</div>
	)
}

export default withStyles(styles)(Landing)
