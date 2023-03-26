import React, { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import OpenModalButton from '../OpenModalButton'
import logo from '../../static/threadit.png'
import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';
import { logout } from '../../store/session';
import CreateSubreddit from '../CreateSubreddit';
import './NavBar.css';

function NavBar() {
	const dispatch = useDispatch();
	const history = useHistory();
	const sessionUser = useSelector(state => state.session.user);
	const [showDropdown, setShowDropdown] = useState(false);
	const dropdownRef = useRef(null);


	// closes dropdown menu by clicking anywhere on screen
	useEffect(() => {
		if (!showDropdown) return;

		const closeMenu = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setShowDropdown(false);
			}
		};

		document.addEventListener('click', closeMenu);

		return () => {
			document.removeEventListener('click', closeMenu);
		};
	}, [showDropdown]);


	//function to handle logging out
	const handleLogout = async (e) => {
		e.preventDefault();
		await dispatch(logout())
        .then(() => {
            history.push('/');
        });
	};

	//function to toggle the dropdown menu
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
						<div className='dropdown-menu' ref={dropdownRef}>
							<ul>
								<li className='welcome-text'>{`Welcome back, ${sessionUser.username}`}</li>
								<li className='create-sr-btn-li'>
									<OpenModalButton
										buttonText={<span className='create-subreddit-text'>Create a Community</span>}
										modalComponent={<CreateSubreddit />}
										className='create-subreddit-btn'
									/>
								</li>
								<li className='owned-subreddit-li'>
									<Link to='/owned-subreddits'>
										<span className='owned-subreddit-span'>Owned Subthreadits</span>
									</Link>
								</li>
								<li className='my-com-li'>
									<Link to='/my-communities'>
										<span className='my-com-span'>My Communities</span>
									</Link>
								</li>
							</ul>
							<button onClick={handleLogout} className='logout-btn'>Log out</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default NavBar;
