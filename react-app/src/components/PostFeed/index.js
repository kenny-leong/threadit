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
import { getSubredditsByUser } from '../../store/subreddit';
import { getUserPostVotes, postVote, deletePostVote } from '../../store/vote';
import './PostFeed.css'



function PostFeed() {
    const dispatch = useDispatch();
    const { setModalContent } = useModal();

    const allPosts = useSelector(state => state.post.allPosts);
    const allSubreddits = useSelector(state => state.subreddit.allSubreddits)
    const allUsers = useSelector(state => state.session.allUsers)
    const sessionUser = useSelector(state => state.session.user)
    const userPostVotes = useSelector(state => state.vote.allPostVotes)
    const subredditMemberships = useSelector(state => state.subreddit.memberSubreddits)

    useEffect(() => {
        dispatch(getAllPosts());
        dispatch(getAllSR())
        dispatch(getAllUsers())
        if (sessionUser) dispatch(getUserPostVotes())
        if (sessionUser) dispatch(getSubredditsByUser(sessionUser.id))
    }, [dispatch, sessionUser])




    if (!allPosts || !allSubreddits || !allUsers) return null;

    if ((sessionUser && !userPostVotes) || (sessionUser && !subredditMemberships)) return null;


    const postArr = Object.values(allPosts);

    // sorts all posts through if there is an image it will be higher ranked.
    // otherwise will sort by how recently created the post was.
    postArr.sort((a, b) => {
        if (a.image_url && !b.image_url) {
            return -1;
        } else if (!a.image_url && b.image_url) {
            return 1;
        } else {
            return new Date(b.created_at) - new Date(a.created_at);
        }
    });


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


    //handles logic for post upvoting
    const handlePostUpvote = async (post, type) => {

        if (!subredditMemberships[post.subreddit_id]) {
            alert('Join subreddit to vote!')
            return;
        }

        if (type === undefined) {
            await dispatch(postVote(post.id, 'upvote'))
            await dispatch(getAllPosts());
            await dispatch(getUserPostVotes())
        }

        if (type === 'upvote') {
            await dispatch(deletePostVote(post.id))
            await dispatch(getAllPosts());
            await dispatch(getUserPostVotes())
        }

        if (type === 'downvote') {
            await dispatch(deletePostVote(post.id));
            await dispatch(postVote(post.id, 'upvote'))
            await dispatch(getAllPosts());
            await dispatch(getUserPostVotes())
        }
    }


    // //handles logic for post downvoting
    const handlePostDownvote = async (post, type) => {

        if (!subredditMemberships[post.subreddit_id]) {
            alert('Join subreddit to vote!')
            return;
        }

        if (type === undefined) {
            await dispatch(postVote(post.id, 'downvote'))
            await dispatch(getAllPosts());
            await dispatch(getUserPostVotes())
        }

        if (type === 'downvote') {
            await dispatch(deletePostVote(post.id))
            await dispatch(getAllPosts());
            await dispatch(getUserPostVotes())
        }

        if (type === 'upvote') {
            await dispatch(deletePostVote(post.id));
            await dispatch(postVote(post.id, 'downvote'))
            await dispatch(getAllPosts());
            await dispatch(getUserPostVotes())
        }
    }




    return (
        <div className='post-feed-div'>
            {postArr.map((post, index) => (
                <div className='post-box' key={index}>
                    <div className='vote-bar'>
                        <i class={`fa-solid fa-angles-up ${sessionUser && userPostVotes && userPostVotes[post.id] === 'upvote' ? 'highlighted' : ''}`} onClick={() => {
                            if (!sessionUser) {
                                alert('Please log in to upvote this post!');
                                return;
                            }
                            userPostVotes && handlePostUpvote(post, userPostVotes[post.id])
                        }}></i>
                        <span className='total-votes'>{post.upvotes - post.downvotes}</span>
                        <i class={`fa-solid fa-angles-down ${sessionUser && userPostVotes && userPostVotes[post.id] === 'downvote' ? 'highlighted' : ''}`} onClick={() => {
                            if (!sessionUser) {
                                alert('Please log in to downvote this post!');
                                return;
                            }
                            handlePostDownvote(post, userPostVotes[post.id])
                        }}></i>
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
                        <Link to={`/subreddits/${post.subreddit_id}/posts/${post.id}`}>
                            <div className='feed-post-title-div'>
                                <span className='feed-post-title'>{post.title}</span>
                            </div>
                        </Link>
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
                        <Link to={`/subreddits/${post.subreddit_id}/posts/${post.id}`}>
                            <div className='feed-post-comment-bar'>
                                <div className='comments-and-text-div'>
                                    <i class="fa-solid fa-comments"></i>
                                    <span className='comment-div-text'>
                                        {post.num_comments > 0 ? `${post.num_comments} Comments` : '0 Comments'}
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



export default PostFeed;
