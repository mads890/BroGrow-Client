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
            title: '',
            email: '',
            age: 99
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
                userHobbiesForComp: uHobbyRes.user_hobbies, 
                userInterestsForComp: uIntRes.user_interests,
                //userTeams: uTeamRes.user_teams,
                email: userRes.user.email,
                hobbies: hobbyRes.hobbies,
                interests: intRes.interests,
                //teams: teamRes.teams
            });
        })   
      }

      /*
        handleUpdateUser = (e) => {
            e.preventDefault();
            const { userId } = this.props.match.params
            const { title, age } = e.target
            return fetch(`${config.API_ENDPOINT}/user/${userId}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        age: age.value,
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
    
    _next = (e) => {
        e.preventDefault()
        const newStep = this.state.step + 1
        if (newStep === 2) {
            const stepOne = document.getElementById('step1')
            const stepTwo = document.getElementById('step2')
            stepOne.classList.add('hidden')
            stepTwo.classList.remove('hidden')
            this.setState({
                step: newStep
            })
        }
        else if (newStep === 3) {
            const stepThree = document.getElementById('step3')
            const stepTwo = document.getElementById('step2')
            stepThree.classList.remove('hidden')
            stepTwo.classList.add('hidden')
            this.setState({
                step: newStep
            })
        }
    }

    _prev = (e) => {
        e.preventDefault()
        const newStep = this.state.step - 1
        if (newStep === 2) {
            const stepThree = document.getElementById('step3')
            const stepTwo = document.getElementById('step2')
            stepThree.classList.add('hidden')
            stepTwo.classList.remove('hidden')
            this.setState({
                step: newStep
            })
        }
        else if (newStep === 1) {
            const stepOne = document.getElementById('step1')
            const stepTwo = document.getElementById('step2')
            stepOne.classList.remove('hidden')
            stepTwo.classList.add('hidden')
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

    onCompleteSubmit = (id) => {
        this.props.history.push(`/user/${id}`)
    }

    handleSubmitInfo = (e) => {
        e.preventDefault()
        const { userId } = this.props.match.params
        //const title = e.target.name.value
        //const age = e.target.age.value
        const userHobbies = this.state.userHobbies
        const userInterests = this.state.userInterests
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
                    console.log(res)    
                )
            }
            else {
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
                    console.log(res)    
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
                    console.log(res)    
                )
            }
            else {
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
                    console.log(res)    
                )
            }
        })
        this.onCompleteSubmit(userId)
    }

    render() {
        const checkedInterestList = this.state.userInterests.map(interest => interest.id)
        const checkedHobbyList = this.state.userHobbies.map(hobby => hobby.id)
        const interestGridItems = this.state.interests.map(interest => {
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
        const hobbyGridItems = this.state.hobbies.map(hobby => {
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
        
        return(
            <div>
                <form onSubmit={this.handleSubmitInfo}>
                <div className='step1' id='step1'>
                    <h1>Basic Info</h1>
                    <label htmlFor='name'>How should we introduce you?</label>
                    <input type='name' name='name' placeholder='Name' />
                    <label htmlFor='age'>What is your age?</label>
                    <input type='number' name='age' placeholder='Age' />
                    <button className='next-button' onClick={this._next}>Next</button>
                </div>
                <div className='step2 hidden' id='step2'>
                    <h1>Your Interests and Hobbies</h1>
                    <h2>Hobbies:</h2>
                    <div className='form-grid'>{hobbyGridItems}</div>
                    <h2>Interests:</h2>
                    <div className='form-grid'>{interestGridItems}</div>
                    <button className='prev-button' onClick={this._prev}>Previous</button>
                    <button className='next-button' onClick={this._next}>Next</button>
                </div>
                <div className='step3 hidden' id='step3'>
                    <h1>Your Teams</h1>
                    <h2>Baseball:</h2>
                    <div className='form-grid'></div>
                    <h2>Basketball:</h2>
                    <div className='form-grid'></div>
                    <h2>Football:</h2>
                    <div className='form-grid'></div>
                    <h2>Golf:</h2>
                    <div className='form-grid'></div>
                    <h2>Hockey:</h2>
                    <div className='form-grid'></div>
                    <h2>Soccer:</h2>
                    <div className='form-grid'></div>
                    <h2>Tennis:</h2>
                    <div className='form-grid'></div>
                    <button className='prev-button' onClick={this._prev}>Previous</button>
                    <button className='submit-button' type='submit'>Submit</button>
                </div>
                </form>
            </div>
        )
    }
}