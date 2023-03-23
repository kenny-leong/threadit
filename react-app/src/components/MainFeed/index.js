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
                    <div className='trend-box one'>
                        <div className='trend-headings'>
                            <span className='trend-title'>Chonky(?) Cats</span>
                            <span className='trend-desc'>Why more Gen Z than ever are getting chonky cats to prevent...</span>
                            <span className='trend-category'>r/amazingcats and more</span>
                        </div>
                    </div>
                    <div className='trend-box two'>
                        <div className='trend-headings'>
                            <span className='trend-title'>Maplestory</span>
                            <span className='trend-desc'>The game has gained a large following and has been praise...</span>
                            <span className='trend-category'>r/coding and more</span>
                        </div>
                    </div>
                    <div className='trend-box three'>
                        <div className='trend-headings'>
                            <span className='trend-title'>Viral Anime</span>
                            <span className='trend-desc'>A modern action adventure road story where a 17-year-old girl...</span>
                            <span className='trend-category'>r/anime and more</span>
                        </div>
                    </div>
                    <div className='trend-box four'>
                        <div className='trend-headings'>
                            <span className='trend-title'>Software Engineers</span>
                            <span className='trend-desc'>With the rapid growth of technology and digital revolu...</span>
                            <span className='trend-category'>r/cscareers and more</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default MainFeed;