import React, { Component } from "react";

import { Image } from 'react-bootstrap'
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import image from '../../recursos/imagenes/profile.png'
import "./user-settings.css"
import { connect } from 'react-redux'
import axios from 'axios'

class UserSettings extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            redirectTo: null,
            datosUs: {
                nombre: "",
                permisos: "",
                password: "",
                login: "",
                edad: "",
                genero: "",
                curp: ""
            }
        };
    }

    componentDidMount() {
        //Aqui mandamos a cargar el estado desde redux
        console.log("hola")
        this.cargarDatosUsuario()
    }

    cargarDatosUsuario(){
        const datos = {
            header : {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json'
            }
          }

        axios.get('http://el-equipo-perro.mybluemix.net/client/' + this.props.usr)
            .then(response => {
                console.log(response)
                if (response.status === 200) {

                    let nom = response.data.payload.nombres + ' ' + response.data.payload.apellidoMaterno + ' ' + response.data.payload.apellidoPaterno
                    let ed = response.data.payload.edad
                    let gen = response.data.payload.genero
                    let cur = response.data.payload.curp
                    let rf = response.data.payload.rfc

                    this.setState({
                        datosUs: {
                            nombre: nom,
                            permisos: "",
                            login: "",
                            edad: ed,
                            genero: gen,
                            curp: cur,
                            rfc: rf
                        }
                    })

                    console.log(this.state)

                }
            }

        )}

    render() {
        return (
            <div className="bloque">
                <div className="imagen" >
                    <Image src={image} width='200px' responsive />
                </div>
                <div className="datosUsr">
                    <p>Nombre: {this.state.datosUs.nombre}</p>
                    <p>Curp: {this.state.datosUs.curp}</p>
                    <p>Rfc: {this.state.datosUs.rfc}</p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      usr: state.user,
      logged: state.logged,
      usuarios: state.usuariosTodos
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      setUsuarios: (users) => dispatch({ type: 'SET_USUARIOS', usuariosTodos: users }),
    };
  };


export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);
