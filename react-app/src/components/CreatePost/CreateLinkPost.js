import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createPost, getSubredditPosts } from '../../store/post';
import CreatePostImage from './PostImage';
import CreatePost from '.';
import './CreateLinkPost.css';



function CreateLink() {

    const [title, setTitle] = useState("");
    const [textContent, setTextContent] = useState("");
    const { closeModal, setModalContent } = useModal();
    const dispatch = useDispatch();

    const subredditDetails = useSelector(state => state.subreddit.singleSubreddit);



    const handleSubmit = async (e) => {
        e.preventDefault();

        await dispatch(createPost(title, textContent, subredditDetails.id))
        .then(() => {
            dispatch(getSubredditPosts(subredditDetails.id));
            closeModal();
        })
    }

    const openText = () => {
        setModalContent(<CreatePost />);
    };

    const openImage = () => {
        setModalContent(<CreatePostImage />);
    };

    return (
        <div className='create-post-component link'>
            <div className='create-post-title'>
                <span className='post-heading-title'>Create a Post</span>
            </div>
            <div className='typeof-post-div' >
                <div className='typeof-post text-modal' onClick={() => {openText()}}>
                    <i class="fa-solid fa-comment-dots"></i>
                    <span className='typeof-heading'>Text</span>
                </div>
                <div className='typeof-post image-modal' onClick={openImage}>
                    <i class="fa-solid fa-image"></i>
                    <span className='typeof-heading'>Image</span>
                </div>
                <div className='typeof-post link'>
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
                required
            />
            <input
                type="text"
                value={textContent}
                placeholder='Link URL'
                onChange={(e) => setTextContent(e.target.value)}
                className='create-post-sr popup'
                required
            />
            <div className='create-post-btn-container'>
                <button className='create-post-btn cancel' onClick={closeModal}>Cancel</button>
                <button className='create-post-btn post' onClick={handleSubmit} disabled={title.length === 0}>Post</button>
            </div>
        </div>
    )
}



export default CreateLink;
