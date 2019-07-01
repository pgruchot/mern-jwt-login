import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import withAuthContext from './withAuthContext';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login';
import config from './config/keys'
class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            errors: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.updateErrors = this.updateErrors.bind(this);
        this.handleOauth = this.handleOauth.bind(this);

    };

    handleOauth(response) { 
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
                
            } else {
                this.updateErrors(response.data.errors);
            }
        })
    }

    updateErrors(errors) {
        this.setState({
            errors: errors
        })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    
    render() { 
        const errors = this.state.errors ? ( 
            Object.keys(this.state.errors).map(err => {
                return <h2>{this.state.errors[err]}</h2>
            })
            ) : (null);
            const responseFacebook = (response) => {
                console.log(response.email);
                console.log(response.picture.data.url)
              }
        return(
            <div>

                        {this.props.context.isAuth ? (
			                <Redirect to={{ pathname: '/' }} /> 
                        ) : (
                            <div>
                                <div>
                                    {errors}
                                </div>
                                <div className="container white" style={{marginTop: 50 + 'px', borderRadius: 10 + 'px'}}>
                                    <div className="row center"  style={{margin: 10 + 'px'}}>
                                        <form className="col s12">
                                            <div className="row center">
                                                <div className="input-field col s12">
                                                    <input name="username" type="text" className="validate"  onChange={this.handleChange}/>
                                                    <label htmlFor="username">Username</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="input-field col s12">
                                                    <input name="password" type="password" className="validate" onChange={this.handleChange}/>
                                                    <label htmlFor="password">Password</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <button className="btn waves-effect waves-light purple darken-4" onClick={(e) => {this.props.context.login(e, this.state.username, this.state.password, this.updateErrors)}}>Submit
                                                    <i className="material-icons right">send</i>
                                                </button>
                                            </div>
                                            <div className="row">
                                                <FacebookLogin
                                                    appId={config.facebook.clientID} //APP ID NOT CREATED YET
                                                    fields="first_name, last_name, email, id, picture"
                                                    callback={(response) => {this.props.context.loginOauth(response, this.updateErrors)}}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>)
                        } 
            </div>
        );
    }
}

export default withAuthContext(Login);