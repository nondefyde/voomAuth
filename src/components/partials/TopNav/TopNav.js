import React from 'react';
import './TopNav.scss';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

const TopNav = ({user, navigate}) => {
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
				<NavDropdown.Item href="" onClick={(e) => navigate(e, '/trips')}>My Trips</NavDropdown.Item>
				<NavDropdown.Item href="" onClick={(e) => navigate(e, '/profile')}>Profile</NavDropdown.Item>
				<NavDropdown.Item href="" onClick={(e) => navigate(e, '/change-password')}>Change
					Password</NavDropdown.Item>
				<NavDropdown.Item href="" onClick={(e) => navigate(e, '/logout')}>Logout</NavDropdown.Item>
			</NavDropdown>}
		</ul>
	);
};

export default TopNav;
