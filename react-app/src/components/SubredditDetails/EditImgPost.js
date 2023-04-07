import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import EditPost from './EditPost';
import { useModal } from "../../context/Modal";
import { updatePost, getSubredditPosts } from '../../store/post';
import EditLink from './EditLink';




function EditImgPost({ post }) {

    const [title, setTitle] = useState(post.title);
    const [imageURL, setImageURL] = useState(post.image_url);
    const { closeModal, setModalContent } = useModal();
    const dispatch = useDispatch();


    const subredditDetails = useSelector(state => state.subreddit.singleSubreddit);



    const handleSubmit = async (e) => {
        e.preventDefault();

        await dispatch(updatePost(post.id, title, null, imageURL))
        .then(() => {
            dispatch(getSubredditPosts(subredditDetails.id));
            closeModal();
        })
    }

    const openModal = () => {
        setModalContent(<EditPost post={post}/>);
    };

    const openLink = () => {
        setModalContent(<EditLink post={post}/>)
    };


    return (
        <div className='create-post-component img'>
            <div className='create-post-title'>
                <span className='post-heading-title'>Update Post</span>
            </div>
            <div className='typeof-post-div'>
                <div className='typeof-post' onClick={openModal}>
                    <i class="fa-solid fa-comment-dots"></i>
                    <span className='typeof-heading'>Text</span>
                </div>
                <div className='typeof-post image'>
                    <i class="fa-solid fa-image"></i>
                    <span className='typeof-heading'>Image</span>
                </div>
                <div className='typeof-post' onClick={openLink}>
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
                <button className='create-post-btn post' onClick={handleSubmit} disabled={(title && title.length === 0) || (imageURL && imageURL.length < 8) || (!imageURL)}>Edit Post</button>
            </div>
        </div>
    )
}




export default EditImgPost;
