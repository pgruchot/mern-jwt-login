import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
class Signup extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            email: '',
            password: '',
            password2: '',
            redirectTo: '',
            errors: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit(e) {
        e.preventDefault();
        console.log('handleSubmit called...');
        axios.post('/auth/signup', {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
        }).then(response => {
            if(!response.data.errors) {
                console.log('Youre good people');
                this.setState({
                    redirectTo: '/login'
                })
            } else {
                console.log('getting here')
                console.log(response.data)

                this.setState({
                    errors: response.data.errors
                })
            }
        })
    }
    
    render() {
        if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
        } 
        const errors = this.state.errors ? ( 
            Object.keys(this.state.errors).map(err => {
                return <h2>{this.state.errors[err]}</h2>
            })
            ) : (null);
        
        return(
            <div>
                <div>   
                    {errors}
                </div>
                        <div className="container white" style={{marginTop: 50 + 'px', borderRadius: 10 + 'px'}}>
                            <div className="row center" style={{margin: 10 + 'px'}}>
                                <form className="col s12">
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input name="username" type="text" className="validate"  onChange={this.handleChange}/>
                                            <label htmlFor="username">Username</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input name="email" type="email" className="validate"  onChange={this.handleChange}/>
                                            <label htmlFor="username">Email</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input name="password" type="password" className="validate" onChange={this.handleChange}/>
                                            <label htmlFor="password">Password</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input name="password2" type="password" className="validate" onChange={this.handleChange}/>
                                            <label htmlFor="password2">Repeat Password</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <button className="btn waves-effect waves-light purple darken-4" onClick={this.handleSubmit}>Submit
                                            <i className="material-icons right">send</i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
            </div>
        );
    }
   
}

export default Signup;