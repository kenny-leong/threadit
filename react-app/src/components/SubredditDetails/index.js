import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSubredditPosts } from '../../store/post';
import { getSingleSR } from '../../store/subreddit';
import OpenModalButton from '../OpenModalButton'
import { getAllSR } from '../../store/subreddit';
import bannerImg from '../../static/placeholder-banner.png'
import './SubredditDetails.css'




function SubredditDetails() {
    const dispatch = useDispatch();
    const { subredditId } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image_url, setImageUrl] = useState("");

    const subredditDetails = useSelector(state => state.subreddit.singleSubreddit);
    const subredditPosts = useSelector(state => state.post.subredditPosts);


    useEffect(() => {
        dispatch(getSingleSR(subredditId))
        dispatch(getSubredditPosts(subredditId))
    }, [dispatch, subredditId])


    if (!subredditDetails) return null;

    let subredditPostArr;
    if (subredditPosts) subredditPostArr = Object.values(subredditPosts);

    const nullProfilePic = 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'



    return (
        <div className='subreddit-details-div'>
            <div className='banner-img-div'>
                <img className='banner-img' src={subredditDetails.banner_image ? subredditDetails.banner_image : bannerImg}/>
                <div className='gray-bg'>
                    <div className='span-container'>
                        <span className='sr-details-title'>{subredditDetails.name}</span>
                        <span className='sr-details-subtitle'>{`r/${subredditDetails.name}`}</span>
                    </div>
                    <div className='join-sr-btn-div'>
                        <button className='join-sr-btn'>Join</button>
                    </div>
                </div>
            </div>
            <div className='create-post-div'>
                <img className='posting-profile-pic-img' src={subredditDetails.profile_picture ? subredditDetails.profile_picture : nullProfilePic} />
                <input
                type="text"
                placeholder='Create Post'
                className='create-post-sr'
                />
                <div className='img-create-post'>
                    <i class="fa-solid fa-image"></i>
                </div>
                <div className='link-create-post'>
                    <i class="fa-solid fa-link"></i>
                </div>
            </div>
            <img className='profile-pic-sr-img' src={subredditDetails.profile_picture ? subredditDetails.profile_picture : nullProfilePic} />
            {subredditPosts && subredditPostArr.map((post, index) => (
                <div>
                </div>
            ))}
        </div>
    )

}



export default SubredditDetails;
