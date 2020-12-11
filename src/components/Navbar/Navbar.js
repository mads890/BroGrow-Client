import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    return(
        <div className='navbar'>
            <div className='nav-link-box'>
                <Link className='nav-link' to={'/about'}>
                    About
                </Link>
            </div>
            <div className='nav-link-box'>
                <Link className='nav-link' to={'/login'}>
                    Login
                </Link>
            </div>
            <div className='nav-link-box'>
                <Link className='nav-link' to={'/register'}>
                    Sign Up
                </Link>
            </div>
        </div>
    )
}