import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal"
import { createSubreddit, getAllSR } from '../../store/subreddit';
import { authenticate } from '../../store/session';
import './UpdateSubreddit.css'



function UpdateSubreddit({ originName, originDesc, originProfilePic, bannerImg }) {

    const [name, setName] = useState(originName);
    const [bannerURL, setBannerURL] = useState(bannerImg);
    const [profilePic, setProfilePic] = useState(originProfilePic);
    const [description, setDescription] = useState(originDesc);
    const { closeModal } = useModal();
    const dispatch = useDispatch();





    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await dispatch(createSubreddit(name, description))
            .then(() => {
                dispatch(getAllSR())
                dispatch(authenticate())
                closeModal()
            })

    }


    return (
        <div className='update-sr-div'>
            <div className='width-adjustment-div'>
                <div className='create-sr-heading-div'>
                    <span className='create-sr-heading'>Update Subthreadit</span>
                </div>
                <div className='create-sr-name-div'>
                    <span className='create-sr-name'>Banner Image URL</span>
                    <span className='name-tos'>All banner images are subject to review by Threadit.</span>
                </div>
                <input
                    type="text"
                    value={name}
                    placeholder='Name'
                    className='sr-input-name'
                    onChange={(e) => setName(e.target.value)}
                    maxLength={16}
                    required
                />
                <div className='create-sr-name-div'>
                    <span className='create-sr-name'>Short Description</span>
                    <span className='name-tos'>Include a short description of your new community. (Optional)</span>
                </div>
                <textarea
                    value={description}
                    placeholder='Please type here....'
                    className='sr-textarea-desc'
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={100}
                />
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
                        <i class="fa-solid fa-eye-low-vision"></i>
                        <span className="text-radio">Restricted</span>
                        <span className="text-radio-desc">Anyone can view this community, but only approved users can post</span>
                    </div>
                </div>
                <div className="radio-buttons-container">
                    <input type="radio" id="text" name="channel-type" value="text" disabled/>
                    <div className="radio-button">
                        <i class="fa-solid fa-lock"></i>
                        <span className="text-radio">Private</span>
                        <span className="text-radio-desc">Only approved users can view and submit to this community</span>
                    </div>
                </div>
                <div className='adult-div'>
                    <span className='create-sr-type adult'>Adult Content</span>
                </div>
                <div className='checkbox-div'>
                    <input
                        type="checkbox"
                        className='checkbox-ele'
                        readOnly
                    />
                    <div className='nsfw-div'>
                        <span className='nsfw'>NSFW</span>
                    </div>
                    <span className='nsfw-num'>18+ year old community</span>
                </div>
            </div>
            <div className='create-sr-btn-div'>
                <button className='cancel-sr-btn' onClick={closeModal}>Cancel</button>
                <button className='create-sr-btn' onClick={handleSubmit} disabled={!name}>Create Community</button>
            </div>
        </div>
    )
}




export default UpdateSubreddit;
