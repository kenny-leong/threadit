import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import { updateComment, getComments } from '../../store/comment'
import './EditComment.css';

function EditComment({ comment }) {

    const [textContent, setTextContent] = useState(comment.content);
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await dispatch(updateComment(comment.id, textContent))
        .then(() => {
            dispatch(getComments(comment.post_id))
            closeModal();
        })
    }

    return (
        <div className='create-comment-component'>
            <div className='create-post-title'>
                <span className='post-heading-title'>Update Comment</span>
            </div>
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
                <button className='create-post-btn post' onClick={handleSubmit} disabled={textContent.length === 0}>Edit</button>
            </div>
        </div>
    )
}


export default EditComment;
