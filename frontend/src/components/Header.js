import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/Header.css';

const Header = ({ isAuthenticated }) => {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem('token');
		navigate('/');
		window.location.reload();
	};
	return (
				<header className="header">
			<div className="header-logo">Marketplace</div>
			<nav>
				<ul className="nav-list">
					{isAuthenticated ? (
						<>
							<li><Link to="/update-user" className="nav-link">Update Info</Link></li>
							<li><button onClick={handleLogout} className="nav-button">Logout</button></li>
						</>
					) : (
						<>
							<li><Link to="/register" className="nav-link">Register</Link></li>
							<li><Link to="/login" className="nav-link">Login</Link></li>
						</>
					)}
				</ul>
			</nav>
		</header>
	);
};
export default Header;