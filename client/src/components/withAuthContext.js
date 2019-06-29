import React from 'react';
import { AuthContext } from './AuthContext';

const withAuthContext = (Component) => {
    return (props) => {
        return (
            <AuthContext.Consumer>
                {state => <Component {...props} context={state} />}
            </AuthContext.Consumer>
        );
    };
}

export default withAuthContext;