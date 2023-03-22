import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignupFormPage from '../SignupFormPage';
import OpenModalButton from '../OpenModalButton'
import './feedbar.css'



function FeedSideBar() {


    return (
        <div className='feed-bar-div'>
            <div className='feed-margin-div'>
                <span className='feeds-text'>FEEDS</span>
                <div className='home-channel-div'>
                    <span><i class="fa-solid fa-house"></i></span>
                    <span className='home-channel-text'>Home</span>
                </div>
                <div className='popular-channel-div'>
                    <span><i class="fa-regular fa-fire"></i></span>
                    <span className='popular-channel-text'>Popular</span>
                </div>
            </div>
            <div className='topic-margin-div'>
                <span className='topics-text'>TOPICS</span>
                <div className='gaming-channel-div'>
                    <span><i class="fa-brands fa-twitch"></i></span>
                    <span className='home-channel-text'>Gaming</span>
                </div>
                <div className='sports-channel-div'>
                    <span><i class="fa-solid fa-basketball"></i></span>
                    <span className='home-channel-text'>Sports</span>
                </div>
                <div className='business-channel-div'>
                    <span><i class="fa-solid fa-coins"></i></span>
                    <span className='home-channel-text'>Business, Economics, a..</span>
                </div>
                <div className='crypto-channel-div'>
                    <span><i class="fa-brands fa-bitcoin"></i></span>
                    <span className='home-channel-text'>Crypto</span>
                </div>
                <div className='tv-channel-div'>
                    <span><i class="fa-solid fa-tv"></i></span>
                    <span className='home-channel-text'>Television</span>
                </div>
                <div className='celeb-channel-div'>
                    <span><i class="fa-regular fa-star"></i></span>
                    <span className='home-channel-text'>Celebrity</span>
                </div>
                <div className='more-topics-div'>
                    <span><i class="fa-solid fa-ellipsis"></i></span>
                    <span className='home-channel-text'>More Topics</span>
                </div>
            </div>
            <div className='join-threadit-div'>
                <span className='join-text'>
                Create an account to follow your favorite communities and start taking part in conversations.
                </span>
            </div>
            <div className='join-now-btn'>
                <OpenModalButton
                    buttonText={<span className='join-now-text'>Join Threadit</span>}
                    modalComponent={<SignupFormPage />}
                />
            </div>
        </div>
    )


}



export default FeedSideBar;
