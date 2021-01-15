import React, { Component } from 'react';
import './UpdateForm.css';
import TokenService from '../../services/token-service';
import config from '../../config';

export default class UpdateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            interests: [],
            hobbies: [],
            teams: [],
            userInterests: [],
            userHobbies: [],
            userHobbiesForComp: [], 
            userInterestsForComp: [],
            userTeams: [],
            hobbySearchTerm: '',
            hobbiesFiltered: [],
            interestSearchTerm: '',
            interestsFiltered: [],
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
            fetch(`${config.API_ENDPOINT}/hobbies`, options),
            fetch(`${config.API_ENDPOINT}/interests`, options),
            fetch(`${config.API_ENDPOINT}/teams`, options)

        ])
        .then(([uHobbyRes, uIntRes, uTeamRes, hobbyRes, intRes, teamRes]) => {
            if(!uHobbyRes.ok) {
                return uHobbyRes.json().then(err => Promise.reject(err));
            }
            if(!uIntRes.ok) {
                return uIntRes.json().then(err => Promise.reject(err));
            }
            if(!uTeamRes.ok) {
                return uTeamRes.json().then(err => Promise.reject(err));
            }
            if(!hobbyRes.ok) {
                return hobbyRes.json().then(err => Promise.reject(err));
            }
            if(!intRes.ok) {
                return intRes.json().then(err => Promise.reject(err));
            }
            if(!teamRes.ok) {
                return teamRes.json().then(err => Promise.reject(err));
            }
            return Promise.all([uHobbyRes.json(), uIntRes.json(), uTeamRes.json(), hobbyRes.json(), intRes.json(), teamRes.json()]);
        })
        .then(([uHobbyRes, uIntRes, uTeamRes, hobbyRes, intRes, teamRes]) => {
            this.setState({
                userHobbies: uHobbyRes.user_hobbies, 
                userInterests: uIntRes.user_interests,
                userHobbiesForComp: uHobbyRes.user_hobbies, 
                userInterestsForComp: uIntRes.user_interests,
                userTeamsForComp: uTeamRes.user_teams,
                userTeams: uTeamRes.user_teams,
                hobbies: hobbyRes.hobbies,
                interests: intRes.interests,
                teams: teamRes.teams,
                hobbiesFiltered: hobbyRes.hobbies,
                interestsFiltered: intRes.interests,
            });
        })   
      }

    handleNextPage = (e) => {
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
            const newStep = this.state.step + 1
            const stepThree = document.getElementById('step3')
            const stepTwo = document.getElementById('step2')
            stepThree.classList.remove('hidden')
            stepTwo.classList.add('hidden')
            this.setState({
                step: newStep
            })
        }
    }

    handlePrevPage = (e) => {
        e.preventDefault()
        if(this.state.step === 2) {
            const newStep = this.state.step - 1
            const stepOne = document.getElementById('step1')
            const stepTwo = document.getElementById('step2')
            stepOne.classList.remove('hidden')
            stepTwo.classList.add('hidden')
            this.setState({
                step: newStep
            })
        }
        else if (this.state.step === 3) {
            const newStep = this.state.step - 1
            const stepThree = document.getElementById('step3')
            const stepTwo = document.getElementById('step2')
            stepThree.classList.add('hidden')
            stepTwo.classList.remove('hidden')
            this.setState({
                step: newStep
            })
        }
    }

    handleCheckInterest = (e) => {
        const interestId = Number(e.target.value)
        const interestObj = this.state.interests.find(interest => interest.id === interestId)
        if(e.target.checked) {
            this.setState({
                userInterests: [...this.state.userInterests, interestObj]
            })
        }
        else {
            const newInterests = this.state.userInterests.filter(interest => interest.id !== interestId)
            this.setState({
                userInterests: newInterests
            })
        }
    }

    handleCheckHobby = (e) => {
        const hobbyId = Number(e.target.value)
        const hobbyObj = this.state.hobbies.find(hobby => hobby.id === hobbyId)

        if(e.target.checked) {
            this.setState({
                userHobbies: [...this.state.userHobbies, hobbyObj]
            })
        }
        else {
            const newHobbies = this.state.userHobbies.filter(hobby => hobby.id !== hobbyId)
            this.setState({
                userHobbies: newHobbies
            })
        }
    }

    handleCheckTeam = (e) => {
        const teamId = Number(e.target.value)
        const teamObj = this.state.teams.find(team => team.id === teamId)

        if(e.target.checked) {
            this.setState({
                userTeams: [...this.state.userTeams, teamObj]
            })
        }
        else {
            const newTeams = this.state.userTeams.filter(team => team.id !== teamId)
            this.setState({
                userTeams: newTeams
            })
        }
    }

    handleChangeHobbySearchTerm = (e) => {
        const hobbySearchTerm = e.target.value
        const hobbiesFiltered = this.state.hobbies.filter(hobby => {
            return hobby.name.toLowerCase().includes(hobbySearchTerm.toLowerCase())
        })
        this.setState({ hobbySearchTerm })
        this.setState({ hobbiesFiltered })
    }

    handleChangeInterestSearchTerm = (e) => {
        const interestSearchTerm = e.target.value
        const interestsFiltered = this.state.interests.filter(interest => {
            return interest.name.toLowerCase().includes(interestSearchTerm.toLowerCase())
        })
        this.setState({ interestSearchTerm })
        this.setState({ interestsFiltered })
    }

    onCompleteSubmit = (id) => {
        this.props.history.push(`/user/${id}`)
    }

    handleSubmitInfo = (e) => {
        e.preventDefault()
        const { userId } = this.props.match.params
        const userHobbies = this.state.userHobbies
        const userInterests = this.state.userInterests
        const userTeams = this.state.userTeams
        const userHobbiesForComp = this.state.userHobbiesForComp
        const userInterestsForComp = this.state.userInterestsForComp
        const userTeamsForComp = this.state.userTeamsForComp

        userHobbies.forEach(hobby => {
            if(!this.state.userHobbiesForComp.find(item => item.id === hobby.id)) {
                return fetch(`${config.API_ENDPOINT}/user/${userId}/hobbies`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${TokenService.getAuthToken()}`
                    },
                    body: JSON.stringify({
                        user_hobby: {
                            user_id: userId,
                            hobby_id: hobby.id
                        }
                    }),
                })
                .then(res => 
                    (!res.ok)
                        ? res.json().then(err => Promise.reject(err))
                        : res.json()    
                )
                .then(res =>
                    console.log(res),
                    console.log('check hobbies ran')  
                )
            }
        })
        userHobbiesForComp.forEach(hobby => {
            if(!this.state.userHobbies.find(item => item.id === hobby.id)) {
                return fetch(`${config.API_ENDPOINT}/user/${userId}/hobbies/${hobby.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${TokenService.getAuthToken()}`
                    },
                    body: JSON.stringify({
                        user_hobby: {
                            user_id: userId,
                            hobby_id: hobby.id
                        }
                    }),
                })
                .then(res => 
                    (!res.ok)
                        ? res.json().then(err => Promise.reject(err))
                        : res.json()    
                )
                .then(res =>
                    console.log(res),
                    console.log('uncheck hobbies ran') 
                )
            }
        })
        userInterests.forEach(interest => {
            if(!this.state.userInterestsForComp.find(item => item.id === interest.id)) {
                return fetch(`${config.API_ENDPOINT}/user/${userId}/interests`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${TokenService.getAuthToken()}`
                    },
                    body: JSON.stringify({
                        user_interest: {
                            user_id: userId,
                            interest_id: interest.id
                        }
                    }),
                })
                .then(res => 
                    (!res.ok)
                        ? res.json().then(err => Promise.reject(err))
                        : res.json()    
                )
                .then(res =>
                    console.log(res),
                    console.log('check interests ran')   
                )
            }
        })
        userInterestsForComp.forEach(interest => {
            if(!this.state.userInterests.find(item => item.id === interest.id)) {
                return fetch(`${config.API_ENDPOINT}/user/${userId}/interests/${interest.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${TokenService.getAuthToken()}`
                    },
                    body: JSON.stringify({
                        user_interest: {
                            user_id: userId,
                            interest_id: interest.id
                        }
                    }),
                })
                .then(res => 
                    (!res.ok)
                        ? res.json().then(err => Promise.reject(err))
                        : res.json()    
                )
                .then(res =>
                    console.log(res),
                    console.log('uncheck interests ran')    
                )
            }
        })
        userTeams.forEach(team => {
            if(!this.state.userTeamsForComp.find(item => item.id === team.id)) {
                return fetch(`${config.API_ENDPOINT}/user/${userId}/teams`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${TokenService.getAuthToken()}`
                    },
                    body: JSON.stringify({
                        user_team: {
                            user_id: userId,
                            team_id: team.id
                        }
                    }),
                })
                .then(res => 
                    (!res.ok)
                        ? res.json().then(err => Promise.reject(err))
                        : res.json()    
                )
                .then(res =>
                    console.log(res),
                    console.log('check teams ran')  
                )
            }
        })
        userTeamsForComp.forEach(team => {
            if(!this.state.userTeams.find(item => item.id === team.id)) {
                return fetch(`${config.API_ENDPOINT}/user/${userId}/teams/${team.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${TokenService.getAuthToken()}`
                    },
                    body: JSON.stringify({
                        user_team: {
                            user_id: userId,
                            team_id: team.id
                        }
                    }),
                })
                .then(res => 
                    (!res.ok)
                        ? res.json().then(err => Promise.reject(err))
                        : res.json()    
                )
                .then(res =>
                    console.log(res),
                    console.log('uncheck teams ran')   
                )
            }
        })
        this.onCompleteSubmit(userId)
    }

    render() {
        const checkedInterestList = this.state.userInterests.map(interest => interest.id)
        const checkedHobbyList = this.state.userHobbies.map(hobby => hobby.id)
        const checkedTeamList = this.state.userTeams.map(team => team.id)
        const interestGridItems = this.state.interestsFiltered.map(interest => {
            if(checkedInterestList.includes(interest.id)) {
                return(
                        <label className='form-grid-item'><input onChange={this.handleCheckInterest} className='checkbox' name='interests' value={interest.id} type='checkbox' checked /><div className='check-label'><p>{interest.name}</p></div></label>
                )
            }
            else {
                return(
                       <label className='form-grid-item'><input onChange={this.handleCheckInterest} className='checkbox' name='interests' value={interest.id} type='checkbox' /><div className='check-label'><p>{interest.name}</p></div></label>
                )
            }
        }
        )
        const hobbyGridItems = this.state.hobbiesFiltered.map(hobby => {
            if(checkedHobbyList.includes(hobby.id)) {
                return(
                    <label className='form-grid-item'><input onChange={this.handleCheckHobby} className='checkbox' name='hobbies' value={hobby.id} type='checkbox' checked /><div className='check-label'><p>{hobby.name}</p></div></label>
                )
            }
            else {
                return(
                    <label className='form-grid-item'><input onChange={this.handleCheckHobby} className='checkbox' name='hobbies' value={hobby.id} type='checkbox' /><div className='check-label'><p>{hobby.name}</p></div></label>
                )
            }
        }
        )
        const baseballGridItems = this.state.teams.map(team => {
            if(team.sport === 'baseball') {
                if(checkedTeamList.includes(team.id)) {
                    return(
                        <label className='form-grid-item'><input onChange={this.handleCheckTeam} className='checkbox' name='teams' value={team.id} type='checkbox' checked /><div className='check-label'><p>{team.name}</p></div></label>
                    )
                }
                else {
                    return(
                        <label className='form-grid-item'><input onChange={this.handleCheckTeam} className='checkbox' name='teams' value={team.id} type='checkbox' /><div className='check-label'><p>{team.name}</p></div></label>
                    )
                }
            }
        }
        )
        const basketballGridItems = this.state.teams.map(team => {
            if(team.sport === 'basketball') {
                if(checkedTeamList.includes(team.id)) {
                    return(
                        <label className='form-grid-item'><input onChange={this.handleCheckTeam} className='checkbox' name='teams' value={team.id} type='checkbox' checked /><div className='check-label'><p>{team.name}</p></div></label>
                    )
                }
                else {
                    return(
                        <label className='form-grid-item'><input onChange={this.handleCheckTeam} className='checkbox' name='teams' value={team.id} type='checkbox' /><div className='check-label'><p>{team.name}</p></div></label>
                    )
                }
            }
        }
        )
        const footballGridItems = this.state.teams.map(team => {
            if(team.sport === 'football') {
                if(checkedTeamList.includes(team.id)) {
                    return(
                        <label className='form-grid-item'><input onChange={this.handleCheckTeam} className='checkbox' name='teams' value={team.id} type='checkbox' checked /><div className='check-label'><p>{team.name}</p></div></label>
                    )
                }
                else {
                    return(
                        <label className='form-grid-item'><input onChange={this.handleCheckTeam} className='checkbox' name='teams' value={team.id} type='checkbox' /><div className='check-label'><p>{team.name}</p></div></label>
                    )
                }
            }
        }
        )
        const hockeyGridItems = this.state.teams.map(team => {
            if(team.sport === 'hockey') {
                if(checkedTeamList.includes(team.id)) {
                    return(
                        <label className='form-grid-item'><input onChange={this.handleCheckTeam} className='checkbox' name='teams' value={team.id} type='checkbox' checked /><div className='check-label'><p>{team.name}</p></div></label>
                    )
                }
                else {
                    return(
                        <label className='form-grid-item'><input onChange={this.handleCheckTeam} className='checkbox' name='teams' value={team.id} type='checkbox' /><div className='check-label'><p>{team.name}</p></div></label>
                    )
                }
            }
        }
        )
        const soccerGridItems = this.state.teams.map(team => {
            if(team.sport === 'soccer') {
                if(checkedTeamList.includes(team.id)) {
                    return(
                        <label className='form-grid-item'><input onChange={this.handleCheckTeam} className='checkbox' name='teams' value={team.id} type='checkbox' checked /><div className='check-label'><p>{team.name}</p></div></label>
                    )
                }
                else {
                    return(
                        <label className='form-grid-item'><input onChange={this.handleCheckTeam} className='checkbox' name='teams' value={team.id} type='checkbox' /><div className='check-label'><p>{team.name}</p></div></label>
                    )
                }
            }
        }
        )
        
        return(
            <div>
                <form onSubmit={this.handleSubmitInfo}>
                <div className='step1' id='step1'>
                    <h1>Let's Get To Know you.</h1>
                    <h2>What are you interested in?</h2>
                    <p>Pick as many as you like. We’ll use these to match you up with other guys who like to discuss the same things.</p>
                    <input className='text-input' value={this.state.interestSearchTerm} onChange={this.handleChangeInterestSearchTerm} placeholder='Search Interests...' />
                    <div className='form-grid'>{interestGridItems}</div>
                    <button className='next-button' onClick={this.handleNextPage}>Next: Hobbies</button>
                </div>
                <div className='step2 hidden' id='step2'>
                    <h1>How About Hobbies?</h1>
                    <h2>What do you like to do?</h2>
                    <p>In our opinion, interests are things you like to discuss, while hobbies are activities you enjoy.</p>
                    <input className='text-input' value={this.state.hobbySearchTerm} onChange={this.handleChangeHobbySearchTerm} placeholder='Search Hobbies...' />
                    <div className='form-grid'>{hobbyGridItems}</div>
                    <button className='next-button' onClick={this.handleNextPage}>Next: Teams</button>
                </div>
                <div className='step3 hidden' id='step3'>
                    <h1>What Colors Do You Bleed?</h1>
                    <h2>Which teams do you follow?</h2>
                    <p>We saved the best for last, because nothing defines a man like the teams he roots for.</p>
                    <h2>MLB</h2>
                    <div className='form-grid'>{baseballGridItems}</div>
                    <h2>NBA</h2>
                    <div className='form-grid'>{basketballGridItems}</div>
                    <h2>NFL</h2>
                    <div className='form-grid'>{footballGridItems}</div>
                    <h2>NHL</h2>
                    <div className='form-grid'>{hockeyGridItems}</div>
                    <h2>Association Football (Soccer)</h2>
                    <div className='form-grid'>{soccerGridItems}</div>
                    <button className='submit-button' type='submit'>Complete Profile</button>
                </div>
                </form>
            </div>
        )
    }
}