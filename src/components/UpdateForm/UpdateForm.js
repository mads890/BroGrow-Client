import React, { Component } from 'react';
import './UpdateForm.css';
import ProfileContext from '../../contexts/ProfileContext';
import CrewApiService from '../../services/CrewApiService';

export default class UpdateForm extends Component {
    static contextType = ProfileContext

    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            hobbySearchTerm: '',
            hobbiesFiltered: [],
            interestSearchTerm: '',
            interestsFiltered: [],
        }
    }
    
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
        /*
        CrewApiService.getTeams()
            .then(res => this.context.setAllTeams(res.teams))
            .catch(this.context.setError)
        */
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
        /*
        CrewApiService.getUserTeams(userId)
            .then(res => Promise.all([
                this.context.setUserTeams(res.user_teams), 
                this.context.setUserTeamsComp(res.user_teams)
            ]))
            .catch(this.context.setError)
        */
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
        /*
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
        */
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
        /*
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
        */
    }

    handleCheckInterest = (e) => {
        const interestId = Number(e.target.value)
        const interestObj = this.context.allInterests.find(interest => interest.id === interestId)
        if(e.target.checked) {
            this.context.setUserInterests([...this.context.userInterests, interestObj])
        }
        else {
            const newInterests = this.context.userInterests.filter(interest => interest.id !== interestId)
            this.context.setUserInterests(newInterests)
        }
    }

    handleCheckHobby = (e) => {
        const hobbyId = Number(e.target.value)
        const hobbyObj = this.context.allHobbies.find(hobby => hobby.id === hobbyId)

        if(e.target.checked) {
            this.context.setUserHobbies([...this.context.userHobbies, hobbyObj])
        }
        else {
            const newHobbies = this.context.userHobbies.filter(hobby => hobby.id !== hobbyId)
            this.context.setUserHobbies(newHobbies)
        }
    }

    /*
    handleCheckTeam = (e) => {
        const teamId = Number(e.target.value)
        const teamObj = this.context.allTeams.find(team => team.id === teamId)

        if(e.target.checked) {
            this.context.setUserTeams([...this.context.userTeams, teamObj])
        }
        else {
            const newTeams = this.context.userTeams.filter(team => team.id !== teamId)
            this.context.setUserTeams(newTeams)
        }
    }
    */

    handleChangeHobbySearchTerm = (e) => {
        const hobbySearchTerm = e.target.value
        const hobbiesFiltered = this.context.allHobbies.filter(hobby => {
            return hobby.name.toLowerCase().includes(hobbySearchTerm.toLowerCase())
        })
        this.setState({ hobbySearchTerm })
        this.setState({ hobbiesFiltered })
    }

    handleChangeInterestSearchTerm = (e) => {
        const interestSearchTerm = e.target.value
        const interestsFiltered = this.context.allInterests.filter(interest => {
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
        const userHobbies = this.context.userHobbies
        const userInterests = this.context.userInterests
        //const userTeams = this.context.userTeams
        const userHobbiesComp = this.context.userHobbiesComp
        const userInterestsComp = this.context.userInterestsComp
        //const userTeamsComp = this.context.userTeamsComp

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
        /*
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
        */
        this.onCompleteSubmit(userId)
    }

    /*
    team grid item template
    const baseballGridItems = this.context.allTeams.map(team => {
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

    return
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
    */

    render() {
        const checkedInterestList = this.context.userInterests.map(interest => interest.id)
        const checkedHobbyList = this.context.userHobbies.map(hobby => hobby.id)
        const checkedTeamList = this.context.userTeams.map(team => team.id)
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
                    <button className='submit-button' type='submit'>Complete Profile</button>
                </div>
                </form>
                <div className='horizontal-navy-update'></div>
                <div className='horizontal-blue-update'></div>
                <div className='horizontal-red-update'></div>
            </div>
        )
    }
}