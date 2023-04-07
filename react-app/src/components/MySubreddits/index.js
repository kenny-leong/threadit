import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getSubredditsByUser, removeSubredditMember, getSubredditMembers, getAllSR } from "../../store/subreddit";
import peek from '../../static/peeking.png'
import UpdateSubreddit from '../UpdateSubreddit';
import OpenModalButton from '../OpenModalButton';
import { getSingleSR } from '../../store/subreddit';
import { useModal } from "../../context/Modal";
import DeleteSubreddit from "../OwnedSR/DeleteSR";







function MySubreddits() {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const subredditMemberships = useSelector(state => state.subreddit.memberSubreddits);
    const allSubreddits = useSelector(state => state.subreddit.allSubreddits);
    const { closeModal, setModalContent } = useModal();

    const nullProfilePic = 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'



    useEffect(() => {
        if (sessionUser) dispatch(getSubredditsByUser(sessionUser.id))
        if (sessionUser) dispatch(getAllSR())
    }, [dispatch, sessionUser])


    if (!subredditMemberships || !allSubreddits) return null;

    const subredditMembershipArr = [];

    const subredditArr = Object.values(subredditMemberships);

    subredditArr.forEach(subreddit => {
        subredditMembershipArr.push(allSubreddits[subreddit.subreddit_id])
    });



    //opens the Delete Subreddit component
    const openModal = (subredditId) => {
        setModalContent(<DeleteSubreddit subredditId={subredditId}/>);
    };


    // handles leaving a subreddit
	const handleLeave = async (subredditId) => {

		await dispatch(removeSubredditMember(subredditId, sessionUser.id))
        .then(() => {
            dispatch(getSubredditsByUser(sessionUser.id))
            dispatch(getSubredditMembers(subredditId))
            closeModal();
        });
	};




    return (
        <div className="owned-div">
            <div className="owned-sr-heading-div">
                <span className="owned-sr-title">my communities.</span>
            </div>
            <img src={peek} className='ghibli-img' alt='ghibli-img'/>
            <div className="sr-box-container">
                {subredditMembershipArr.map((subreddit, index) => (
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
                            <span className="owned-sr-desc">
                                {subreddit.description.length > 100
                                    ? `${subreddit.description.slice(0, 100)}...`
                                    : subreddit.description}
                            </span>
                        </div>
                        {subreddit.creator_id === sessionUser.id && (
                            <div className="owned-sr-edit-delete-div">
                                <OpenModalButton
                                    buttonText={<span className='update-sr-owned'>Update</span>}
                                    modalComponent={<UpdateSubreddit />}
                                    className='update-sr-btn-owned'
                                    onButtonClick={() => dispatch(getSingleSR(subreddit.id))}
                                />
                                <button className="delete-owned-sr" onClick={() => openModal(subreddit.id)}>Delete</button>
                            </div>
                        )}
                        {subreddit.creator_id !== sessionUser.id && (
                            <div className="leave-subreddit-div">
                                <button className="delete-owned-sr" onClick={() => handleLeave(subreddit.id)}>Leave</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}


export default MySubreddits;
