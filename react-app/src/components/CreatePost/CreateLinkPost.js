import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createPost, getSubredditPosts } from '../../store/post';
import CreatePostImage from './PostImage';
import CreatePost from '.';
import axios from 'axios';
import './CreateLinkPost.css';



function CreateLink() {

    const [title, setTitle] = useState("");
    const [linkURL, setLinkURL] = useState("");
    const [error, setError] = useState('');
    const { closeModal, setModalContent } = useModal();

    const dispatch = useDispatch();

    const subredditDetails = useSelector(state => state.subreddit.singleSubreddit);


    const handleURL = async (e) => {
        e.preventDefault();

        const response = await axios.get(linkURL)
        .then(async () => {
            if (response.status === 200) {
                await dispatch(createPost(title, linkURL, subredditDetails.id));
                dispatch(getSubredditPosts(subredditDetails.id));
                closeModal();
            }
        })
        .catch((err) => {
            setError('Please enter a valid URL')
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        await dispatch(createPost(title, linkURL, subredditDetails.id))
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
                value={linkURL}
                placeholder='Link URL'
                onChange={(e) => setLinkURL(e.target.value)}
                className='create-post-sr popup'
                required
            />
            {error && (
                <div className='link-post-err-div'>
                    <span className='error-msg-link-post'>{error}</span>
                </div>
            )}
            <div className='create-post-btn-container'>
                <button className='create-post-btn cancel' onClick={closeModal}>Cancel</button>
                <button className='create-post-btn post' onClick={handleURL} disabled={title.length === 0 || linkURL.length === 0}>Post</button>
            </div>
        </div>
    )
}



export default CreateLink;
