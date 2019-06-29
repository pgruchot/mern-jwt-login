import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import withAuthContext from './withAuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route render={ props => rest.context.isAuth ? <Component {...props} /> : <Redirect to="/" />} {...rest} />
)

export default withAuthContext(ProtectedRoute);