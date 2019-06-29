import React from 'react';
import withAuthContext from './withAuthContext';

const Dashboard = (props) => (
    <div className="container white" style={{marginTop: 50 + 'px', borderRadius: 10 + 'px'}}>
            <h2>Protected Route, Dashboard. Current user:</h2>
            <p>{JSON.stringify(props.context.user)}</p>
    </div>
)

export default withAuthContext(Dashboard);