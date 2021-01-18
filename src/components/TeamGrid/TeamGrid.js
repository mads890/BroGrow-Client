import React, { Component } from 'react';
import './TeamGrid.css';
import ProfileContext from '../../contexts/ProfileContext';
import CrewApiService from '../../services/CrewApiService';
import Accordion from '../Accordion/Accordion';

export default class TeamGrid extends Component {
    static contextType = ProfileContext

    componentDidMount() {
        const userId = this.props.userId
        CrewApiService.getTeams().then(res => this.context.setAllTeams(res.teams)).catch(this.context.setError)
        CrewApiService.getUserTeams(userId).then(res => this.context.setUserTeams(res.user_teams)).catch(this.context.setError)
    }

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

    render() {
        const userTeamIds = this.context.userTeams.map(team => team.id)
        const baseballGridItems = this.context.allTeams.map(team => {
            if(team.sport === 'baseball') {
                if(userTeamIds.includes(team.id)) {
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
        const basketballGridItems = this.context.allTeams.map(team => {
            if(team.sport === 'basketball') {
                if(userTeamIds.includes(team.id)) {
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
        const footballGridItems = this.context.allTeams.map(team => {
            if(team.sport === 'football') {
                if(userTeamIds.includes(team.id)) {
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
        const hockeyGridItems = this.context.allTeams.map(team => {
            if(team.sport === 'hockey') {
                if(userTeamIds.includes(team.id)) {
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
        const soccerGridItems = this.context.allTeams.map(team => {
            if(team.sport === 'soccer') {
                if(userTeamIds.includes(team.id)) {
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
            <div className='team-grid'>
                <Accordion title='MLB'>
                    {baseballGridItems}
                </Accordion>
                <Accordion title='NBA'>
                    {basketballGridItems}
                </Accordion>
                <Accordion title='NFL'>
                    {footballGridItems}
                </Accordion>
                <Accordion title='NHL'>
                    {hockeyGridItems}
                </Accordion>
                <Accordion title='Association Football (Soccer)'>
                    {soccerGridItems}
                </Accordion>
            </div>
        )
    }
}