import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Button, FormGroup, FormControl } from "react-bootstrap";

class ClientRegister extends Component {
  constructor() {
    super();
    this.state = {
      rfc: '',
      password: '',
      nombre: '',
      apellidoMaterno: '',
      apellidoPaterno: '',
      curp: '',
      redirectTo: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //Metodo para hacer el double binding
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const datos = {
      id: this.state.rfc,
      user:{
        nombres: this.state.nombre,
        apellidoPaterno: this.state.apellidoPaterno,
        apellidoMaterno: this.state.apellidoMaterno,
        rfc: this.state.rfc,
        curp: this.state.curp,
        password: this.state.password,
      },
      header: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    }

    axios.post('https://el-equipo-perro.mybluemix.net/client/register', datos)
      .then(response => {
        console.log(response.data)
        if (response.data.status === 200) {
          alert("SE LOGRO!!!!!")
          this.setState({
            redirectTo: '/'
          })
        }
        else {
          this.setState({
            rfc: '',
            password: ''
          })
        }
      })
      .catch(error => {
        console.log("No se pudo registrar al usuario")
        console.error(error);
      });
  }

  render() {
    if (this.state.redirectTo) {
      console.log("A punto de redirigir")
      return <Redirect to={{ pathname: '/'}} />;
    } else {
      return (
        <div className="login">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="rfc" className="form-group" >
              <FormControl
                name="nombre"
                value={this.state.nombre}
                onChange={this.handleChange}
                placeholder="Nombre"
                className="box"
              />
              <FormControl
                name="apellidoPaterno"
                value={this.state.apellidoPaterno}
                onChange={this.handleChange}
                placeholder="Apellido paterno"
                className="box"
              />
              <FormControl
                name="apellidoMaterno"
                value={this.state.apellidoMaterno}
                onChange={this.handleChange}
                placeholder="Apellido materno"
                className="box"
              />

              <FormControl
                name="rfc"
                value={this.state.email}
                onChange={this.handleChange}
                placeholder="RFC"
                className="box"
              />
              <FormControl
                name="curp"
                value={this.state.curp}
                onChange={this.handleChange}
                placeholder="CURP"
                className="box"
              />
            </FormGroup>
            <FormGroup controlId="password">
              <FormControl
                name="password"
                className="box"
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
                placeholder="Contraseña"
              />
            </FormGroup>

            <Button
              className="boton"
              bsStyle="primary"
              bsSize="large"
              type="submit"
              onClick={this.handleSubmit}
            >
              Registrar
          </Button>
          </form>
        </div>
      );
    }
  }
}

export default ClientRegister;
