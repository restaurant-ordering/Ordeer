import React from 'react';
import { Link } from "react-router-dom";
import Navbar from '../Navbar/Navbar';
import './Landing.css';

const Landing = props => {
	return (
		<div className = "Landing">
			<Navbar />
			<div className = "Landing_Container">
				<div className = "Landing_Header">
					<div className = "Landing_Logo">
						<img className = "Landing_Logo_Image" src = "https://image.flaticon.com/icons/svg/47/47226.svg" />
					</div>
					<div className = "Landing_Name">
						<p className = "Landing_Name_Text"> Ordeer </p>
					</div>
				</div>
				<div className = "Landing_MainContent"></div>
				<Link to = "/register">
				<div className = "Landing_Footer">
					<p className = "Landing_Register_Text"> Register </p>
				</div>
				</Link>
			</div>
		</div>
	)
}

export default Landing
