import React from 'react';
import './TopNav.scss';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

const TopNav = ({user, logout}) => {

	return (
		<ul className="navbar-nav mainlink">
			<li className="nav-item ">
				<a className="nav-link">HOME</a>
			</li>
			<li className="nav-item">
				<a className="nav-link">ADVANCE SEARCH</a>
			</li>
			<li className="nav-item">
				<a className="nav-link">COMPANIES</a>
			</li>
			{!user && <li className="nav-item">
				<Link to={'/register'} className="nav-link">REGISTER</Link>
			</li>}
			{!user && < li className="nav-item">
				<Link to={'/login'} className="nav-link"> LOGIN </Link>
			</li>}
			{user && <NavDropdown title="MY ACCOUNT" id="basic-nav-dropdown">
				<NavDropdown.Item href="#action/3.1">My Trips</NavDropdown.Item>
				<NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
				<NavDropdown.Item href="/change-password">Change Password</NavDropdown.Item>
				<NavDropdown.Item href="" onClick={logout}>Logout</NavDropdown.Item>
			</NavDropdown>}
		</ul>
	);
};

export default TopNav;
