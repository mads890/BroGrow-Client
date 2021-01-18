import React, { Component } from 'react'

const ProfileContext = React.createContext({
    user: {
        age: 0,
        email: '',
        location: '',
        title: ''
    },
    setUser: () => {},
    allHobbies: [],
    allInterests: [],
    allTeams: [],
    userHobbies: [],
    userInterests: [],
    userTeams: [],
    userHobbiesComp: [],
    userInterestsComp: [],
    userTeamsComp: [],
    setAllHobbies: () => {},
    setAllInterests: () => {},
    setAllTeams: () => {},
    setUserHobbies: () => {},
    setUserInterests: () => {},
    setUserTeams: () => {},
    setUserHobbiesComp: () => {},
    setUserInterestsComp: () => {},
    setUserTeamsComp: () => {},
    error: null,
    setError: () => {},
    clearError: () => {},
})
export default ProfileContext

export class ProfileProvider extends Component {
    state = {
        user: {
            age: 0,
            email: '',
            location: '',
            title: '',
        },
        allHobbies: [],
        allInterests: [],
        allTeams: [],
        userHobbies: [],
        userInterests: [],
        userTeams: [],
        userHobbiesComp: [],
        userInterestsComp: [],
        userTeamsComp: [],
        error: null,
    };

    setUser = user => {
        this.setState({ user: {
            age: user.age,
            email: user.email,
            location: user.location || '',
            title: user.name,
        } 
        })
    }
    
    setAllHobbies = allHobbies => {
        this.setState({ allHobbies })
    }

    setAllInterests = allInterests => {
        this.setState({ allInterests })
    }

    setAllTeams = allTeams => {
        this.setState({ allTeams })
    }

    setUserHobbies = userHobbies => {
        this.setState({ userHobbies })
    }

    setUserInterests = userInterests => {
        this.setState({ userInterests })
    }

    setUserTeams = userTeams => {
        this.setState({ userTeams })
    }

    setUserHobbiesComp = userHobbiesComp => {
        this.setState({ userHobbiesComp })
    }

    setUserInterestsComp = userInterestsComp => {
        this.setState({ userInterestsComp })
    }

    setUserTeamsComp = userTeamsComp => {
        this.setState({ userTeamsComp })
    }

    setError = error => {
        console.error(error)
        this.setState({ error })
    }

    clearError = () => {
        this.setState({ error: null })
    }

    render() {
        const value = {
            user: this.state.user,
            setUser: this.setUser,
            allHobbies: this.state.allHobbies,
            allInterests: this.state.allInterests,
            allTeams: this.state.allTeams,
            userHobbies: this.state.userHobbies,
            userInterests: this.state.userInterests,
            userTeams: this.state.userTeams,
            userHobbiesComp: this.state.userHobbiesComp,
            userInterestsComp: this.state.userInterestsComp,
            userTeamsComp: this.state.userTeamsComp,
            setAllHobbies: this.setAllHobbies,
            setAllInterests: this.setAllInterests,
            setAllTeams: this.setAllTeams,
            setUserHobbies: this.setUserHobbies,
            setUserInterests: this.setUserInterests,
            setUserTeams: this.setUserTeams,
            setUserHobbiesComp: this.setUserHobbiesComp,
            setUserInterestsComp: this.setUserInterestsComp,
            setUserTeamsComp: this.setUserTeamsComp,
            error: this.state.error,
            setError: this.setError,
            clearError: this.clearError,
        }
        return(
            <ProfileContext.Provider value={value}>
                {this.props.children}
            </ProfileContext.Provider>
        )
    }
}