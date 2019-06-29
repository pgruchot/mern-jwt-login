import React from 'react';
import withAuthContext from './withAuthContext';

const Landing = (props) => (
  <div className="container white center purple-text text-darken-4" style={{borderRadius: 10 + 'px', height: 600 + 'px'}}>
      {props.context.isAuth ? (
        <div>
                <h2>Landing Page. Current user:</h2>
                <p>{JSON.stringify(props.context.user)}</p>
        </div>
      ) : (
        <h2>Landing Page, please Log in</h2>    
      )}
  </div>
)

export default withAuthContext(Landing);
