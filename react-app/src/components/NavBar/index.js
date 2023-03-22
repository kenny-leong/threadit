import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../../static/threadit.png'
import './NavBar.css';

function NavBar() {

	return (
		<div className='nav-bar-container'>
			<img src={logo} alt='logo' />
		</div>
	);
}

export default NavBar;
