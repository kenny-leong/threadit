import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts } from '../../store/post';
import { getAllUsers } from '../../store/session';
import OpenModalButton from '../OpenModalButton'
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
                <div className='ua-and-pp'>
                    <span>User Agreement</span>
                    <span>Privacy Policy</span>
                </div>
                <div className='cp-and-mcc'>
                    <span>Content Policy</span>
                    <span>Moderator Code of Conduct</span>
                </div>
            </div>
            <span className='trademark'>Threadit Inc © 2023. All rights reserved</span>
        </>
    )
}


export default CommunitySection;
