import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal"
import { getComments, deleteComment } from '../../store/comment';




function DeleteComment({ comment }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDeleteComment = async (e) => {
        e.preventDefault();

        await dispatch(deleteComment(comment.id))
        .then(() => {
            dispatch(getComments(comment.post_id))
            closeModal();
        })
    }


    return (
        <div className='delete-post-modal'>
            <span className='confirm-delete-post'>Are you sure you want to delete this comment?</span>
            <div className='cancel-delete popup'>
                <button className='post-cancel-button-popup' onClick={closeModal}>Cancel</button>
                <button className='delete-btn-post popup' onClick={handleDeleteComment}>Delete</button>
            </div>
        </div>
    )

}

export default DeleteComment;
