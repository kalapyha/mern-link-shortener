import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
	const history = useHistory();
	const auth = useContext(AuthContext);
	const logoutHandler = (event) => {
		event.preventDefault();
		auth.logout();
		history.push('/');
	};

	return (
		<nav>
			<div className="nav-wrapper blue darken-1">
				<span className="brand-logo ml-1 ">
					Links Shortener<i className="large material-icons">insert_link</i>
				</span>
				<ul id="nav-mobile" className="right hide-on-med-and-down">
					<li>
						<NavLink to="/create">Create Link</NavLink>
					</li>
					<li>
						<NavLink to="/Links">Links Archive</NavLink>
					</li>
					<li>
						<a href="/" onClick={logoutHandler}>
							Logout
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default Navbar;
