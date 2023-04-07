import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getOwnedSubreddits, getSingleSR } from "../../store/subreddit";
import ghibli from '../../static/transparent-ghibli.png';
import UpdateSubreddit from '../UpdateSubreddit';
import OpenModalButton from '../OpenModalButton';
import { useModal } from "../../context/Modal"
import DeleteSubreddit from "./DeleteSR";
import './OwnedSR.css';








function OwnedSR() {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const ownedSubreddits = useSelector(state => state.subreddit.ownedSubreddits);
    const { setModalContent } = useModal();

    const nullProfilePic = 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'



    useEffect(() => {
        if (sessionUser) dispatch(getOwnedSubreddits(sessionUser.id))
    }, [dispatch, sessionUser])


    if (ownedSubreddits === undefined) return null;



    //opens the Delete Subreddit component
    const openModal = (subredditId) => {
        setModalContent(<DeleteSubreddit subredditId={subredditId}/>);
    };


    const ownedSRArr = Object.values(ownedSubreddits)

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
                            <img className="owned-sr-profile-pic"
                            alt='profile-pic'
                            src={subreddit.profile_picture ? subreddit.profile_picture : nullProfilePic}
                            onError={(e) => {e.target.onerror = null; e.target.src=nullProfilePic}}
                            />
                            <Link to={`/subreddits/${subreddit.id}`}>
                                <span className="owned-sr-name">{`r/${subreddit.name}`}</span>
                            </Link>
                            <span className="owned-sr-desc">{subreddit.description}</span>
                        </div>
                        <div className="owned-sr-edit-delete-div">
                            <OpenModalButton
                                buttonText={<span className='update-sr-owned'>Update</span>}
                                modalComponent={<UpdateSubreddit />}
                                className='update-sr-btn-owned'
                                onButtonClick={() => dispatch(getSingleSR(subreddit.id))}
                            />
                            <button className="delete-owned-sr" onClick={() => openModal(subreddit.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default OwnedSR;
