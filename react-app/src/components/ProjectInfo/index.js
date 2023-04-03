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
                    <span className="tech-stack-title">TECH STACK</span>
                </div>
                <span className="tech-stack-desc">For my tech stack I used a combination of Flask, PostgreSQL, React, and Redux — this stack is often referred to as PERN + Redux (PostgreSQL, Express.js, React, Node.js, and Redux state management) except with Flask replacing Express.js. This tech stack is designed to provide high performance and speed. React provides fast rendering of the front-end, while PostgreSQL is highly optimized for database queries.</span>
                <div className="stacks-used-div">
                    <div className="stacks-used languages">
                        <span className="stack-title">Languages Used</span>
                        <span className="stack-items">Python</span>
                        <span className="stack-items">Javascript</span>
                        <span className="stack-items">HTML</span>
                        <span className="stack-items">CSS</span>

                    </div>
                    <div className="stacks-used backend">
                        <span className="stack-title">Backend</span>
                        <span className="stack-items">Alembic</span>
                        <span className="stack-items">Flask</span>
                        <span className="stack-items">SQLAlchemy</span>
                        <span className="stack-items">PostgreSQL</span>
                        <span className="stack-items">Werkzeug</span>
                    </div>
                    <div className="stacks-used frontend">
                        <span className="stack-title">Frontend</span>
                        <span className="stack-items">React</span>
                        <span className="stack-items">Redux</span>
                    </div>
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
