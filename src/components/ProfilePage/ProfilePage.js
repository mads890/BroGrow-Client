import React, { Component } from 'react';
import './ProfilePage.css';
import { Link } from 'react-router-dom';
import ProfileGrid from '../ProfileGrid/ProfileGrid';
import TokenService from '../../services/token-service';
import config from '../../config';

export default class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            interests: [],
            hobbies: [],
            userInterests: [],
            userHobbies: [],
            userTeams: [],
            title: '',
            email: ''
        }
      }
    
      componentDidMount() {
        const { userId } = this.props.match.params
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            }
        }
        Promise.all([
            fetch(`${config.API_ENDPOINT}/user/${userId}/hobbies`, options),
            fetch(`${config.API_ENDPOINT}/user/${userId}/interests`, options),
            fetch(`${config.API_ENDPOINT}/user/${userId}/teams`, options),
            fetch(`${config.API_ENDPOINT}/user/${userId}`, options),
            fetch(`${config.API_ENDPOINT}/hobbies`, options),
            fetch(`${config.API_ENDPOINT}/interests`, options)
        ])
        .then(([uHobbyRes, uIntRes, uTeamRes, userRes, hobbyRes, intRes]) => {
            if(!uHobbyRes.ok) {
                return uHobbyRes.json().then(err => Promise.reject(err));
            }
            if(!uIntRes.ok) {
                return uIntRes.json().then(err => Promise.reject(err));
            }
            if(!uTeamRes.ok) {
                return uTeamRes.json().then(err => Promise.reject(err));
            }
            if(!userRes.ok) {
                return userRes.json().then(err => Promise.reject(err))
            }
            if(!hobbyRes.ok) {
                return hobbyRes.json().then(err => Promise.reject(err));
            }
            if(!intRes.ok) {
                return intRes.json().then(err => Promise.reject(err));
            }
            return Promise.all([uHobbyRes.json(), uIntRes.json(), uTeamRes.json(), userRes.json(), hobbyRes.json(), intRes.json()]);
        })
        .then(([uHobbyRes, uIntRes, uTeamRes, userRes, hobbyRes, intRes]) => {
            this.setState({
                userHobbies: uHobbyRes.user_hobbies, 
                userInterests: uIntRes.user_interests,
                userTeams: uTeamRes.user_teams,
                title: userRes.user.name,
                email: userRes.user.email,
                hobbies: hobbyRes.hobbies,
                interests: intRes.interests
            });
        })   
      }
      
    handleUpdateUser = (e) => {
        e.preventDefault();
        const { userId } = this.props.match.params
        const title = e.target.title.value.length ? e.target.title.value : this.state.title
        const email = e.target.email.value.length ? e.email.title.value : this.state.email
        return fetch(`${config.API_ENDPOINT}/user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({
                user: {
                    email: email,
                    name: title,
                }
            }),
        })
        .then(res => 
            (!res.ok)
                ? res.json().then(err => Promise.reject(err))
                : res.json()    
        )
        .then(res =>
            console.log(res)    
        )
    }

    render() {
        const { userId } = this.props.match.params
        
        return(
            <div className='profile-page'>
                <h1>Crew</h1>
                <h3>No Contact Networking</h3>
                <p>After work, family, and taking out the trash, there’s almost no time left to grow personal and professional relationships.</p>
                <form className='update-info-form' onSubmit={this.handleUpdateUser}>
                    <input name='title' type='text' placeholder={this.state.title} />
                    <input name='email' type='email' placeholder={this.state.email} />
                    <button type='submit' className='update-button'>Update</button>
                </form>
                
                <h2>Your Interests:</h2>
                <ProfileGrid items={this.state.userInterests} />
                <h2>Your Hobbies:</h2>
                <ProfileGrid items={this.state.userHobbies} />
                <h2>Your Teams:</h2>
                <ProfileGrid items={this.state.userTeams} />
                <Link className='update-link' to={`/user/${userId}/form`}><button className='update-button'>Update</button></Link>
            </div>
        )
    }
}