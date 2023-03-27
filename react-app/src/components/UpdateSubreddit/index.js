import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal"
import { editSubreddit } from '../../store/subreddit';
import { getSingleSR, getOwnedSubreddits } from '../../store/subreddit';
import './UpdateSubreddit.css'



function UpdateSubreddit() {

    const [name, setName] = useState("");
    const [bannerURL, setBannerURL] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [description, setDescription] = useState("");
    const [subredditId, setSubredditId] = useState(null);
    const { closeModal } = useModal();
    const dispatch = useDispatch();


    const sessionUser = useSelector(state => state.session.user);
    const subredditDetails = useSelector(state => state.subreddit.singleSubreddit);


    useEffect(() => {
        if (subredditDetails) setName(subredditDetails.name)
        if (subredditDetails) setBannerURL(subredditDetails.banner_image)
        if (subredditDetails) setProfilePic(subredditDetails.profile_picture)
        if (subredditDetails) setDescription(subredditDetails.description)
        if (subredditDetails) setSubredditId(subredditDetails.id)
    }, [dispatch, subredditDetails])

    const handleSubmit = async (e) => {
        e.preventDefault();


        await dispatch(editSubreddit(subredditId, name, description, profilePic, bannerURL))
        .then(() => {
            dispatch(getSingleSR(subredditId))
            dispatch(getOwnedSubreddits(sessionUser.id))
            closeModal()
        })
    }


    return (
        <div className='update-sr-div'>
            <div className='width-adjustment-div'>
                <div className='create-sr-heading-div'>
                    <span className='create-sr-heading'>Update Subthreadit</span>
                </div>
                <div className='create-sr-name-div'>
                    <span className='create-sr-name'>Name</span>
                    <span className='name-tos'>Name may longer be edited after creation.</span>
                </div>
                <span className='placeholder-update'>r/</span>
                <input
                    type="text"
                    value={name}
                    placeholder='Type Banner URL....'
                    className='sr-input-name'
                    onChange={(e) => setName(e.target.value)}
                    disabled
                />
                <div className='create-sr-name-div'>
                    <span className='create-sr-name'>Banner Image URL</span>
                    <span className='name-tos'>Let others see what you're all about with a banner image. (Optional)</span>
                </div>
                <input
                    type="text"
                    value={bannerURL}
                    placeholder='Type Banner URL....'
                    className='sr-input-name'
                    onChange={(e) => setBannerURL(e.target.value)}
                />
                <div className='create-sr-name-div'>
                    <span className='create-sr-name'>Profile Picture</span>
                    <span className='name-tos'>Add some colors to your profile with a profile picture. (Optional)</span>
                </div>
                <input
                    type="text"
                    value={profilePic}
                    placeholder='Enter Image URL....'
                    className='sr-input-name'
                    onChange={(e) => setProfilePic(e.target.value)}
                />
                <div className='create-sr-name-div'>
                    <span className='create-sr-name'>Short Description</span>
                    <span className='name-tos'>Include a short description of your new community. (Optional)</span>
                </div>
                <textarea
                    value={description}
                    placeholder='Please type here....'
                    className='sr-textarea-desc'
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={100}
                />
            </div>
            <div className='create-sr-btn-div'>
                <button className='cancel-sr-btn' onClick={closeModal}>Cancel</button>
                <button className='create-sr-btn' onClick={handleSubmit}>Update Threadit</button>
            </div>
        </div>
    )
}




export default UpdateSubreddit;
