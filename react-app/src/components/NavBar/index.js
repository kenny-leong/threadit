import React, {useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton'
import logo from '../../static/threadit.png'
import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';
import './NavBar.css';

function NavBar({ isLoaded }) {

	const sessionUser = useSelector(state => state.session.user);


	return (
		<div className='nav-bar-container'>
			<Link to='/'>
				<img className='logo' src={logo} alt='logo' />
			</Link>
			<input
				className="nav-search-bar"
				type="text"
				id="search-bar"
				name="search-bar"
				placeholder='Search Threadit'
				required
			/>
			{(!sessionUser) && (
				<div className='login-signup-divs'>
					<div className='signup-btn-div'>
						<OpenModalButton
						buttonText={<span className='signup-text'>Sign Up</span>}
						modalComponent={<SignupForm />}
						/>
					</div>
					<div className='login-btn-div'>
						<OpenModalButton
						buttonText={<span className='login-text'>Log In</span>}
						modalComponent={<LoginForm />}
						/>
					</div>
				</div>
			)}
			{sessionUser && (
				<div className='profile-btn'>
					<i className="fas fa-bars" />
					<i className="fas fa-user-circle" />
				</div>
			)}
		</div>
	);
}

export default NavBar;
