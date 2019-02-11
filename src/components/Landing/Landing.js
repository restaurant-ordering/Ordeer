import React from 'react';
import Navbar from '../Navbar/Navbar';
import './Landing.css';

const Landing = props => {
	return (
		<div className = "Landing_Container">
			<Navbar />
			<div className = "Landing_Header">
				<h4> Header </h4>
			</div>
			<div className = "Landing_MainContent">
				<h4> Main Content </h4>
			</div>
			<div className = "Landing_Footer">
				<h4> Footer </h4>
			</div>
		</div>
	)
}

export default Landing
