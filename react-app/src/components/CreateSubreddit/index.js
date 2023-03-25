import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './CreateSubreddit.css'



function CreateSubreddit() {

    const [name, setName] = useState("");
    const [charactersLeft, setCharactersLeft] = useState(16);

    useEffect(() => {
        setCharactersLeft(16 - name.length);
    }, [name]);

    return (
        <div className='create-sr-div'>
            <div className='width-adjustment-div'>
                <div className='create-sr-heading-div'>
                    <span className='create-sr-heading'>Create a Community</span>
                </div>
                <div className='create-sr-name-div'>
                    <span className='create-sr-name'>Name</span>
                    <span className='name-tos'>Community names including capitalization cannot be changed.</span>
                </div>
                <span className='placeholder-text'>r/</span>
                <input
                    type="text"
                    value={name}
                    placeholder='Name'
                    className='sr-input-name'
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <div className='char-left-div'>
                    <span className='characters-left-text'>{`${charactersLeft} characters left`}</span>
                </div>
                <p className='create-sr-type'>Community Type</p>
                <div className="radio-buttons-container">
                    <input type="radio" id="text" name="channel-type" value="text" checked/>
                    <div className="radio-button">
                        <i class="fa-solid fa-user"></i>
                        <span className="text-radio">Public</span>
                        <span className="text-radio-desc">Anyone can view, post, and comment to this community</span>
                    </div>
                </div>
                <div className="radio-buttons-container">
                    <input type="radio" id="text" name="channel-type" value="text" disabled/>
                    <div className="radio-button">
                        <i class="fa-solid fa-user"></i>
                        <span className="text-radio">Restricted</span>
                        <span className="text-radio-desc">Anyone can view this community, but only approved users can post</span>
                    </div>
                </div>
                <div className="radio-buttons-container">
                    <input type="radio" id="text" name="channel-type" value="text" disabled/>
                    <div className="radio-button">
                        <i class="fa-solid fa-user"></i>
                        <span className="text-radio">Private</span>
                        <span className="text-radio-desc">Only approved users can view and submit to this community</span>
                    </div>
                </div>
            </div>
        </div>
    )




}


export default CreateSubreddit;
