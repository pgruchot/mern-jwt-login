import React from 'react';
import withAuthContext from './withAuthContext';
import { Link } from 'react-router-dom';

const Header = (props) => (
    <div>
          <nav>
            <div className="nav-wrapper purple darken-4">
              <a href="#" className="brand-logo" style={{paddingLeft: 10 + 'px'}}>MERN with JWT</a>
                {props.context.isAuth ? (
                  <div>              
                    <ul id="dropdown1" className="dropdown-content">
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/dashboard">Dashboard</Link></li>
                      <li><button onClick={(e) => props.context.logout(e)}>Logout</button></li>
                    </ul>
                    <ul id="nav-mobile" className="right">
                      <li className="hide-on-med-and-down"><Link to="/">Home</Link></li>
                      <li className="hide-on-med-and-down"><Link to="/dashboard">Dashboard</Link></li>
                      <li className="hide-on-med-and-down"><button className="btn purple" onClick={(e) => props.context.logout(e)}>Logout</button></li>
                      <li><a className="dropdown-button hide-on-large-only" href="#!" data-target="dropdown1"><i className="material-icons right">arrow_drop_down</i></a></li>
                    </ul>
                  </div>
                ) : (
                  <div>             
                    <ul id="dropdown2" className="dropdown-content">
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/login">Login</Link></li>
                      <li><Link to="/signup">Signup</Link></li>
                    </ul>
                    <ul id="nav-mobile" className="right">
                      <li className="hide-on-med-and-down"><Link to="/">Home</Link></li>
                      <li className="hide-on-med-and-down"><Link to="/login">Login</Link></li>
                      <li className="hide-on-med-and-down"><Link to="/signup">Signup</Link></li>
                      <li><a className="dropdown-button hide-on-large-only" href="#!" data-target="dropdown2"><i className="material-icons right">arrow_drop_down</i></a></li>
                    </ul>
                  </div>
                )}
          </div>
        </nav>
    </div>
)

export default withAuthContext(Header);
  