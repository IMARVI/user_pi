import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./login-form.css";
import { connect } from 'react-redux';

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
    const datos = {
      user: this.state.email,
      password: this.state.password,
      header: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    }

    axios.post('https://el-equipo-perro.mybluemix.net/client/login', datos)
      .then(response => {
        console.log(response)
        if (response.data.payload === true){
          this.props.setUser(this.state.email)
          this.props.loggedIn()
          console.log(this.props)

          this.setState({
            redirectTo: '/home'
          })
        }
        else {
          this.setState({
            email: '',
            password: ''
          })
        }
      })
      .catch(error => {
        console.log("No se encontro el usuario")
        console.error(error);
      });
  }



  render() {
    console.log(this.state)
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
        return (
        <div className="login">
          <br></br>
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
            <center>
            <Button
              className = "boton"
              bsStyle="primary"
              bsSize="large"
              type="submit"
              onClick={this.handleSubmit}
            >
              Iniciar Sesión
            </Button>
            </center>

            <Link to="/register" >
              Registrarse
            </Link>

          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    usr: state.user,
    pswd: state.password,
    logged: state.logged
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: (usr) => dispatch({ type: 'SET_USR', usr: usr }),
    loggedIn: () => dispatch({ type: 'SET_lOGGED' })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
