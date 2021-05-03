import React, { Component } from 'react';
import './AdminDashboard.css';
import CrewApiService from '../../services/CrewApiService';
import ProfileContext from '../../contexts/ProfileContext';

export default class AdminDashboard extends Component {
    static contextType = ProfileContext

    componentDidMount() {
        this.context.clearError()
        CrewApiService.getUsers().then(res => this.context.setUsers(res.users))
        CrewApiService.getMatches().then(res => this.context.setMatches(res.matches)).catch(this.context.setError)
    }

    handleMatch = (e) => {
        e.preventDefault()
        const { userOneId, userTwoId } = e.target
        const match = {
            user_one_id: userOneId,
            user_two_id: userTwoId
        }
        CrewApiService.postMatch(match)
    }

    render() {
        const usersList = this.context.users.map(user => 
            <div className='users-list-item' key={user.id}>
                <p>{user.email} - {user.id}</p>
            </div>
        )
        const matchesList = this.context.matches.length ? this.context.matches.map(match => 
            <div className='matches-list-item' key={match.id}>
                <p>{match.user_one.name}</p>
                <p>{match.user_two.name}</p>
            </div>)
            : <div className='no-matches'>no matches to display</div>

        console.log(matchesList)
        return(
            <div className='admin-dashboard'>
                <div className='users-list'>
                    {usersList}
                </div>
                <div className='matches-list'>
                    {matchesList}
                </div>
                <form onSubmit={this.handleMatch}>
                    <label htmlFor='userOneId' className='admin-input-label'>User One Id:
                    <input className='match-input' name='userOneId' type='number' />
                    </label>
                    <label htmlFor='userTwoId' className='admin-input-label'>User Two Id:
                    <input className='match-input' name='userTwoId' type='number' />
                    </label>
                    <button type='submit' className='match-button'>Create Match</button>
                </form>
            </div>
        )
    }
}