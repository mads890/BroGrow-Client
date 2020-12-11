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
                    title: 'Mowing the Lawn',
                    checked: true,
                },
                {
                    id: 2,
                    title: 'Drinking Beer',
                    checked: true,
                },
                {
                    id: 3,
                    title: 'Scrapbooking',
                    checked: false,
                },
                {
                    id: 4,
                    title: 'Driving Really Fast',
                    checked: true,
                },
                {
                    id: 5,
                    title: 'Cooking Dinner',
                    checked: false,
                },
            ]
        }
    }

    componentDidMount() {
        const { userId } = this.props.match.params
        return fetch(`${config.API_ENDPOINT}/user/${userId}`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res => 
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
            .then(res => 
                console.log(res)
                /* this.setState({ interests: res.interests }) */
            )
    }

    toggleChecked = (id) => {
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
                <h2>Hobbies:</h2>
                <ProfileGrid items={this.state.interests} handleClick={this.toggleChecked} />
            </div>
        )
    }
}