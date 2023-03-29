import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import CreatePost from '.';
import { useModal } from "../../context/Modal";
import { createPost, getSubredditPosts } from '../../store/post';
import CreateLink from './CreateLinkPost';
import './CreateImgPost.css';




function CreatePostImage() {

    const [title, setTitle] = useState("");
    const [imageURL, setImageURL] = useState("");
    const { closeModal, setModalContent } = useModal();
    const dispatch = useDispatch();


    const subredditDetails = useSelector(state => state.subreddit.singleSubreddit);



    const handleSubmit = async (e) => {
        e.preventDefault();

        await dispatch(createPost(title, null, subredditDetails.id, imageURL))
        .then(() => {
            dispatch(getSubredditPosts(subredditDetails.id));
            closeModal();
        })
    }

    const openText = () => {
        setModalContent(<CreatePost />);
    };

    const openLink = () => {
        setModalContent(<CreateLink />);
    };


    return (
        <div className='create-post-component img'>
            <div className='create-post-title'>
                <span className='post-heading-title'>Create a Post</span>
            </div>
            <div className='typeof-post-div'>
                <div className='typeof-post text-model' onClick={openText}>
                    <i class="fa-solid fa-comment-dots"></i>
                    <span className='typeof-heading'>Text</span>
                </div>
                <div className='typeof-post image'>
                    <i class="fa-solid fa-image"></i>
                    <span className='typeof-heading'>Image</span>
                </div>
                <div className='typeof-post link-model' onClick={openLink}>
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
                value={imageURL}
                placeholder='Image URL'
                onChange={(e) => setImageURL(e.target.value)}
                className='create-post-sr popup'
                required
            />
            <div className='create-post-btn-container'>
                <button className='create-post-btn cancel' onClick={closeModal}>Cancel</button>
                <button className='create-post-btn post' onClick={handleSubmit} disabled={title.length === 0 || imageURL.length < 8}>Post</button>
            </div>
        </div>
    )
}




export default CreatePostImage;
