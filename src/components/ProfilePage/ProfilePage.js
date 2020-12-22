import React, { Component } from 'react';
import './ProfilePage.css';
import ProfileGrid from '../ProfileGrid/ProfileGrid';
import TokenService from '../../services/token-service';
import config from '../../config';

export default class ProfilePage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            interests: [
                {
                    id: 1,
                    name: 'Politics',
                    checked: true,
                },
                {
                    id: 2,
                    name: 'Literature',
                    checked: true,
                },
                {
                    id: 3,
                    name: 'Fashion',
                    checked: false,
                },
                {
                    id: 4,
                    name: 'Medicine',
                    checked: true,
                },
                {
                    id: 5,
                    name: 'Environmental Science',
                    checked: false,
                },
            ],
            hobbies: []
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
        return fetch(`${config.API_ENDPOINT}/users/${userId}/hobbies`, options)
        .then(res => {
            if(!res.ok) {
                return res.json().then(err => Promise.reject(err))
            }
            this.setState({ hobbies: [] })
            return res.json()    
        })
        .then(res => {
            console.log(res.hobbies)
            this.setState({
                hobbies: res.hobbies
            })
        })
        /*
        Promise.all([
            fetch(`${config.API_ENDPOINT}/users/${userId}/hobbies`, options)
            fetch(`${config.API_ENDPOINT}/users/${userId}/interests`, options)
        ])
        .then(([hobbyRes, interestRes]) => {
            if(!hobbyRes.ok) {
                return hobbyRes.json().then(err => Promise.reject(err));
            }
            if(!interestRes.ok) {
                return interestRes.json().then(err => Promise.reject(err));
            }
            return Promise.all([hobbyRes.json(), interestRes.json()]);
        })
        .then(([hobbies, interests]) => {
            console.log(hobbies)
            console.log(interests)
            /*
            this.setState({
                hobbies, interests
            });
           
        })
         */
    }

    toggleCheckedInterest = (id) => {
        let itemIndex = this.state.interests.findIndex(interest =>  interest.id == id)
        let checked = this.state.interests[itemIndex].checked === true ? false : true
        let updatedItem = this.state.interests[itemIndex]
        updatedItem.checked = checked
        let interests = this.state.interests
        interests.splice(itemIndex, 1, updatedItem)
        this.setState({ interests: [...interests]})
    }

    render() {
        return(
            <div className='profile-page'>
                <h1>Crew</h1>
                <h3>No Contact Networking</h3>
                <p>After work, family, and taking out the trash, there’s almost no time left to grow personal and professional relationships.</p>
                <form>
                    <input type='text' placeholder='Name' />
                    <input type='email' placeholder='your.name@email.com' />
                </form>
                <h2>Interests:</h2>
                <ProfileGrid items={this.state.interests} handleClick={this.toggleCheckedInterest} />
                <h2>Hobbies:</h2>
                <ProfileGrid items={this.state.hobbies} />
            </div>
        )
    }
}