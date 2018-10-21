import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./login-form.css";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      redirectTo: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    
    axios
      .post('/user/login', {
        email: this.state.email,
        password: this.state.password,
      })
      .then(response => {
        if (response.status === 200) {
          this.props.updateUser({
            loggedIn: true,
            username: response.data.username,
          });
          this.setState({
            redirectTo: '/',
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  

  render() {
    return (
    
      <div className="login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" className = "form-group" >
            <FormControl
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder = "Correo"
              className="box"
            />
          </FormGroup>
          <FormGroup controlId="password">
            <FormControl
              name="password"
              className = "box"
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              placeholder="Contraseña"
            />
          </FormGroup>

          <Button
            className = "boton"
            bsStyle="primary"
            bsSize="large"
            type="submit"
            onClick={this.handleSubmit}
          >
            Iniciar Sesión
          </Button>
        </form>
      </div>
    );
  }
}
export default LoginForm;