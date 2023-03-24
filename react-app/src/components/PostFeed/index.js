import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts } from '../../store/post';
import { getAllUsers } from '../../store/session';
import OpenModalButton from '../OpenModalButton'
import { getAllSR } from '../../store/subreddit';
import './PostFeed.css'



function PostFeed() {
    const dispatch = useDispatch();


    const allPosts = useSelector(state => state.post.allPosts);
    const allSubreddits = useSelector(state => state.subreddit.allSubreddits)
    const allUsers = useSelector(state => state.session.allUsers)

    useEffect(() => {
        dispatch(getAllPosts());
        dispatch(getAllSR())
        dispatch(getAllUsers())
    }, [dispatch])


    if (!allPosts || !allSubreddits || !allUsers) return null;


    function getTimeSincePostCreation(createdAt) {
        const postCreatedAt = new Date(createdAt);
        const now = new Date();
        const timeDiffInMs = now.getTime() - postCreatedAt.getTime();

        // Convert time difference from milliseconds to minutes and hours
        const timeDiffInMinutes = Math.floor(timeDiffInMs / 60000);
        const timeDiffInHours = Math.floor(timeDiffInMinutes / 60);

        // Return formatted time string
        if (timeDiffInHours > 0) {
          return `${timeDiffInHours} hours`;
        } else {
          return `${timeDiffInMinutes} minutes`;
        }
    }


    let postArr = Object.values(allPosts)
    console.log(allPosts)

    return (
        <div className='post-feed-div'>
            {postArr.map(post => (
                <div className='post-box'>
                    <div className='vote-bar'>
                        <i class="fa-solid fa-angles-up"></i>
                        <span className='total-votes'>{post.upvotes - post.downvotes}</span>
                        <i class="fa-solid fa-angles-down"></i>
                    </div>
                    <div className='post-content-area'>
                        <div className='post-header-info'>
                            <span className='subreddit-for-post'>{`r/${allSubreddits[post.subreddit_id].name}`}</span>
                            <i class="fa-solid fa-circle"></i>
                            <span className='posted-by'>{`Posted by u/${allUsers[post.author_id].username} ${getTimeSincePostCreation(post.created_at)} ago`}</span>
                        </div>
                        <span className='feed-post-title'>{post.title}</span>
                        {(post.image_url) && (
                            <div className='feed-post-div'>
                                <img className='feed-post-img' src={post.image_url} />
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
    )
}



export default PostFeed;
