import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal"
import { getSubredditPosts, deletePost, getAllPosts } from '../../store/post';
import './DeletePost.css';




function DeletePost({ postId }) {
    const dispatch = useDispatch();
    const subredditDetails = useSelector(state => state.subreddit.singleSubreddit);
    const { closeModal } = useModal();

    const handleDeletePost = async (e) => {
        e.preventDefault();

        await dispatch(deletePost(postId))
        .then(() => {
            dispatch(getSubredditPosts(subredditDetails.id));
            dispatch(getAllPosts())
            closeModal();
        })
    }


    return (
        <div className='delete-post-modal'>
            <span className='confirm-delete-post'>Are you sure you want to delete this post?</span>
            <div className='cancel-delete popup'>
                <button className='post-cancel-button-popup' onClick={closeModal}>Cancel</button>
                <button className='delete-btn-post popup' onClick={handleDeletePost}>Delete</button>
            </div>
        </div>
    )

}

export default DeletePost;
