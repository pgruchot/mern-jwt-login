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
        this.loginOauth = this.loginOauth.bind(this);
    }
    async getUser() {
        let token = localStorage.getItem('JWT');
        if(!token) {
            this.setState({
           
                isAuth: false,
                user: null,
            })
        } else {
            await axios.get('/auth/user', { headers: { Authorization: `JWT ${token}` } }).then(response => {
                if (response.data.user) {
                    console.log('THERE IS A USER')
                    this.setState({
                        isAuth: true,
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
    componentDidMount() {
       this.getUser();
    }

    loginOauth(response, updateErrors) {
        axios
        .post('/auth/facebook', {
            data: response
        })
        .then(response => {
            console.log(response)
            if (response.data.token) {
               console.log('login component token: '+ response.data.token)
               localStorage.setItem('JWT', response.data.token);
                // update the state
                this.getUser();
            } else {
                this.updateErrors(response.data.errors)
            }
        })
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
                 this.getUser();
             } else {
                 updateErrors(response.data.errors)
             }
         })
    }

    logout(e) {
        e.preventDefault()
		console.log('logging out')
                localStorage.removeItem('JWT');
				this.setState({
                    setToken: false,
					isAuth: false,
					user: null
				})
    }

    render() {
        return (
            <AuthContext.Provider value={{ isAuth: this.state.isAuth, login: this.login, logout: this.logout, user: this.state.user, loginOauth: this.loginOauth }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}


export { AuthProvider, AuthContext };