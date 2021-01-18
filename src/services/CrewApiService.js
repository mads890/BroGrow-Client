import config from '../config'
import TokenService from './token-service'

const CrewApiService = {
    getHobbies() {
        return fetch(`${config.API_ENDPOINT}/hobbies`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            },
        })
        .then(res => 
            (!res.ok)
            ? res.json().then(err => Promise.reject(err))
            : res.json()
        )
    },
    getInterests() {
        return fetch(`${config.API_ENDPOINT}/interests`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            },
        })
        .then(res => 
            (!res.ok)
            ? res.json().then(err => Promise.reject(err))
            : res.json()
        )
    },
    getTeams() {
        return fetch(`${config.API_ENDPOINT}/teams`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            },
        })
        .then(res => 
            (!res.ok)
            ? res.json().then(err => Promise.reject(err))
            : res.json()
        )
    },
    getUserHobbies(userId) {
        return fetch(`${config.API_ENDPOINT}/user/${userId}/hobbies`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            },
        })
        .then(res => 
            (!res.ok)
            ? res.json().then(err => Promise.reject(err))
            : res.json()
        )
    },
    getUserInterests(userId) {
        return fetch(`${config.API_ENDPOINT}/user/${userId}/interests`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            },
        })
        .then(res => 
            (!res.ok)
            ? res.json().then(err => Promise.reject(err))
            : res.json()
        )
    },
    getUserTeams(userId) {
        return fetch(`${config.API_ENDPOINT}/user/${userId}/teams`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            },
        })
        .then(res => 
            (!res.ok)
            ? res.json().then(err => Promise.reject(err))
            : res.json()
        )
    },
    getUser(userId) {
        return fetch(`${config.API_ENDPOINT}/user/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            },
        })
        .then(res => 
            (!res.ok)
            ? res.json().then(err => Promise.reject(err))
            : res.json()
        )
    },
    postUser(user) {
        return fetch(`${config.API_ENDPOINT}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user
            }),
        })
        .then(res => 
            (!res.ok)
                ? res.json().then(err => Promise.reject(err))
                : res.json() 
        )
    },
    postHobby(hobbyId, userId) {
        return fetch(`${config.API_ENDPOINT}/user/${userId}/hobbies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({
                user_hobby: {
                    user_id: userId,
                    hobby_id: hobbyId
                }
            }),
        })
        .then(res => 
            (!res.ok)
                ? res.json().then(err => Promise.reject(err))
                : res.json()
        )
    },
    postInterest(interestId, userId) {
        return fetch(`${config.API_ENDPOINT}/user/${userId}/interests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({
                user_interest: {
                    user_id: userId,
                    interest_id: interestId
                }
            }),
        })
        .then(res => 
            (!res.ok)
                ? res.json().then(err => Promise.reject(err))
                : res.json()
        )
    },
    postTeam(teamId, userId) {
        return fetch(`${config.API_ENDPOINT}/user/${userId}/teams`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({
                user_team: {
                    user_id: userId,
                    team_id: teamId
                }
            }),
        })
        .then(res => 
            (!res.ok)
                ? res.json().then(err => Promise.reject(err))
                : res.json()
        )
    },
    putUser(user, userId) {
        return fetch(`${config.API_ENDPOINT}/user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({
                user: {
                    email: user.email,
                    location: user.location,
                    name: user.title,
                }
            }),
        })
        .then(res => 
            (!res.ok)
                ? res.json().then(err => Promise.reject(err))
                : res.json()    
        )
    },
    deleteHobby(hobbyId, userId) {
        return fetch(`${config.API_ENDPOINT}/user/${userId}/hobbies/${hobbyId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({
                user_hobby: {
                    user_id: userId,
                    hobby_id: hobbyId
                }
            }),
        })
        .then(res => 
            (!res.ok)
                ? res.json().then(err => Promise.reject(err))
                : res.json()    
        )
    },
    deleteInterest(interestId, userId) {
        return fetch(`${config.API_ENDPOINT}/user/${userId}/interests/${interestId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({
                user_interest: {
                    user_id: userId,
                    interest_id: interestId
                }
            }),
        })
        .then(res => 
            (!res.ok)
                ? res.json().then(err => Promise.reject(err))
                : res.json()    
        )
    },
    deleteTeam(teamId, userId) {
        return fetch(`${config.API_ENDPOINT}/user/${userId}/teams/${teamId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({
                user_team: {
                    user_id: userId,
                    team_id: teamId
                }
            }),
        })
        .then(res => 
            (!res.ok)
                ? res.json().then(err => Promise.reject(err))
                : res.json()    
        )
    }
}

export default CrewApiService