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
        <div className={sessionUser ? 'feed-bar-div' : 'feed-bar-div-no-user'}>
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
                        <Link to='/subreddits/25'>
                            <div className='dropdown-item gaming'>
                                <span>Valorant</span>
                            </div>
                        </Link>
                        <Link to='/subreddits/24'>
                            <div className='dropdown-item gaming'>
                                <span>Genshin Impact</span>
                            </div>
                        </Link>
                        <Link to='/subreddits/23'>
                            <div className='dropdown-item gaming'>
                                <span>Maplestory</span>
                            </div>
                        </Link>
                    </div>
                )}
                <div className='sports-channel-div' onClick={toggleSportsDropdown}>
                    <span><i class="fa-solid fa-basketball"></i></span>
                    <span className='home-channel-text'>Sports</span>
                </div>
                {isSportsOpen && (
                    <div className='dropdown-container sports'>
                        <Link to='/subreddits/8'>
                            <div className='dropdown-item sports'>
                                <span>NFL</span>
                            </div>
                        </Link>
                        <Link to='/subreddits/10'>
                            <div className='dropdown-item sports'>
                                <span>World Cup</span>
                            </div>
                        </Link>
                        <Link to='/subreddits/9'>
                            <div className='dropdown-item sports'>
                                <span>NBA</span>
                            </div>
                        </Link>
                    </div>
                )}
                <div className='business-channel-div' onClick={toggleBusinessDropdown}>
                    <span><i class="fa-solid fa-coins"></i></span>
                    <span className='home-channel-text'>Business, Economics, a..</span>
                </div>
                {isBusinessOpen && (
                    <div className='dropdown-container business'>
                        <Link to='/subreddits/11'>
                            <div className='dropdown-item business'>
                                <span>Robinhood</span>
                            </div>
                        </Link>
                        <Link to='/subreddits/12'>
                            <div className='dropdown-item business'>
                                <span>Goldman Sachs</span>
                            </div>
                        </Link>
                        <Link to='/subreddits/13'>
                            <div className='dropdown-item business'>
                                <span>Bloomberg</span>
                            </div>
                        </Link>
                    </div>
                )}
                <div className='crypto-channel-div' onClick={toggleCryptoDropdown}>
                    <span><i class="fa-brands fa-bitcoin"></i></span>
                    <span className='home-channel-text'>Crypto</span>
                </div>
                {isCryptoOpen && (
                    <div className='dropdown-container crypto'>
                        <Link to='/subreddits/14'>
                            <div className='dropdown-item crypto'>
                                <span>Bitcoin</span>
                            </div>
                        </Link>
                        <Link to='/subreddits/15'>
                            <div className='dropdown-item crypto'>
                                <span>Ethereum</span>
                            </div>
                        </Link>
                        <Link to='/subreddits/16'>
                            <div className='dropdown-item crypto'>
                                <span>Dogecoin</span>
                            </div>
                        </Link>
                    </div>
                )}
                <div className='tv-channel-div' onClick={toggleTVDropdown}>
                    <span><i class="fa-solid fa-tv"></i></span>
                    <span className='home-channel-text'>Anime</span>
                </div>
                {isTVOpen && (
                    <div className='dropdown-container tv'>
                        <Link to='/subreddits/17'>
                            <div className='dropdown-item tv'>
                                <span>Suzume</span>
                            </div>
                        </Link>
                        <Link to='/subreddits/18'>
                            <div className='dropdown-item tv'>
                                <span>Demon Slayer</span>
                            </div>
                        </Link>
                        <Link to='/subreddits/19'>
                            <div className='dropdown-item tv'>
                                <span>Jujutsu Kaisen</span>
                            </div>
                        </Link>
                    </div>
                )}
                <div className='celeb-channel-div' onClick={toggleCelebDropdown}>
                    <span><i class="fa-regular fa-star"></i></span>
                    <span className='home-channel-text'>Celebrity</span>
                </div>
                {isCelebOpen && (
                    <div className='dropdown-container celeb'>
                        <Link to='/subreddits/20'>
                            <div className='dropdown-item celeb'>
                                <span>Kim Kardashian</span>
                            </div>
                        </Link>
                        <Link to='/subreddits/21'>
                            <div className='dropdown-item celeb'>
                                <span>ITZY</span>
                            </div>
                        </Link>
                        <Link to='/subreddits/22'>
                            <div className='dropdown-item celeb'>
                                <span>BLACKPINK</span>
                            </div>
                        </Link>
                    </div>
                )}
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
