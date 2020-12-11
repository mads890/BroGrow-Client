import React, { Component } from 'react';
import './SignUpPage.css';
import { Redirect } from 'react-router-dom';
import TokenService from '../../services/token-service';
import config from '../../config';

export default class LoginPage extends Component {
    
    onRegister = (id) => {
        this.props.history.push(`/user/${id}`)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { email, password } = e.target

        return fetch(`${config.API_ENDPOINT}/register`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value,
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
                <form>
                    <input type='email' name='email' placeholder='Email'>
                    </input>
                    <input type='password' name='password' placeholder='Password'>
                    </input>
                    <button type='submit' className='register-button'>Sign Up</button>
                </form>
            </div>
        )
    }
}