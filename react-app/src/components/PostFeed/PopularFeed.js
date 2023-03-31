import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts } from '../../store/post';
import { getAllUsers } from '../../store/session';
import { getAllSR } from '../../store/subreddit';
import { useModal } from "../../context/Modal";
import DeletePost from '../SubredditDetails/DeletePost';
import EditPost from '../SubredditDetails/EditPost';
import bannerImg from '../../static/placeholder-banner.png';



function PopularFeed() {
    const dispatch = useDispatch();
    const { setModalContent } = useModal();

    const allPosts = useSelector(state => state.post.allPosts);
    const allSubreddits = useSelector(state => state.subreddit.allSubreddits)
    const allUsers = useSelector(state => state.session.allUsers)
    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getAllPosts());
        dispatch(getAllSR())
        dispatch(getAllUsers())
    }, [dispatch])




    if (!allPosts || !allSubreddits || !allUsers) {
        return null
    }

    const postArr = Object.values(allPosts);

    // Calculate net votes for each post and add it as a new property
    postArr.forEach(post => {
        post.netVotes = post.upvotes - post.downvotes;
    });

    // Sort by net votes in descending order
    postArr.sort((a, b) => b.netVotes - a.netVotes);


    function getTimeSincePostCreation(createdAt) {
        const postCreatedAt = new Date(createdAt);
        postCreatedAt.setHours(postCreatedAt.getHours() - 4);
        const now = new Date();
        const timeDiffInMs = now.getTime() - postCreatedAt.getTime();

        // Convert time difference from milliseconds to minutes and hours
        const timeDiffInMinutes = Math.floor(timeDiffInMs / 60000);
        const timeDiffInHours = Math.floor(timeDiffInMinutes / 60);
        const timeDiffInDays = Math.floor(timeDiffInHours / 24);


        // Get absolute value of timeDiffInHours
        const absTimeDiffInHours = Math.abs(timeDiffInHours);
        const absTimeDiffInDays = Math.abs(timeDiffInDays)

        // Return formatted time string
        if (absTimeDiffInDays >= 1) {
            return `${absTimeDiffInDays} day${absTimeDiffInDays === 1 ? '' : 's'}`;
        } else if (absTimeDiffInHours > 0) {
            return `${absTimeDiffInHours} hour${absTimeDiffInHours === 1 ? '' : 's'}`;
        }

        return `${timeDiffInMinutes} minute${timeDiffInMinutes === 1 ? '' : 's'}`;
    }


    // opens the DeletePost component
    const openDeleteModal = (postId) => {
        setModalContent(<DeletePost postId={postId}/>);
    };

    //opens the update post component
    const openEditModal = (post) => {
        setModalContent(<EditPost post={post}/>)
    };


    return (
        <div className='post-feed-div'>
            {postArr.map((post, index) => (
                <div className='post-box' key={index}>
                    <div className='vote-bar'>
                        <i class="fa-solid fa-angles-up"></i>
                        <span className='total-votes'>{post.upvotes - post.downvotes}</span>
                        <i class="fa-solid fa-angles-down"></i>
                    </div>
                    <div className='post-content-area'>
                        <div className='post-feed-header-info'>
                            <div className='post-header-information'>
                                <Link to={`/subreddits/${post.subreddit_id}`}>
                                    <span className='subreddit-for-post'>{`r/${allSubreddits[post.subreddit_id].name}`}</span>
                                </Link>
                                <i class="fa-solid fa-circle"></i>
                                <span className='posted-by'>{`Posted by u/${allUsers[post.author_id].username} ${getTimeSincePostCreation(post.created_at)} ago`}</span>
                            </div>
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
    )
}



export default PopularFeed;
