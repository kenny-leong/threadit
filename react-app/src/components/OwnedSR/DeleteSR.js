import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal"
import { deleteSubreddit, getOwnedSubreddits } from '../../store/subreddit'



function DeleteSubreddit({ subredditId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const sessionUser = useSelector(state => state.session.user);


    const handleDelete = async () => {
        await dispatch(deleteSubreddit(subredditId))
            .then(() => {
                dispatch(getOwnedSubreddits(sessionUser.id))
                closeModal();
            })
    };


    return (
        <div className='delete-post-modal'>
            <span className='confirm-delete-post'>Are you sure you want to delete this subthreadit?</span>
            <div className='cancel-delete popup'>
                <button className='post-cancel-button-popup' onClick={closeModal}>Cancel</button>
                <button className='delete-btn-post popup' onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )

}

export default DeleteSubreddit;
