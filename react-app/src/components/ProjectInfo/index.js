import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import background from '../../static/proj-info.jpeg';
import pfp from '../../static/cup-noodles.jpeg';
import './ProjectInfo.css';







function ProjectInfo() {




    return (
        <div className="project-info-div">
            <div className="image-bg-proj-info">
                <img src={background} alt='background' className='bg-image-proj' />
            </div>
            <div className="text-over-bg">
                <span className="title-proj">A WORLD FULL OF POSSIBILITIES . . . </span>
                <span className="subheading-proj">Behold Threadit - a digital realm where passions are shared and like-minded individuals unite.</span>
                <span className="threadit-desc-proj">Explore the endless possibilities of conversations on Threadit, where a boundless range of topics await your intrigue - from current events and political musings, to sports and entertainment. With our simple and intuitive interface, navigating and discovering the content that resonates with you is effortless.</span>
                <span className="threadit-desc-proj">But there is more - Threadit is a hub where users who share similar interests and aspirations can connect and network. From exchanging ideas to fostering new relationships, Threadit offers a world of opportunity for all who enter. Embrace the journey of discovery and dialogue. Join Threadit today and be a part of the conversation. Sign up now and experience the boundless possibilities of the online universe.</span>
                <div className="tech-used">
                    <span className="title-proj">TECHNOLOGIES USED</span>

                </div>




                <div className="creator-profile">
                    <span className="title-proj-dev">MEET THE CREATOR</span>
                    <span className="creator-name">Kenny Leong</span>
                    <div className="profile-pic-creator">
                        <img src={pfp} alt='profile_pic' className="profile-pic"/>
                    </div>
                    <div className="creator-links">
                        <a href='https://www.linkedin.com/in/kenny-leong97/' target='_blank' rel="noopener noreferrer">LinkedIn</a>
                        <a href='https://github.com/kenny-leong' target='_blank' rel="noopener noreferrer">GitHub</a>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ProjectInfo;
