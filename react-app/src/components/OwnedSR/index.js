import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSubreddit, getAllSR } from "../../store/subreddit";
import { authenticate } from "../../store/session";
import './OwnedSR.css'








function OwnedSR() {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);


    const nullProfilePic = 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'

    const handleDelete = async (subredditId) => {
        await dispatch(deleteSubreddit(subredditId))
            .then(() => {
                dispatch(getAllSR())
                dispatch(authenticate())
            })
    };


    return (
        <div className="owned-div">
            <div className="owned-sr-heading-div">
                <span className="owned-sr-title">Owned Subreddits</span>
            </div>
            <div className="sr-box-container">
                {sessionUser && sessionUser.owned_subreddits.map((subreddit, index) => (
                    <div className="owned-subreddit-box">
                        <img className="owned-sr-profile-pic" src={subreddit.profile_picture ? subreddit.profile_picture : nullProfilePic} />
                        <span className="owned-sr-name">{`r/${subreddit.name}`}</span>
                        <span className="owned-sr-desc">{subreddit.description}</span>
                        <div className="owned-sr-edit-delete-div">
                            <button className="update-owned-sr">Update</button>
                            <button className="delete-owned-sr" onClick={() => handleDelete(subreddit.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default OwnedSR;
