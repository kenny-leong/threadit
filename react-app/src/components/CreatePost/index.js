import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { getSingleSR } from '../../store/subreddit';
import { createPost } from '../../store/post';
import './CreatePost.css';



function CreatePost() {

    const [title, setTitle] = useState("");
    const [textContent, setTextContent] = useState("");
    const [imageURL, setImageURL] = useState("");
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const subredditDetails = useSelector(state => state.subreddit.singleSubreddit);



    const handleSubmit = async (e) => {
        e.preventDefault();

        await dispatch(createPost(title, textContent, subredditDetails.id, imageURL))
        .then(() => {
            dispatch(getSingleSR(subredditDetails.id));
            closeModal();
        })
    }



    return (
        <div className='create-post-component'>
            <div className='create-post-title'>
                <span className='post-heading-title'>Create a Post</span>
            </div>
            <div className='typeof-post-div'>
                <div className='typeof-post'>
                    <i class="fa-solid fa-comment-dots"></i>
                    <span className='typeof-heading'>Post</span>
                </div>
                <div className='typeof-post'>
                    <i class="fa-solid fa-image"></i>
                    <span className='typeof-heading'>Image</span>
                </div>
                <div className='typeof-post'>
                    <i class="fa-solid fa-link"></i>
                    <span className='typeof-heading'>Link</span>
                </div>
            </div>
            <input
                type="text"
                value={title}
                placeholder='Title'
                onChange={(e) => setTitle(e.target.value)}
                className='create-post-sr popup'
            />
            <div className='ta-div'>
                <textarea
                        value={textContent}
                        placeholder='Text (optional)'
                        className='sr-textarea-desc popup'
                        onChange={(e) => setTextContent(e.target.value)}
                />
            </div>
            <div className='create-post-btn-container'>
                <button className='create-post-btn cancel' onClick={closeModal}>Cancel</button>
                <button className='create-post-btn post' onClick={handleSubmit}>Post</button>
            </div>
        </div>
    )



}



export default CreatePost;
