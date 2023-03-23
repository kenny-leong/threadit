import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts } from '../../store/post';
import OpenModalButton from '../OpenModalButton'
import './PostFeed.css'



function PostFeed() {
    const dispatch = useDispatch();


    const allPosts = useSelector(state => state.post.allPosts);

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch])


    if (!allPosts) return null;


    let postArr = Object.values(allPosts)
    console.log(postArr)

    return (
        <div className='post-feed-div'>
            {postArr.map(post => (
                <div className='post-box'>
                    <div className='vote-bar'>
                        <span className='total-votes'>{post.upvotes - post.downvotes}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}



export default PostFeed;
