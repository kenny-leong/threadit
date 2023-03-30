import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSubredditPosts } from '../../store/post';
import { getSingleSR, getSubredditMembers, addSubredditMember, removeSubredditMember } from '../../store/subreddit';
import { getAllUsers } from '../../store/session';
import bannerImg from '../../static/placeholder-banner.png';
import { useModal } from "../../context/Modal";
import OpenModalButton from '../OpenModalButton';
import UpdateSubreddit from '../UpdateSubreddit';
import CreatePost from '../CreatePost';
import CreatePostImage from '../CreatePost/PostImage';
import CreateLink from '../CreatePost/CreateLinkPost';
import DeletePost from './DeletePost';
import EditPost from './EditPost';
import './SubredditDetails.css';




function SubredditDetails() {
    const dispatch = useDispatch();
    const { subredditId } = useParams();
    const { setModalContent, closeModal } = useModal();

    const subredditDetails = useSelector(state => state.subreddit.singleSubreddit);
    const subredditPosts = useSelector(state => state.post.subredditPosts);
    const allUsers = useSelector(state => state.session.allUsers)
    const sessionUser = useSelector(state => state.session.user)
    let subredditMembers = useSelector(state => state.subreddit.subredditMembers)



    useEffect(() => {
        dispatch(getSingleSR(subredditId))
        dispatch(getSubredditPosts(subredditId))
        dispatch(getSubredditMembers(subredditId))
        dispatch(getAllUsers())
    }, [dispatch, subredditId])


    // return null if this information isnt given
    if (!subredditDetails || !allUsers || !subredditMembers) return null;


    // sort the feed chronologically with the most recent posts on top
    let subredditPostArr;
    if (subredditPosts) subredditPostArr = Object.values(subredditPosts);
    if (subredditPostArr) subredditPostArr.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));


    // normalize the subreddit member object with user ids
    let subredditMemberArr;
    if (subredditMembers) {
        subredditMemberArr = Object.values(subredditMembers);
        subredditMembers = {};
        subredditMemberArr.forEach(member => {
            subredditMembers[member.user_id] = member
        });
    }

    // default placeholder profile picture
    const nullProfilePic = 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'


    // function to get how long ago user has posted
    function getTimeSincePostCreation(createdAt) {
        const postCreatedAt = new Date(createdAt);
        postCreatedAt.setHours(postCreatedAt.getHours() - 4);
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

    // returns date in more user friendly format
    function formatDate(str) {
        const date = new Date(str);
        const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        return formattedDate
    }


    // opens the DeletePost component
    const openDeleteModal = (postId) => {
        setModalContent(<DeletePost postId={postId}/>);
    };

    //opens the update post component
    const openEditModal = (post) => {
        setModalContent(<EditPost post={post}/>)
    };

    //opens the CreatePost component
    const openTextModal = () => {
        setModalContent(<CreatePost />);
    };

    //opens the Create Img Post component
    const openImageModal = () => {
        setModalContent(<CreatePostImage />);
    };

    //opens the Attachment Post component
    const openAttachmentModal = () => {
        setModalContent(<CreateLink />);
    };


    //function to handle joining a subreddit
	const handleJoin = async (e) => {
		e.preventDefault();

		await dispatch(addSubredditMember(subredditId))
        .then(() => {
            dispatch(getSubredditMembers(subredditId));
            closeModal();
        });
	};


    // handles leaving a subreddit
	const handleLeave = async (e) => {
		e.preventDefault();

		await dispatch(removeSubredditMember(subredditId, sessionUser.id))
        .then(() => {
            dispatch(getSubredditMembers(subredditId));
            closeModal();
        });
	};


    return (
        <div className='subreddit-details-div'>
            <div className='banner-img-div'>
                <div className='banner-img-container'>
                    <img className='banner-img'
                    alt='banner' src={subredditDetails.banner_image ? subredditDetails.banner_image : bannerImg}
                    onError={(e) => {e.target.onerror = null; e.target.src=bannerImg}}
                    />
                </div>
                <div className='gray-bg'>
                    <div className='span-container'>
                        <span className='sr-details-title'>{subredditDetails.name}</span>
                        <span className='sr-details-subtitle'>{`r/${subredditDetails.name}`}</span>
                    </div>
                    <div className='join-sr-btn-div'>
                        {(sessionUser) && (!subredditMembers[sessionUser.id]) && (
                            <button className='join-sr-btn' onClick={handleJoin}><i class="fa-solid fa-user-plus"></i>Join</button>
                        )}
                        {(sessionUser) && (subredditDetails.creator_id !== sessionUser.id) && (subredditMembers[sessionUser.id]) && (
                            <button className='join-sr-btn joined' onClick={handleLeave}><i class="fa-solid fa-check"></i>Member</button>
                        )}
                        {(sessionUser) && (subredditDetails.creator_id === sessionUser.id) && (
                            <button className='join-sr-btn creator'><i class="fa-solid fa-award"></i>Owner</button>
                        )}
                    </div>
                </div>
            </div>
            {sessionUser && (subredditMembers[sessionUser.id]) && (
                <div className='create-post-div'>
                    <img className='posting-profile-pic-img'
                    alt='profile-pic'
                    src={subredditDetails.profile_picture ? subredditDetails.profile_picture : nullProfilePic}
                    onError={(e) => {e.target.onerror = null; e.target.src=nullProfilePic}}
                    />
                    <input
                    type="text"
                    placeholder='Create Post'
                    className='create-post-sr'
                    onFocus={() => {openTextModal()}}
                    />
                    <div className='img-create-post' onClick={() => {openImageModal()}}>
                        <i class="fa-solid fa-image"></i>
                    </div>
                    <div className='link-create-post' onClick={() => {openAttachmentModal()}}>
                        <i class="fa-solid fa-link"></i>
                    </div>
                </div>
            )}
            <img className='profile-pic-sr-img'
            alt='profile-pic'
            src={subredditDetails.profile_picture ? subredditDetails.profile_picture : nullProfilePic}
            onError={(e) => {e.target.onerror = null; e.target.src=nullProfilePic}}
            />
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
                                    {sessionUser && post.author_id === sessionUser.id && (
                                        <div className='edit-delete-divs-post'>
                                            <div className='edit-post-btn-container' onClick={() => openEditModal(post)}>
                                                <span className='edit-delete-post-btn'><i class="fa-solid fa-ellipsis"></i></span>
                                            </div>
                                            <div className='delete-post-btn-container' onClick={() => openDeleteModal(post.id)}>
                                                <span><i class="fa-solid fa-trash-can"></i></span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className='feed-post-title-div'>
                                    <span className='feed-post-title'>{post.title}</span>
                                </div>
                                <Link to={`/subreddits/${post.subreddit_id}/posts/${post.id}`}>
                                    {(post.content) && (
                                        <div className='feed-post-text-content'>
                                            <span className='post content'>{post.content}</span>
                                        </div>
                                    )}
                                    {(post.image_url) && (
                                        <div className='feed-post-div'>
                                            <img className='feed-post-img'
                                            alt='post-img'
                                            src={post.image_url}
                                            onError={(e) => {e.target.onerror = null; e.target.src=bannerImg}}
                                            />
                                        </div>
                                    )}
                                    <div className='feed-post-comment-bar'>
                                        <div className='comments-and-text-div'>
                                            <i class="fa-solid fa-comments"></i>
                                            <span className='comment-div-text'>
                                                {post.comments ? `${post.comments.length} Comments` : '0 Comments'}
                                            </span>
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
                                </Link>
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
