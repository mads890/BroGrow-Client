import React, { Component } from 'react';
import './SignUpPage.css';
import TokenService from '../../services/token-service';
import CrewApiService from '../../services/CrewApiService';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1
        }
    }

    onRegister = () => {
        this.props.history.push(`/user/confirm`)
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { email, password, title, age, tos } = e.target
        const user = {
            email: email.value,
            password: password.value,
            name: title.value,
            age: age.value,
            tos: tos.checked
        }

        CrewApiService.postUser(user)
        .then(res => {
            email.value = ''
            password.value = ''
            title.value = ''
            age.value = 0
            tos.checked = false
            TokenService.saveAuthToken(res.token)
            this.onRegister()
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
                <h1>Find Your Crew</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className='step1' id='step1'>
                        <input className='register-input' type='text' name='title' placeholder='Name' />
                        <input className='register-input' type='number' name='age' placeholder='Age' />
                        <input className='register-input' type='text' name='location' placeholder='Location' />
                        
                        <button className='page-button' onClick={this.handleChangePage}>Next</button>
                    </div>
                    <div className='step2 hidden' id='step2'>
                        <input className='register-input' type='email' name='email' placeholder='Email' />
                        <input className='register-input' type='password' name='password' placeholder='Password' />
                        <div className='checkbox-container'>
                            <h3>Agree to Terms?</h3>
                            <input className='tos-input' type='checkbox' name='tos' value={1} /><label>Yes</label>
                        </div>
                        <button type='submit' className='register-button'>Sign Up</button>
                    </div>
                </form>
                <div className='navy-stripe'></div>
                <div className='blue-stripe'></div>
                <div className='red-stripe'></div>
            </div>
        )
    }
}