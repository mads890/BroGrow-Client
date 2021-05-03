import React from 'react';
import { Link } from 'react-router-dom';
import './PrivateNav.css';

export default function Navbar(props) {
    let userId = props.userId
    return(
        <div className='private-nav'>
            <div className='nav-link-box'>
                <Link className='nav-link' to={`/user/${userId}`}>
                    Dashboard
                </Link>
            </div>
            <div className='nav-link-box'>
                <Link className='nav-link' to={`/user/${userId}/update/interests`}>
                    Update Interests
                </Link>
            </div>
            <div className='nav-link-box'>
                <Link className='nav-link' to={`/user/${userId}/update/hobbies`}>
                    Update Hobbies
                </Link>
            </div>
            <div className='nav-link-box'>
                <Link className='nav-link' to={`/`} onClick={props.onLogout}>
                    Logout
                </Link>
            </div>
        </div>
    )
}