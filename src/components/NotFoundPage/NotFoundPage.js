import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';
import StyledButton from '../Utils/StyledButton/StyledButton';

export default function NotFoundPage() {
    return(
        <div className='not-found'>
            <h1>Something went wrong...</h1>
            <p>The page you are looking for does not exist.</p>
            <Link className='not-found-link' to={'/'}>Home</Link>
            <Link className='not-found-link' to={'/login'}>Login</Link>
            <Link className='not-found-link' to={'/register'}>Sign Up</Link>
        </div>
    )
}