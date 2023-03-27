import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal"
import { editSubreddit } from '../../store/subreddit';
import { getSubredditPosts } from '../../store/post';
import { deletePost } from '../../store/post';
import './DeletePost.css';




function DeletePost({ postId }) {
    const dispatch = useDispatch();
    const subredditDetails = useSelector(state => state.subreddit.singleSubreddit);
    const { closeModal } = useModal();

    console.log(postId)

    const handleDeletePost = async (e) => {
        e.preventDefault();

        await dispatch(deletePost(postId))
        .then(() => {
            dispatch(getSubredditPosts(subredditDetails.id));
            closeModal();
        })
    }


    return (
        <div className='delete-post-modal'>
            <span className='confirm-delete-post'>Are you sure you want to delete this post?</span>
            <div className='cancel-delete popup'>
                <button className='post-cancel-button-popup'>Cancel</button>
                <button className='delete-btn-post popup' onClick={handleDeletePost}>Delete</button>
            </div>
        </div>
    )

}

export default DeletePost;
