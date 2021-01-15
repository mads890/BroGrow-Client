import React, { Component } from 'react';
import './EmailConfirmation.css';
import config from '../../config';

export default class EmailConfirmation extends Component {

    onConfirmEmail = (id) => {
        this.props.history.push(`/user/${id}/form`)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { email, confirmation } = e.target

        return fetch(`${config.API_ENDPOINT}/register`, {
            method: 'POST',
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
                    <input type='email' name='email' placeholder='Email'>
                    </input>
                    <input type='text' name='confirmation' placeholder='Your Code Here'>
                    </input>
                <button type='submit' className='confirm-button'>Confirm Email</button>
                </form>
            </div>
        )
    }
}