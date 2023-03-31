import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal"
import { createSubreddit, getOwnedSubreddits, getAllSR } from '../../store/subreddit';
import './CreateSubreddit.css'



function CreateSubreddit() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [charactersLeft, setCharactersLeft] = useState(16);
    const { closeModal } = useModal();
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();


    useEffect(() => {
        setCharactersLeft(16 - name.length);
    }, [name]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newSubreddit = await dispatch(createSubreddit(name, description))
            .then(() => {
                dispatch(getOwnedSubreddits(sessionUser.id));
                dispatch(getAllSR())
                closeModal();
            })

    }



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
                    className='sr-input-name name'
                    onChange={(e) => setName(e.target.value)}
                    maxLength={16}
                    required
                />
                <div className='char-left-div'>
                    <span className='characters-left-text'>{`${charactersLeft} characters left`}</span>
                </div>
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


export default CreateSubreddit;
