import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

//Components
import './App.css';
import LoginForm from './containers/login-page/login-form'
import UserHome from './containers/user-home/user-home'
import UserSettings from './containers/user-settings/user-settings'
import UserNotifications from './containers/user-notifications/user-notifications'
import NavbarClient from './components/navbar-client'


class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: true,
      username: null,
    };

  }
  render() {

    return (
      <div className="App">
        <NavbarClient/>
        <Route exact path="/" component={UserHome} />
        <Route exact path="/ajustes" component={UserSettings} />
        <Route exact path="/notificaciones" component={UserNotifications} />
        <Route exact path="/login" component={LoginForm} />
      </div>
    );
  }
}

export default App;
