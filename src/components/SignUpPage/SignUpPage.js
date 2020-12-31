import React, { Component } from 'react';
import './SignUpPage.css';
import TokenService from '../../services/token-service';
import config from '../../config';

export default class LoginPage extends Component {
    
    onRegister = (id) => {
        this.props.history.push(`/user/${id}/form`)
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { email, password, tos } = e.target
        return fetch(`${config.API_ENDPOINT}/register`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    email: email.value,
                    password: password.value,
                    tos: tos.checked
                }
            }),
        })
        .then(res => 
            (!res.ok)
                ? res.json().then(err => Promise.reject(err))
                : res.json() 
        )
        .then(res => {
            email.value = ''
            password.value = ''
            tos.checked = false
            console.log(res)
            TokenService.saveAuthToken(res.token)
            this.onRegister(res.user.id)
        })
    }
    render() {
        return(
            <div className='sign-up-page'>
                <h1>Crew</h1>
                <h3>No Contact Networking</h3>
                <form onSubmit={this.handleSubmit}>
                    <input type='email' name='email' placeholder='Email'>
                    </input>
                    <input type='password' name='password' placeholder='Password'>
                    </input>
                    <div className='checkbox-container'>
                        <h3>Agree to Terms?</h3>
                        <input type='checkbox' name='tos' value={1} /> <label>Yes</label>
                    </div>
                    <button type='submit' className='register-button'>Sign Up</button>
                </form>
            </div>
        )
    }
}