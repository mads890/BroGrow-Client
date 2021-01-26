import React, { Component } from 'react';
import './ProfilePage.css';
import ProfileGrid from '../ProfileGrid/ProfileGrid';
import CrewApiService from '../../services/CrewApiService';
import ProfileContext from '../../contexts/ProfileContext';

export default class ProfilePage extends Component {
    static contextType = ProfileContext

    componentDidMount() {
        const { userId } = this.props.match.params
        this.context.clearError()
        CrewApiService.getUser(userId).then(res => this.context.setUser(res.user))
        CrewApiService.getUserHobbies(userId).then(res => this.context.setUserHobbies(res.user_hobbies)).catch(this.context.setError)
        CrewApiService.getUserInterests(userId).then(res => this.context.setUserInterests(res.user_interests)).catch(this.context.setError)
        CrewApiService.getUserTeams(userId).then(res => this.context.setUserTeams(res.user_teams)).catch(this.context.setError)
    }

    handleUpdateUser = (e) => {
        e.preventDefault()
        const { userId } = this.props.match.params
        const title = e.target.title.value.length ? e.target.title.value : this.context.user.title
        const location = e.target.location.value.length ? e.target.location.value : this.context.user.location
        const age = e.target.age.value.length ? e.target.age.value : this.context.user.age
        const newUser = {
            ...this.context.user,
            title,
            location,
            age,
        }
        CrewApiService.putUser(newUser, userId)
    }

    render() {
        const { userId } = this.props.match.params
        
        return(
            <div className='profile-page'>
                <div className='profile-header'>
                    <h1>Crew</h1>
                    <h2>No Contact Networking</h2>
                    <p>After work, family, and taking out the trash, there’s almost no time left to grow personal and professional relationships.</p>
                </div>
                <form className='update-info-form' onSubmit={this.handleUpdateUser}>
                    <input className='profile-input' name='title' type='text' placeholder={this.context.user.title} />
                    <input className='profile-input' name='location' type='text' placeholder={this.context.user.location} />
                    <input className='profile-input' name='age' type='number' placeholder={this.context.user.age} />
                    <button type='submit' className='update-button'>Update</button>
                </form>
                <ProfileGrid userId={userId} section='interests' items={this.context.userInterests} />
                <ProfileGrid userId={userId} section='hobbies' items={this.context.userHobbies} />
                <ProfileGrid userId={userId} section='teams' items={this.context.userTeams} />
                <div className='red-propage'></div>
                <div className='blue-propage'></div>
                <div className='navy-propage'></div>
            </div>
        )
    }
}