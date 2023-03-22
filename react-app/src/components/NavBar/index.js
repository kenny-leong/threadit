import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../../static/threadit.png'
import './NavBar.css';

function NavBar() {



	return (
		<div className='nav-bar-container'>
			<img src={logo} alt='logo' />
			<input
				className="nav-search-bar"
				type="text"
				id="search-bar"
				name="search-bar"
				placeholder='Search Threadit'
				required
			/>
			<button className='signup-btn'>Sign Up</button>
			<button className='login-btn'>Log In</button>
		</div>
	);
}

export default NavBar;
