import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import OpenModalButton from '../OpenModalButton'
import logo from '../../static/threadit.png'
import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';
import { logout } from '../../store/session';
import './NavBar.css';

function NavBar() {
	const dispatch = useDispatch();
	const history = useHistory();
	const sessionUser = useSelector(state => state.session.user);
	const [showDropdown, setShowDropdown] = useState(false);

	const handleLogout = async (e) => {
		e.preventDefault();
		await dispatch(logout())
        .then(() => {
            history.push('/');
        });
	};

	const toggleDropdown = () => {
		setShowDropdown(!showDropdown);
	};

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
				<div className='profile-btn' onClick={toggleDropdown}>
					<i className="fas fa-bars" />
					<i className="fas fa-user-circle" />
					{showDropdown && (
						<div className='dropdown-menu'>
							<ul>
								<li className='welcome-text'>{`Welcome back, ${sessionUser.username}`}</li>
								<li ><button onClick={handleLogout} className='logout-btn'>Log out</button></li>
							</ul>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default NavBar;
