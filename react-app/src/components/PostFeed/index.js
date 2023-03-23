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
        dispatch(getAllPosts())
      }, [dispatch])







    return (
        <div className='post-feed-div'>

        </div>
    )
}



export default PostFeed;
