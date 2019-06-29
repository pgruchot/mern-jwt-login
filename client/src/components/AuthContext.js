import React from 'react';
import axios from 'axios';

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
    constructor() {
        super();
         
        this.state = {
            isAuth: false,
            user: null,
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        let token = localStorage.getItem('JWT');
        if(!token) {
            this.setState({
                isAuth: false,
                user: null,
            })
        } else {
            axios.get('/auth/user', { headers: { Authorization: `JWT ${token}` } }).then(response => {
                if (response.data.user) {
                    console.log('THERE IS A USER')
                    this.setState({
                        user: response.data.user
                    })
                } else {
                    this.setState({
                        isAuth: false,
                        user: null,
                    })
                }
            })
        }
    }

    login(e, username, password, updateErrors) {
         // setting timeout to mimic an async login    setTimeout(() => this.setState({ isAuth: true }), 1000)  
         e.preventDefault();
         axios
         .post('/auth/login', {
             username,
             password
         })
         .then(response => {
             console.log(response)
             if (response.data.token) {
                console.log('login component token: '+ response.data.token)
                localStorage.setItem('JWT', response.data.token);
                 // update the state
                 this.setState({
                     isAuth: true,
                 })
             } else {
                 updateErrors(response.data.errors)
             }
         })
    }

    logout(e) {
        e.preventDefault()
		console.log('logging out')
		axios.post('/auth/logout').then(response => {
			console.log(response.data)
			if (response.status === 200) {
				this.setState({
					isAuth: false,
					user: null
				})
			}
		})
    }

    render() {
        return (
            <AuthContext.Provider value={{ isAuth: this.state.isAuth, login: this.login, logout: this.logout, user: this.state.user }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}


export { AuthProvider, AuthContext };