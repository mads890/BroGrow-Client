import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './LoginPage.css';
import TokenService from '../../services/token-service';
import config from '../../config';

export default class LoginPage extends Component {
    state = { 
        error: null 
    }

    onLogin = (id) => {
        this.props.history.push(`/user/${id}`)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { email, password } = e.target

        return fetch(`${config.API_ENDPOINT}/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value,
            })
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
            this.onLogin(res.user.id)
        })
        .catch(res => {
            this.setState({ error: res.error })
        })
    }

    render() {
        return(
            <div className='login-page'>
                <h1>Crew</h1>
                <h3>No Contact Networking</h3>
                <form onSubmit={this.handleSubmit} >
                    <input type='email' name='email' placeholder='Email'>
                    </input>
                    <input type='password' name='password' placeholder='Password'>
                    </input>
                <button type='submit' className='login-button'>Login</button>
                </form>
            </div>
        )
    }
}