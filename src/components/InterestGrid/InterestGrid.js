import React, { Component } from 'react';
import './InterestGrid.css';
import ProfileContext from '../../contexts/ProfileContext';
import CrewApiService from '../../services/CrewApiService';

export default class InterestGrid extends Component {
    static contextType = ProfileContext

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            interestsFiltered: [],
        }
    }

    componentDidMount() {
        const userId = this.props.userId
        CrewApiService.getInterests()
            .then(res => Promise.all([
                this.context.setAllInterests(res.interests),
                this.setState({
                    interestsFiltered: res.interests
                })
            ]))
            .catch(this.context.setError)
        CrewApiService.getUserInterests(userId)
            .then(res => Promise.all([
                this.context.setUserInterests(res.user_interests), 
                this.context.setUserInterestsComp(res.user_interests)
            ]))
            .catch(this.context.setError)
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

    handleChangeSearchTerm = (e) => {
        const interestSearchTerm = e.target.value
        const interestsFiltered = this.context.allInterests.filter(interest => {
            return interest.name.toLowerCase().includes(interestSearchTerm.toLowerCase())
        })
        this.setState({ interestSearchTerm })
        this.setState({ interestsFiltered })
    }

    render() {
        const checkedInterestList = this.context.userInterests.map(interest => interest.id)
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
        return(
            <div className='interest-grid'>
                <input className='interest-search' value={this.state.interestSearchTerm} onChange={this.handleChangeSearchTerm} placeholder='Search Interests...' />
                <div className='form-grid'>{interestGridItems}</div>
            </div>
        )
    }
}