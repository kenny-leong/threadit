import React, { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import OpenModalButton from '../OpenModalButton'
import logo from '../../static/threadit.png'
import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';
import { logout } from '../../store/session';
import CreateSubreddit from '../CreateSubreddit';
import { searchSubreddits } from '../../store/subreddit';
import './NavBar.css';

function NavBar() {
	const dispatch = useDispatch();
	const history = useHistory();
	const sessionUser = useSelector(state => state.session.user);
	const [showDropdown, setShowDropdown] = useState(false);
	const dropdownRef = useRef(null);

	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] = useState([]);


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


	//fetches for search results in real time
	useEffect(() => {
		const fetchSearchResults = async () => {
			const results = await dispatch(searchSubreddits(searchQuery));
			setSearchResults(results);
		};

		if (searchQuery !== '') {
			fetchSearchResults();
		} else {
			setSearchResults([]);
		}
	}, [dispatch, searchQuery]);



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
			{sessionUser && (
				<Link to='/home'>
					<img className='logo' src={logo} alt='logo' />
				</Link>
			)}
			{(!sessionUser) && (
				<Link to='/'>
					<img className='logo' src={logo} alt='logo' />
				</Link>
			)}
			<input
				className="nav-search-bar"
				type="text"
				id="search-bar"
				name="search-bar"
				placeholder='Search Threadit'
				required
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
			/>
			{searchQuery ? (
				searchResults.length > 0 ? (
					<div className='search-results-container'>
					{searchResults.map(result => (
						<Link to={`/subreddits/${result.id}`}>
						<div className='search-result-box' onClick={() => setSearchQuery('')}>
							<span className='result-text'>{`r/ ${result.name}`}</span>
						</div>
						</Link>
					))}
					</div>
				) : (
					<div className='search-results-container'>
					<div className='search-result-box'>
						<span className='result-text'>No search results found</span>
					</div>
					</div>
				)
				) : null}
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
							<div className='nav-dropdown-btns'>
								<span className='welcome-text'>{`Welcome back, ${sessionUser.username}`}</span>
								<div className='create-com-div'>
									<OpenModalButton
										buttonText={<span className='create-subreddit-text'>Create a Community</span>}
										modalComponent={<CreateSubreddit />}
										className='create-subreddit-btn'
									/>
								</div>
								<div className='owned-subreddit-div'>
									<Link to='/owned-subreddits'>
										<span className='owned-subreddit-span'>Owned Subthreadits</span>
									</Link>
								</div>
								<div className='my-com-div'>
									<Link to='/my-communities'>
										<span className='my-com-span'>My Communities</span>
									</Link>
								</div>
							</div>
							<button onClick={handleLogout} className='logout-btn'>Log out</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default NavBar;
