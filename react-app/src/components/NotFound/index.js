import React from 'react';
import notfoundimg from '../../static/not-found.png';
import './NotFound.css';





function NotFound() {




    return (
        <div className='not-found-div'>
            <h1 className='not-found-header'>404 Page Not Found.</h1>
            <img src={notfoundimg} alt='not-found-img' className='not-found-img'/>
        </div>
    )

}



export default NotFound;
