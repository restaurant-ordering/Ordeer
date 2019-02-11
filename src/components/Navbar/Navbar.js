import React from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = props => {
	return (
		<div className = "Navbar_Container">
			<Link to = "/home">
			<div className = "Navbar_Login">
				<p className = "Navbar_Login_Text"> Login </p>
			</div>
			</Link>
		</div>
	)
}

export default Navbar
