import React from 'react';
import './App.css';


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import Header from './components/Header';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Signup from './components/Signup';


function App() {
  
  return (
    <Router>
     <AuthProvider>
          <Header />
          <Switch>
            <ProtectedRoute path="/dashboard" component={Dashboard} />
            <Route exact path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
    </AuthProvider>
  </Router>
  );
}

export default App;
