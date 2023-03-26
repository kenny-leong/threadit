import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { deleteSubreddit, getAllSR, getOwnedSubreddits } from "../../store/subreddit";
import { authenticate } from "../../store/session";
import ghibli from '../../static/transparent-ghibli.png'
import './OwnedSR.css'








function OwnedSR() {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const ownedSubreddits = useSelector(state => state.subreddit.ownedSubreddits);


    const nullProfilePic = 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'



    useEffect(() => {
        dispatch(getOwnedSubreddits(sessionUser.id))
    }, [dispatch, sessionUser])



    let ownedSRArr;

    if (ownedSubreddits) {
        ownedSRArr = Object.values(ownedSubreddits)
    }

    if (ownedSRArr === undefined) return null;

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
                <span className="owned-sr-title">threadit for owners.</span>
            </div>
            <img src={ghibli} className='ghibli-img' alt='ghibli-img'/>
            <div className="sr-box-container">
                {ownedSRArr.map((subreddit, index) => (
                    <div className="owned-subreddit-box" key={index}>
                        <div className="box-section-sr">
                            <img className="owned-sr-profile-pic" alt='profile-pic' src={subreddit.profile_picture ? subreddit.profile_picture : nullProfilePic} />
                            <Link to={`/subreddits/${subreddit.id}`}>
                                <span className="owned-sr-name">{`r/${subreddit.name}`}</span>
                            </Link>
                            <span className="owned-sr-desc">{subreddit.description}</span>
                        </div>
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
