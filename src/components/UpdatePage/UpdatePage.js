import React, { Component } from 'react';
import './UpdatePage.css';
import HobbyGrid from '../HobbyGrid/HobbyGrid';
import InterestGrid from '../InterestGrid/InterestGrid';
import TeamGrid from '../TeamGrid/TeamGrid';
import CrewApiService from '../../services/CrewApiService';
import ProfileContext from '../../contexts/ProfileContext';

export default class UpdatePage extends Component {
    static contextType = ProfileContext
    
    componentDidMount() {
        const { userId } = this.props.match.params
        this.context.clearError()
        CrewApiService.getHobbies()
            .then(res => Promise.all([
                this.context.setAllHobbies(res.hobbies),
                this.setState({
                    hobbiesFiltered: res.hobbies
                })
            ]))
            .catch(this.context.setError)
        CrewApiService.getInterests()
            .then(res => Promise.all([
                this.context.setAllInterests(res.interests),
                this.setState({
                    interestsFiltered: res.interests
                })
            ]))
            .catch(this.context.setError)
        CrewApiService.getTeams()
            .then(res => this.context.setAllTeams(res.teams))
            .catch(this.context.setError)
        CrewApiService.getUserHobbies(userId)
            .then(res => Promise.all([
                this.context.setUserHobbies(res.user_hobbies), 
                this.context.setUserHobbiesComp(res.user_hobbies)
            ]))
            .catch(this.context.setError)
        CrewApiService.getUserInterests(userId)
            .then(res => Promise.all([
                this.context.setUserInterests(res.user_interests), 
                this.context.setUserInterestsComp(res.user_interests)
            ]))
            .catch(this.context.setError)
        CrewApiService.getUserTeams(userId)
            .then(res => Promise.all([
                this.context.setUserTeams(res.user_teams), 
                this.context.setUserTeamsComp(res.user_teams)
            ]))
            .catch(this.context.setError)
    }

    onCompleteSubmit = (id) => {
        this.props.history.push(`/user/${id}`)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { section, userId } = this.props.match.params
        const userHobbies = this.context.userHobbies
        const userInterests = this.context.userInterests
        const userTeams = this.context.userTeams
        const userHobbiesComp = this.context.userHobbiesComp
        const userInterestsComp = this.context.userInterestsComp
        const userTeamsComp = this.context.userTeamsComp
        if (section === 'hobbies') {
            userHobbies.forEach(hobby => {
                if(!userHobbiesComp.find(item => item.id === hobby.id)) {
                    CrewApiService.postHobby(hobby.id, userId)
                }
            })
            userHobbiesComp.forEach(hobby => {
                if(!userHobbies.find(item => item.id === hobby.id)) {
                    CrewApiService.deleteHobby(hobby.id, userId)
                }
            })
            this.onCompleteSubmit(userId)
        }
        else if (section === 'interests') {
            userInterests.forEach(interest => {
                if(!userInterestsComp.find(item => item.id === interest.id)) {
                    CrewApiService.postInterest(interest.id, userId)
                }
            })
            userInterestsComp.forEach(interest => {
                if(!this.state.userInterests.find(item => item.id === interest.id)) {
                    CrewApiService.deleteInterest(interest.id, userId)
                }
            })
            this.onCompleteSubmit(userId)
        }
        else if (section === 'teams') {
            userTeams.forEach(team => {
                if(!userTeamsComp.find(item => item.id === team.id)) {
                    CrewApiService.postTeam(team.id, userId)
                }
            })
            userTeamsComp.forEach(team => {
                if(!this.state.userTeams.find(item => item.id === team.id)) {
                    CrewApiService.deleteTeam(team.id, userId)
                }
            })
            this.onCompleteSubmit(userId)
        }
    }

    render() {
        const { section, userId } = this.props.match.params
        let gridToUse
        if (section === 'hobbies') {
            gridToUse = <HobbyGrid userId={userId} />
        }
        else if (section === 'interests') {
            gridToUse = <InterestGrid userId={userId} />
        }
        else if (section === 'teams') {
            gridToUse = <TeamGrid userId={userId} />
        }
        return(
            <div className='update-page'>
                <h1>Let's Review...</h1>
                <h2>Update your {section}</h2>
                <form onSubmit={this.handleSubmit}>
                    {gridToUse}
                    <button className='update-button' type='submit'>Update</button>
                </form>
                <div className='horizontal-navy-update'></div>
                <div className='horizontal-blue-update'></div>
                <div className='horizontal-red-update'></div>
            </div>
        )
    }
}