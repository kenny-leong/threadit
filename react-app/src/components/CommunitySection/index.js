import React from 'react';
import { Link } from 'react-router-dom';
import './Community.css'



function CommunitySection() {



    return (
        <>
            <div className='popular-box-container'>
                <div>
                    <span>POPULAR COMMUNITIES</span>
                </div>
                <div>
                    <span>GAMING</span>
                </div>
                <div>
                    <span>SPORTS</span>
                </div>
                <div>
                    <span>TV</span>
                </div>
                <div>
                    <span>TRAVEL</span>
                </div>
                <div>
                    <span>{`HEALTH & FITNESS`}</span>
                </div>
                <div>
                    <span>FASHION</span>
                </div>
            </div>
            <div className='right-bar-links'>
                <div className='line-div'>
                    <div className='ua-and-pp'>
                        <a href='https://www.linkedin.com/in/kenny-leong97/' target='_blank' rel="noopener noreferrer">LinkedIn Profile</a>
                        <a href='https://github.com/kenny-leong' target='_blank' rel="noopener noreferrer">GitHub Profile</a>
                    </div>
                    <div className='cp-and-mcc'>
                        <a href='https://github.com/kenny-leong/threadit' target='_blank' rel="noopener noreferrer">Threadit Repository</a>
                        <span>Technologies Used</span>
                    </div>
                </div>
            </div>
            <span className='trademark'>Kenny Leong © 2023. All rights reserved</span>
        </>
    )
}


export default CommunitySection;
