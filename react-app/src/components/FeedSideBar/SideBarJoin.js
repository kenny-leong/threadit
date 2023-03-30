import React from 'react';
import SignupForm from '../SignupForm';
import OpenModalButton from '../OpenModalButton'
import { useSelector } from 'react-redux';
import './SideBarJoin.css'


function JoinSideBar() {


    const sessionUser = useSelector(state => state.session.user);


    return (
        <>
            {!sessionUser && (
                <div className='join-div'>
                    <div className='join-threadit-div'>
                        <span className='join-text'>
                        Create an account to follow your favorite communities and start taking part in conversations.
                        </span>
                    </div>
                    <div className='join-now-btn'>
                        <OpenModalButton
                            buttonText={<span className='join-now-text'>Join Threadit</span>}
                            modalComponent={<SignupForm />}
                        />
                    </div>
                </div>
            )}
        </>
    )



}


export default JoinSideBar;
