import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton'
import logo from '../../static/threadit.png'
import LoginFormPage from '../LoginFormPage';
import SignupFormPage from '../SignupFormPage';
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
			<div className='signup-btn-div'>
				<OpenModalButton
				buttonText={<span className='signup-text'>Sign Up</span>}
				modalComponent={<SignupFormPage />}
				/>
			</div>
			<div className='login-btn-div'>
				<OpenModalButton
				buttonText={<span className='login-text'>Log In</span>}
				modalComponent={<LoginFormPage />}
				/>
			</div>
		</div>
	);
}

export default NavBar;
