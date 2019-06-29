import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import withAuthContext from './withAuthContext';
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

    };

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
                                                    <label for="username">Username</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="input-field col s12">
                                                    <input name="password" type="password" className="validate" onChange={this.handleChange}/>
                                                    <label for="password">Password</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <button className="btn waves-effect waves-light purple darken-4" onClick={(e) => {this.props.context.login(e, this.state.username, this.state.password, this.updateErrors)}}>Submit
                                                    <i className="material-icons right">send</i>
                                                </button>
                                            </div>
                                            <div className="row">
                                                <a href="http://localhost:5000/auth/facebook" className="btn purple darken-4">Sign in with facebook</a>
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