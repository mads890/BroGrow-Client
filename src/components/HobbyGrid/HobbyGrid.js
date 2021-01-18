import React, { Component } from 'react';
import './HobbyGrid.css';
import ProfileContext from '../../contexts/ProfileContext';
import CrewApiService from '../../services/CrewApiService';

export default class HobbyGrid extends Component {
    static contextType = ProfileContext

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            hobbiesFiltered: [],
        }
    }

    componentDidMount() {
        const userId = this.props.userId
        CrewApiService.getHobbies()
            .then(res => Promise.all([
                this.context.setAllHobbies(res.hobbies),
                this.setState({
                    hobbiesFiltered: res.hobbies
                })
            ]))
            .catch(this.context.setError)
        CrewApiService.getUserHobbies(userId)
            .then(res => Promise.all([
                this.context.setUserHobbies(res.user_hobbies), 
                this.context.setUserHobbiesComp(res.user_hobbies)
            ]))
            .catch(this.context.setError)
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

    handleChangeSearchTerm = (e) => {
        const hobbySearchTerm = e.target.value
        const hobbiesFiltered = this.context.allHobbies.filter(hobby => {
            return hobby.name.toLowerCase().includes(hobbySearchTerm.toLowerCase())
        })
        this.setState({ hobbySearchTerm })
        this.setState({ hobbiesFiltered })
    }
    
    render() {
        const checkedHobbyList = this.context.userHobbies.map(hobby => hobby.id)
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
            <div className='hobby-grid'>
                <input className='hobby-search' value={this.state.hobbySearchTerm} onChange={this.handleChangeSearchTerm} placeholder='Search Hobbies...' />
                <div className='form-grid'>{hobbyGridItems}</div>
            </div>
        )
    }
}