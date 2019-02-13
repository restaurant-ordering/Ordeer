import React from 'react';
import { Link } from "react-router-dom";
import Navbar from '../Navbar/Navbar';
import RightArrow from '../../Images/RightArrow.png';
import './Landing.css';

const Landing = props => {
	return (
		<div className = "Landing_Page">
			<Navbar />
			<div className = "Landing_Header">
				<p className = "Landing_Header_Title_Text"> Ordeer </p>
				<p className = "Landing_Header_Slogan_Text"> a leap above the rest </p>
			</div>
			<div className = "Landing_MC">
				<div className = "Landing_MC_Top">
					<div className = "Landing_MC_Container_Paragraph">
						<p className ="Landing_MC_Paragraph_Text"> Explore restaurants that are close to you: </p>
					</div>
					<div className = "Landing_MC_Container_Input">
						<input className = "Landing_MC_Input" type = "text" />
					</div>
					<button className ="Landing_MC_Container_Button">
						<p className = "Landing_MC_Button_Text"> Search </p>
					</button>
				</div>
				<div className = "Landing_MC_Bottom"></div>
			</div>
			<Link className = "Default_Style_Link" to = "/register">
			<div className = "Landing_Footer">
				<div className = "Landing_Footer_Button">
					<p className= "Landing_Footer_Button_Text"> Register Restaurant </p>
					<img className = "Landing_Footer_Button_Logo" src = {RightArrow}  />
				</div>
			</div>
			</Link>
		</div>
	)
}

export default Landing
