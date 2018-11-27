import React, { Component } from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';

//Components
import './App.css';
import LoginForm from './containers/login-page/login-form'
import UserHome from './containers/user-home/user-home'
import UserSettings from './containers/user-settings/user-settings'
import UserNotifications from './containers/user-notifications/user-notifications'
import NavbarClient from './components/navbar-client'
import RegisterForm from './containers/register-page/register-form'

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null,
      redirectTo: null,
    };
    this.updateUser = this.updateUser.bind(this);
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  render() {

    return (
      <div className="App">
        <NavbarClient updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        <Switch>
          <Route path="/" exact render={() => <LoginForm updateUser={this.updateUser} />} />
          <Route path="/home" component={UserHome} />
          <Route path="/ajustes" component={UserSettings} />
          <Route path="/notificaciones" component={UserNotifications} />
          <Route path="/register" component={RegisterForm} />
        </Switch>

      </div>
    );
  }
}

export default App;
