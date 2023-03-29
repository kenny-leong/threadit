import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignupForm from '../SignupForm';
import OpenModalButton from '../OpenModalButton'
import './feedbar.css'



function FeedSideBar() {

    const sessionUser = useSelector(state => state.session.user);
    const [isGamingOpen, setIsGamingOpen] = useState(false);
    const [isSportsOpen, setIsSportsOpen] = useState(false);
    const [isBusinessOpen, setIsBusinessOpen] = useState(false);
    const [isCryptoOpen, setIsCryptoOpen] = useState(false);
    const [isTVOpen, setIsTVOpen] = useState(false);
    const [isCelebOpen, setIsCelebOpen] = useState(false);

    const toggleGamingDropdown = () => {
        setIsGamingOpen(!isGamingOpen);
    };

    const toggleSportsDropdown = () => {
        setIsSportsOpen(!isSportsOpen);
    };

    const toggleBusinessDropdown = () => {
        setIsBusinessOpen(!isBusinessOpen);
    };

    const toggleCryptoDropdown = () => {
        setIsCryptoOpen(!isCryptoOpen);
    };

    const toggleTVDropdown = () => {
        setIsTVOpen(!isTVOpen);
    };

    const toggleCelebDropdown = () => {
        setIsCelebOpen(!isCelebOpen);
    };














    return (
        <div className='feed-bar-div'>
            <div className='feed-margin-div'>
                <span className='feeds-text'>FEEDS</span>
                {sessionUser && (
                    <Link to='/home'>
                        <div className='home-channel-div'>
                            <span><i class="fa-solid fa-house"></i></span>
                            <span className='home-channel-text'>Home</span>
                        </div>
                    </Link>
                )}
                {(!sessionUser) && (
                    <Link to='/'>
                        <div className='home-channel-div'>
                            <span><i class="fa-solid fa-house"></i></span>
                            <span className='home-channel-text'>Home</span>
                        </div>
                    </Link>
                )}
                <Link to='/popular'>
                    <div className='popular-channel-div'>
                        <span><i class="fa-solid fa-arrow-trend-up"></i></span>
                        <span className='popular-channel-text'>Popular</span>
                    </div>
                </Link>
            </div>
            <div className='topic-margin-div'>
                <span className='topics-text'>TOPICS</span>
                <div className='gaming-channel-div' onClick={toggleGamingDropdown}>
                    <span><i class="fa-brands fa-twitch"></i></span>
                    <span className='home-channel-text'>Gaming</span>
                </div>
                {isGamingOpen && (
                    <div className='dropdown-container gaming'>
                        <div className='dropdown-item gaming'>
                            <span>Valorant</span>
                        </div>
                        <div className='dropdown-item gaming'>
                            <span>Genshin Impact</span>
                        </div>
                        <div className='dropdown-item gaming'>
                            <span>Maplestory</span>
                        </div>
                    </div>
                )}
                <div className='sports-channel-div' onClick={toggleSportsDropdown}>
                    <span><i class="fa-solid fa-basketball"></i></span>
                    <span className='home-channel-text'>Sports</span>
                </div>
                <div className='business-channel-div' onClick={toggleBusinessDropdown}>
                    <span><i class="fa-solid fa-coins"></i></span>
                    <span className='home-channel-text'>Business, Economics, a..</span>
                </div>
                <div className='crypto-channel-div' onClick={toggleCryptoDropdown}>
                    <span><i class="fa-brands fa-bitcoin"></i></span>
                    <span className='home-channel-text'>Crypto</span>
                </div>
                <div className='tv-channel-div' onClick={toggleTVDropdown}>
                    <span><i class="fa-solid fa-tv"></i></span>
                    <span className='home-channel-text'>Television</span>
                </div>
                <div className='celeb-channel-div' onClick={toggleCelebDropdown}>
                    <span><i class="fa-regular fa-star"></i></span>
                    <span className='home-channel-text'>Celebrity</span>
                </div>
                <div className='more-topics-div'>
                    <span><i class="fa-solid fa-ellipsis"></i></span>
                    <span className='home-channel-text'>More Topics (Coming Soon)</span>
                </div>
            </div>
            {!sessionUser && (
                <div className='join-div'>
                    <div className='join-threadit-div'>
                        <span className='join-text'>
                        Create an account to follow your favorite communities and start taking part in conversations.
                        </span>
                    </div>
                    <div className='join-now-btn'>
                        <OpenModalButton
                            buttonText={<span className='join-now-text'>Join Threadit</span>}
                            modalComponent={<SignupForm />}
                        />
                    </div>
                </div>
            )}
        </div>
    )


}



export default FeedSideBar;
