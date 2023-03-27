import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSubredditPosts } from '../../store/post';
import { getSingleSR, getSubredditMembers } from '../../store/subreddit';
import { getAllUsers } from '../../store/session';
import bannerImg from '../../static/placeholder-banner.png';
import { useModal } from "../../context/Modal";
import OpenModalButton from '../OpenModalButton';
import UpdateSubreddit from '../UpdateSubreddit';
import CreatePost from '../CreatePost';
import './SubredditDetails.css';




function SubredditDetails() {
    const dispatch = useDispatch();
    const { subredditId } = useParams();
    const { setModalContent } = useModal();

    const subredditDetails = useSelector(state => state.subreddit.singleSubreddit);
    const subredditPosts = useSelector(state => state.post.subredditPosts);
    const allUsers = useSelector(state => state.session.allUsers)
    const sessionUser = useSelector(state => state.session.user)
    let subredditMembers = useSelector(state => state.subreddit.subredditMembers)



    useEffect(() => {
        dispatch(getSingleSR(subredditId))
        dispatch(getSubredditPosts(subredditId))
        if (sessionUser) dispatch(getSubredditMembers(subredditId))
        dispatch(getAllUsers())
    }, [dispatch, subredditId])


    if (!subredditDetails || !allUsers) return null;
    if ((sessionUser && (!subredditMembers))) return null


    let subredditPostArr;
    if (subredditPosts) subredditPostArr = Object.values(subredditPosts);

    let subredditMemberArr;
    if (subredditMembers) subredditMemberArr = Object.values(subredditMembers);
    subredditMembers = {};

    subredditMemberArr.forEach(member => {
        subredditMembers[member.user_id] = member
    });



    const nullProfilePic = 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'

    const openModal = () => {
        setModalContent(<CreatePost />);
    };

    function getTimeSincePostCreation(createdAt) {
        const postCreatedAt = new Date(createdAt);
        const now = new Date();
        const timeDiffInMs = now.getTime() - postCreatedAt.getTime();

        // Convert time difference from milliseconds to minutes and hours
        const timeDiffInMinutes = Math.floor(timeDiffInMs / 60000);
        const timeDiffInHours = Math.floor(timeDiffInMinutes / 60);
        const timeDiffInDays = Math.floor(timeDiffInHours / 24);

        // Get absolute values
        const absTimeDiffInDays = Math.abs(timeDiffInDays)
        const absTimeDiffInHours = Math.abs(timeDiffInHours);

        // Return formatted time string
        if (absTimeDiffInDays > 0) {
            return `${absTimeDiffInDays} day${absTimeDiffInDays === 1 ? '' : 's'}`;
        } else if (absTimeDiffInHours > 0) {
            return `${absTimeDiffInHours} hour${absTimeDiffInHours === 1 ? '' : 's'}`;
        }

        return `${timeDiffInMinutes} minute${timeDiffInMinutes === 1 ? '' : 's'}`;
    }



    function formatDate(str) {
        const date = new Date(str);
        const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        return formattedDate
    }

    return (
        <div className='subreddit-details-div'>
            <div className='banner-img-div'>
                <img className='banner-img' alt='banner' src={subredditDetails.banner_image ? subredditDetails.banner_image : bannerImg}/>
                <div className='gray-bg'>
                    <div className='span-container'>
                        <span className='sr-details-title'>{subredditDetails.name}</span>
                        <span className='sr-details-subtitle'>{`r/${subredditDetails.name}`}</span>
                    </div>
                    <div className='join-sr-btn-div'>
                        {(sessionUser) && (!subredditMembers[sessionUser.id]) && (
                            <button className='join-sr-btn'><i class="fa-solid fa-user-plus"></i>Join</button>
                        )}
                        {(sessionUser) && (subredditDetails.creator_id !== sessionUser.id) && (subredditMembers[sessionUser.id]) && (
                            <button className='join-sr-btn joined'><i class="fa-solid fa-check"></i>Member</button>
                        )}
                        {(sessionUser) && (subredditDetails.creator_id === sessionUser.id) && (
                            <button className='join-sr-btn creator'><i class="fa-solid fa-award"></i>Owner</button>
                        )}
                    </div>
                </div>
            </div>
            <div className='create-post-div'>
                <img className='posting-profile-pic-img' alt='profile-pic' src={subredditDetails.profile_picture ? subredditDetails.profile_picture : nullProfilePic} />
                <input
                type="text"
                placeholder='Create Post'
                className='create-post-sr'
                onFocus={() => {openModal()}}
                />
                <div className='img-create-post' onClick={() => {openModal()}}>
                    <i class="fa-solid fa-image"></i>
                </div>
                <div className='link-create-post' onClick={() => {openModal()}}>
                    <i class="fa-solid fa-link"></i>
                </div>
            </div>
            <img className='profile-pic-sr-img' alt='profile-pic' src={subredditDetails.profile_picture ? subredditDetails.profile_picture : nullProfilePic} />
            {(subredditPostArr === undefined || subredditPostArr.length === 0) && (
                <div className='no-post-msg-div'>
                    <span className='no-post-msg'>No existing posts. Be the first to post!</span>
                </div>
            )}
            <div className='feed-and-details-div'>
                <div className='post-feed-div'>
                    {subredditPosts && subredditPostArr.map((post, index) => (
                        <div className='post-box' key={index}>
                            <div className='vote-bar'>
                                <i class="fa-solid fa-angles-up"></i>
                                <span className='total-votes'>{post.upvotes - post.downvotes}</span>
                                <i class="fa-solid fa-angles-down"></i>
                            </div>
                            <div className='post-content-area'>
                                <div className='post-header-info'>
                                    <span className='posted-by subreddit'>{`Posted by u/${allUsers[post.author_id].username} ${getTimeSincePostCreation(post.created_at)} ago`}</span>
                                </div>
                                <span className='feed-post-title'>{post.title}</span>
                                {(post.image_url) && (
                                    <div className='feed-post-div'>
                                        <img className='feed-post-img' alt='post-img' src={post.image_url} />
                                    </div>
                                )}
                                <div className='feed-post-comment-bar'>
                                    <div className='comments-and-text-div'>
                                        <i class="fa-solid fa-comments"></i>
                                        <span className='comment-div-text'>5 Comments</span>
                                    </div>
                                    <div className='repeat-and-text-div'>
                                        <i class="fa-solid fa-repeat"></i>
                                        <span className='comment-div-text'>Share</span>
                                    </div>
                                    <div className='bookmark-and-text-div'>
                                        <i class="fa-regular fa-bookmark"></i>
                                        <span className='comment-div-text'>Save</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='details-div'>
                    <div className='abt-com-div'>
                        <span className='about-community'>About Community</span>
                        {(sessionUser) && (subredditDetails.creator_id === sessionUser.id) && (
                            <OpenModalButton
                                buttonText={<i class="fa-solid fa-ellipsis"></i>}
                                modalComponent={<UpdateSubreddit />}
                                className='update-sr-btn'
                            />
                        )}
                    </div>
                    <div className='sr-details-desc-div'>
                        <span className='sr-details-desc'>{subredditDetails.description}</span>
                        <div className='created-at-sr'>
                            <i class="fa-solid fa-cake-candles"></i>
                            <span className='created-at-text'>{`Created ${formatDate(subredditDetails.created_at)}`}</span>
                        </div>
                    </div>
                    <div className='sr-member-div'>
                        <span className='members-text'>{subredditMemberArr.length === 1 ? `${subredditMemberArr.length} Member` : `${subredditMemberArr.length} Members`}</span>
                    </div>
                    <div className='moderated-by-div'>
                        <span className='moderator-text'>{`Moderated by r/${allUsers[subredditDetails.creator_id].username}`}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default SubredditDetails;
