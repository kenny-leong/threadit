import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Community.css'



function CommunitySection() {

    const [isPopularOpen, setIsPopularOpen] = useState(false);
    const [isGamingOpen, setIsGamingOpen] = useState(false);
    const [isSportsOpen, setIsSportsOpen] = useState(false);
    const [isTVOpen, setIsTVOpen] = useState(false);
    const [isTravelOpen, setIsTravelOpen] = useState(false);
    const [isHealthOpen, setIsHealthOpen] = useState(false);
    const [isFashionOpen, setIsFashionOpen] = useState(false);


    const togglePopularDropdown = () => {
        setIsPopularOpen(!isPopularOpen);
    };

    const toggleGamingDropdown = () => {
        setIsGamingOpen(!isGamingOpen);
    };

    const toggleSportsDropdown = () => {
        setIsSportsOpen(!isSportsOpen);
    };

    const toggleTVDropdown = () => {
        setIsTVOpen(!isTVOpen);
    };

    const toggleTravelDropdown = () => {
        setIsTravelOpen(!isTravelOpen);
    };

    const toggleHealthDropdown = () => {
        setIsHealthOpen(!isHealthOpen);
    };

    const toggleFashionDropdown = () => {
        setIsFashionOpen(!isFashionOpen);
    };


    return (
        <div className='communities-and-links-div'>
            <div className='communities-container'>
                <div className='com-topic-div' onClick={togglePopularDropdown}>
                    <span className='com-topic-text'>POPULAR COMMUNITIES</span>
                </div>
                {isPopularOpen && (
                    <div className='dropdown-com popular'>
                        <Link to='/subreddits/1'>
                            <div className='dropdown-div popular'>
                                <span>AskThreadit</span>
                            </div>
                        </Link>
                        <Link to='/subreddits/22'>
                            <div className='dropdown-div popular'>
                                <span>BLACKPINK</span>
                            </div>
                        </Link>
                        <Link to='/subreddits/20'>
                            <div className='dropdown-div popular'>
                                <span>Kim Kardashian</span>
                            </div>
                        </Link>
                        <Link to='/subreddits/18'>
                            <div className='dropdown-div popular'>
                                <span>Demon Slayer</span>
                            </div>
                        </Link>
                        <Link to='/subreddits/25'>
                            <div className='dropdown-div popular'>
                                <span>Valorant</span>
                            </div>
                        </Link>
                        <Link to='/subreddits/34'>
                            <div className='dropdown-div popular'>
                                <span>MakeupAddiction</span>
                            </div>
                        </Link>
                    </div>
                )}
                <div onClick={toggleGamingDropdown} className='com-topic-div'>
                    <span className='com-topic-text'>GAMING</span>
                </div>
                {isGamingOpen && (
                    <div className='dropdown-com gaming'>
                        <Link to='/subreddits/25'>
                            <div className='dropdown-div gaming'>
                                <span>Valorant</span>
                            </div>
                        </Link>
                        <Link to='/subreddits/24'>
                            <div className='dropdown-div gaming'>
                                <span>Genshin Impact</span>
                            </div>
                        </Link>
                        <Link to='/subreddits/23'>
                            <div className='dropdown-div gaming'>
                                <span>Maplestory</span>
                            </div>
                        </Link>
                    </div>
                )}
                <div className='com-topic-div' onClick={toggleSportsDropdown}>
                    <span className='com-topic-text'>SPORTS</span>
                </div>
                {isSportsOpen && (
                    <div className='dropdown-com sports'>
                        <Link to='/subreddits/8'>
                            <div className='dropdown-div sports'>
                                <span>NFL</span>
                            </div>
                        </Link>
                        <Link to='/subreddits/10'>
                            <div className='dropdown-div sports'>
                                <span>World Cup</span>
                            </div>
                        </Link>
                        <Link to='/subreddits/9'>
                            <div className='dropdown-div sports'>
                                <span>NBA</span>
                            </div>
                        </Link>
                    </div>
                )}
                <div className='com-topic-div' onClick={toggleTVDropdown}>
                    <span className='com-topic-text'>ANIME</span>
                </div>
                {isTVOpen && (
                    <div className='dropdown-com anime'>
                        <Link to='/subreddits/17'>
                            <div className='dropdown-div anime'>
                                <span>Suzume No Tojimari</span>
                            </div>
                        </Link>
                        <Link to='/subreddits/18'>
                            <div className='dropdown-div anime'>
                                <span>Demon Slayer</span>
                            </div>
                        </Link>
                        <Link to='/subreddits/19'>
                            <div className='dropdown-div anime'>
                                <span>Jujutsu Kaisen</span>
                            </div>
                        </Link>
                    </div>
                )}
                <div className='com-topic-div' onClick={toggleTravelDropdown}>
                    <span className='com-topic-text'>TRAVEL</span>
                </div>
                {isTravelOpen && (
                    <div className='dropdown-com travel'>
                        <Link to='/subreddits/27'>
                            <div className='dropdown-div travel'>
                                <span>Japan</span>
                            </div>
                        </Link>
                        <Link to='/subreddits/29'>
                            <div className='dropdown-div travel'>
                                <span>China</span>
                            </div>
                        </Link>
                        <Link to='/subreddits/30'>
                            <div className='dropdown-div travel'>
                                <span>Thailand</span>
                            </div>
                        </Link>
                        <Link to='/subreddits/28'>
                            <div className='dropdown-div travel'>
                                <span>South Korea</span>
                            </div>
                        </Link>
                    </div>
                )}
                <div className='com-topic-div' onClick={toggleHealthDropdown}>
                    <span className='com-topic-text'>{`HEALTH & FITNESS`}</span>
                </div>
                {isHealthOpen && (
                    <div className='dropdown-com health'>
                        <Link to='/subreddits/31'>
                            <div className='dropdown-div health'>
                                <span>bodybuilding</span>
                            </div>
                        </Link>
                        <Link to='/subreddits/33'>
                            <div className='dropdown-div health'>
                                <span>crossfit</span>
                            </div>
                        </Link>
                        <Link to='/subreddits/32'>
                            <div className='dropdown-div health'>
                                <span>vegan</span>
                            </div>
                        </Link>
                    </div>
                )}
                <div className='com-topic-div' onClick={toggleFashionDropdown}>
                    <span className='com-topic-text'>FASHION</span>
                </div>
                {isFashionOpen && (
                    <div className='dropdown-com fashion'>
                        <Link to='/subreddits/36'>
                            <div className='dropdown-div fashion'>
                                <span>dior</span>
                            </div>
                        </Link>
                        <Link to='/subreddits/34'>
                            <div className='dropdown-div fashion'>
                                <span>MakeupAddiction</span>
                            </div>
                        </Link>
                        <Link to='/subreddits/35'>
                            <div className='dropdown-div fashion'>
                                <span>LouisVuitton</span>
                            </div>
                        </Link>
                    </div>
                )}
            </div>
            <div className='right-bar-links'>
                <div className='line-div'>
                    <div className='ua-and-pp'>
                        <a href='https://www.linkedin.com/in/kenny-leong97/' target='_blank' rel="noopener noreferrer">LinkedIn Profile</a>
                        <a href='https://github.com/kenny-leong' target='_blank' rel="noopener noreferrer">GitHub Profile</a>
                    </div>
                    <div className='cp-and-mcc'>
                        <a href='https://github.com/kenny-leong/threadit' target='_blank' rel="noopener noreferrer">Threadit Repository</a>
                        <Link to='/project-info'>
                            <span>Technologies Used</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='trademark-div'>
                <span className='trademark'>Kenny Leong © 2023. All rights reserved</span>
            </div>
        </div>
    )
}


export default CommunitySection;
