import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
        </div>
    )


}



export default FeedSideBar;
