import React, { Component } from "react";

import Notificacion from '../../components/notificacion'
import imagen from '../../recursos/imagenes/adx-1.svg'
import './user-notifications.css'
import { connect } from 'react-redux'
import axios from 'axios'

class UserNotifications extends Component {
    constructor() {
        super();
        this.state = {
            accepted: [],
            rejected: [],
            waiting: [],
            empresas: [
                {
                    logo: imagen,
                    nombre: "Starbucks",
                    done: false,
                    estatus: false
                },
                {
                    logo: imagen,
                    nombre: "ITESM",
                    done: false,
                    estatus: false
                },
                {
                    logo: imagen,
                    done: false,
                    nombre: "Netflix",
                    estatus: false
                },
            ]

          };
    }

    componentDidMount() {
      //Aqui mandamos a cargar el estado desde redux
      this.cargarEmpresas()
    }

    cargarEmpresas() {
      const datos = {
        header : {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      }
      axios.get('https://el-equipo-perro.mybluemix.net/client/' + this.props.usr + '/companies', datos)
        .then(response => {
          console.log(response)
          if (response.status === 200) {

            let ac = response.data.payload.approved
            let re = response.data.payload.rejected
            let wa = response.data.payload.waiting

            let x = ac.concat(re, wa)

            this.setState({
              accepted: ac,
              rejected: re,
              waiting: wa,
              usuariosRFC: x
              //empresas: emp
            })

            console.log(this.state)

            //this.mapearUsuarios()
          }
        })
        .catch(error => {
          console.log("Algo ocurrio en la pppppppp de buscar compañias")
          console.error(error);
        });
    }

    addEmpresaHandler = (num) => {
        axios.post('https://el-equipo-perro.mybluemix.net/client/aprove/company', {
          client: this.props.usr,
          company: this.state.waiting[num].company,
          aprove: true
        })
        .then(response => {
          console.log("Funciona!")
        })
        .catch(error => {
          console.log("Algo ocurrio actualizando el estado de la compañia")
          console.error(error);
        });

        const aux = [...this.state.waiting]
        aux[num].estatus = true
        aux[num].done = true
        // Removemos la seleccion
        aux.splice(num, 1)
        this.setState({ waiting: aux })
    }

    eliminarEmpresaHandler = (num) => {

        axios.post('https://el-equipo-perro.mybluemix.net/client/aprove/company', {
          client: this.props.usr,
          company: this.state.waiting[num].company,
          aprove: false
        })
        .then(response => {
          console.log("Funciona!")
        })
        .catch(error => {
          console.log("Algo ocurrio actualizando el estado de la compañia")
          console.error(error);
        });

        const aux = [...this.state.waiting]
        aux[num].estatus = false
        aux[num].done = true
        // Removemos la seleccion
        aux.splice(num, 1)
        this.setState({ waiting: aux })
    }

    render() {
        return (
            <div>
                {
                    this.state.waiting.map((empresa, index) => {
                    return (
                      <div>
                        <Notificacion
                            key={index.toString()}
                            logo={imagen}
                            nombre={empresa.company}
                            estatus={empresa.estatus}
                            done = {empresa.done}
                            click={this.addEmpresaHandler.bind(this, index)}
                            eliminar={this.eliminarEmpresaHandler.bind(this, index)}
                            />
                          <hr />
                      </div>

                    )
                })}
            </div>
        );
    }
}

//Con este metodo mandamos a llamar los valores que hay en redux
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

export default connect(mapStateToProps, mapDispatchToProps)(UserNotifications);
