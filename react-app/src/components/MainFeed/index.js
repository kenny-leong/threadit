import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './MainFeed.css'



function MainFeed() {


    return (
        <div className='main-feed-div'>
            <div className='trending-div'>
                <span className='trending-text'>Trending today</span>
                <div className='trend-box-div'>
                    <div className='trend-box'>
                        <div className='trend-headings'>
                            <span className='trend-title'>Chonky Cats</span>
                            <span className='trend-desc'>Why you need a chonky cat today according to Gen Z</span>
                        </div>
                    </div>
                    <div className='trend-box'>
                        <div className='trend-headings'>
                            <span className='trend-title'>Kenny Leong</span>
                            <span className='trend-desc'>Why you need a chonky cat today according to Gen Z</span>
                        </div>
                    </div>
                    <div className='trend-box'>
                        <div className='trend-headings'>
                            <span className='trend-title'>Python</span>
                            <span className='trend-desc'>Why you need a chonky cat today according to Gen Z</span>
                        </div>
                    </div>
                    <div className='trend-box'>
                        <div className='trend-headings'>
                            <span className='trend-title'>Software Engineers</span>
                            <span className='trend-desc'>Why you need a chonky cat today according to Gen Z</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default MainFeed;
