import React, { Component } from 'react';
import './PasswordReset.css';
import config from '../../config';

export default class PasswordReset extends Component{
    
    onSuccess = (id) => {
        this.props.history.push(`/user/${id}`)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { email, password } = e.target

        return fetch(`${config.API_ENDPOINT}/user/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    email: email.value,
                    password: password.value,
                }
            }),
        })
        .then(res => 
            (!res.ok)
                ? res.json().then(err => Promise.reject(err))
                : res.json() 
        )
        /*
        .then(res => {
            userId = res.id
            email.value = ''
            password.value = ''
            console.log(res)
            this.onSuccess(userId)
        })
        */
    }

    render() {
        return(
            <div className='reset-password-page'>
                <h1>Reset Your Password</h1>
                <form className='reset-form' onSubmit={this.handleSubmit} >
                    <input className='text-input' type='email' name='email' placeholder='Email'>
                    </input>
                    <input className='text-input' type='password' name='password' placeholder='New Password'>
                    </input>
                <button type='submit' className='confirm-button'>Reset Password</button>
                </form>
                <div className='navy-stripe'></div>
                <div className='blue-stripe'></div>
                <div className='red-stripe'></div>
            </div>
        )
    }
}