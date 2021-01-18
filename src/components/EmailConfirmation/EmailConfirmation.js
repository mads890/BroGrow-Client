import React, { Component } from 'react';
import './EmailConfirmation.css';
import config from '../../config';

export default class EmailConfirmation extends Component {

    onConfirmEmail = (id) => {
        this.props.history.push(`/user/${id}/intake`)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { email, confirmation } = e.target

        return fetch(`${config.API_ENDPOINT}/user/confirm`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    email: email.value,
                    confirmation: confirmation.value,
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
            confirmation.value = ''
            console.log(res)
            this.onConfirmEmail(userId)
        })
        */
    }

    render() {
        return(
            <div className='confirm-email-page'>
                <h1>Confirm Your Email</h1>
                <form className='confirm-form' onSubmit={this.handleSubmit} >
                    <input className='text-input' type='email' name='email' placeholder='Email'>
                    </input>
                    <input className='text-input' type='text' name='confirmation' placeholder='Code'>
                    </input>
                <button type='submit' className='confirm-button'>Confirm Email</button>
                </form>
            </div>
        )
    }
}