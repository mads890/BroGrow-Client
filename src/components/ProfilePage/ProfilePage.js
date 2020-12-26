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
            fetch(`${config.API_ENDPOINT}/user/${userId}`, options),
            fetch(`${config.API_ENDPOINT}/hobbies`, options),
            fetch(`${config.API_ENDPOINT}/interests`, options)
        ])
        .then(([uHobbyRes, uIntRes, userRes, hobbyRes, intRes]) => {
            if(!uHobbyRes.ok) {
                return uHobbyRes.json().then(err => Promise.reject(err));
            }
            if(!uIntRes.ok) {
                return uIntRes.json().then(err => Promise.reject(err));
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
            return Promise.all([uHobbyRes.json(), uIntRes.json(), userRes.json(), hobbyRes.json(), intRes.json()]);
        })
        .then(([uHobbyRes, uIntRes, userRes, hobbyRes, intRes]) => {
            this.setState({
                userHobbies: uHobbyRes.user_hobbies, 
                userInterests: uIntRes.user_interests,
                // title: userRes.user.name
                email: userRes.user.email,
                hobbies: hobbyRes.hobbies,
                interests: intRes.interests
            });
        })
        
    }
    /*
    toggleCheckedInterest = (id) => {
        let itemIndex = this.state.interests.findIndex(interest =>  interest.id == id)
        let checked = this.state.interests[itemIndex].checked === true ? false : true
        let updatedItem = this.state.interests[itemIndex]
        updatedItem.checked = checked
        let interests = this.state.interests
        interests.splice(itemIndex, 1, updatedItem)
        this.setState({ interests: [...interests]})
    }
    */

    /*
    handleUpdateUser = (e) => {
        e.preventDefault();
        const { userId } = this.props.match.params
        const { title, email } = e.target
        return fetch(`${config.API_ENDPOINT}/user/${userId}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    email: email.value,
                    name: title.value
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
    */

    addInterest = (e) => {
        e.preventDefault();
        const { userId } = this.props.match.params
        const intId = e.target.interests.value;
        return fetch(`${config.API_ENDPOINT}/user/${userId}/interests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({
                user_interest: {
                    user_id: userId,
                    interest_id: intId
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

    addHobby = (e) => {
        e.preventDefault();
        const { userId } = this.props.match.params
        const hobbyId = e.target.hobbies.value;
        return fetch(`${config.API_ENDPOINT}/user/${userId}/hobbies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({
                user_hobby: {
                    user_id: userId,
                    hobby_id: hobbyId
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
        const nameVal = (this.state.title.length)
            ? this.state.title
            : 'Name'
        const selectInterestOptions = this.state.interests.map(interest => 
            <option value={interest.id}>{interest.name}</option>
        )
        const selectHobbyOptions = this.state.hobbies.map(hobby => 
            <option value={hobby.id}>{hobby.name}</option>
        )
        return(
            <div className='profile-page'>
                <h1>Crew</h1>
                <h3>No Contact Networking</h3>
                <p>After work, family, and taking out the trash, there’s almost no time left to grow personal and professional relationships.</p>
                <form onSubmit={this.handleUpdateUser}>
                    <input type='text' placeholder={nameVal} />
                    <input type='email' placeholder={this.state.email} />
                    <button type='submit' className='update-button'>Update</button>
                </form>
                <div className='add-form-container'>
                    <form className='select-form' onSubmit={this.addInterest}>
                        <label htmlFor='interests'>More Interests...</label>
                        <select name='interests'>
                            {selectInterestOptions}
                        </select>
                        <button className='select-button' type='submit'>Add Interest</button>
                    </form>
                    <form className='select-form' onSubmit={this.addHobby}>
                        <label htmlFor='hobbies'>More Hobbies...</label>
                        <select name='hobbies'>
                            {selectHobbyOptions}
                        </select>
                        <button className='select-button' type='submit'>Add Hobby</button>
                    </form>
                </div>
                
                <h2>Your Interests:</h2>
                <ProfileGrid items={this.state.userInterests} />
                <h2>Your Hobbies:</h2>
                <ProfileGrid items={this.state.userHobbies} />
            </div>
        )
    }
}