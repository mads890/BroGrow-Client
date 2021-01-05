import React, { Component } from 'react';
import './SignUpPage.css';
import TokenService from '../../services/token-service';
import config from '../../config';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1
        }
    }

    onRegister = (id) => {
        this.props.history.push(`/user/${id}/form`)
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { email, password, name, age, tos } = e.target

        return fetch(`${config.API_ENDPOINT}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    email: email.value,
                    password: password.value,
                    name: name.value,
                    age: age.value,
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
            name.value = ''
            age.value = 0
            tos.checked = false
            console.log(res)
            TokenService.saveAuthToken(res.token)
            this.onRegister(res.user.id)
        })
    }

    handleChangePage = (e) => {
        e.preventDefault()
        if(this.state.step === 1) {
            const newStep = this.state.step + 1
            const stepOne = document.getElementById('step1')
            const stepTwo = document.getElementById('step2')
            stepOne.classList.add('hidden')
            stepTwo.classList.remove('hidden')
            this.setState({
                step: newStep
            })
        }
        else if (this.state.step === 2) {
            const newStep = this.state.step - 1
            const stepOne = document.getElementById('step1')
            const stepTwo = document.getElementById('step2')
            stepOne.classList.remove('hidden')
            stepTwo.classList.add('hidden')
            this.setState({
                step: newStep
            })
        }
    }

    render() {
        return(
            <div className='sign-up-page'>
                <h1>Crew</h1>
                <h3>No Contact Networking</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className='step1' id='step1'>
                        <input type='email' name='email' placeholder='Email' />
                        <input type='password' name='password' placeholder='Password' />
                        
                        <button className='page-button' onClick={this.handleChangePage}>Next</button>
                    </div>
                    <div className='step2 hidden' id='step2'>
                        <h1>Basic Info</h1>
                        <label htmlFor='name'>How should we introduce you?</label>
                        <input type='name' name='name' placeholder='Name' />
                        <label htmlFor='age'>What is your age?</label>
                        <input type='number' name='age' placeholder='Age' />
                        <div className='checkbox-container'>
                            <h3>Agree to Terms?</h3>
                            <input type='checkbox' name='tos' value={1} /> <label>Yes</label>
                        </div>
                        <button className='page-button' onClick={this.handleChangePage}>Previous</button>
                        <button type='submit' className='register-button'>Sign Up</button>
                    </div>
                    
                </form>
            </div>
        )
    }
}