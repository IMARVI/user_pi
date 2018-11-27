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

    cargarEmpresas() {
      axios.get('http://el-equipo-perro.mybluemix.net/client/' + 'FORH941027ER3' + '/companies')
        .then(response => {
          console.log(response)
          alert(response.data.payload.accepted)
          alert(this.props.usr)
          if (response.status === 200) {

            const ac = response.data.payload.accepted
            const re = response.data.payload.rejected
            const wa = response.data.payload.waiting

            var i;
            var emp = [];
            for(i = 0; i < ac.length; i++){
              ac[i].estatus = true;
              emp.push(ac[i]);
            }
            for(i = 0; i < re.length; i++){
              re[i].estatus = false;
              emp.push(re[i]);
            }

            this.setState({
              accepted: ac,
              rejected: re,
              waiting: wa,
              //empresas: emp
            })


            this.setState({
              usuariosRFC: ac.concat(re, wa)
            })


            console.log(this.state)

            //this.mapearUsuarios()
          }
        })
        .catch(error => {
          console.log("Algo ocurrio en la llamada de buscar compañias")
          console.error(error);
        });
    }

    addEmpresaHandler = (num) => {
        axios.post('http://el-equipo-perro.mybluemix.net/client/aprove/company', {
          client: "FORH941027ER3",
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
        aux[num].estatus = true
        aux[num].done = true
        // Removemos la seleccion
        aux.splice(num, 1)
        this.setState({ waiting: aux })
    }

    eliminarEmpresaHandler = (num) => {

        axios.post('http://el-equipo-perro.mybluemix.net/client/aprove/company', {
          client: "FORH941027ER3",
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
                    return <Notificacion
                        key={index.toString()}
                        logo={imagen}
                        nombre={empresa.company}
                        estatus={empresa.estatus}
                        done = {empresa.done}
                        click={this.addEmpresaHandler.bind(this, index)}
                        eliminar={this.eliminarEmpresaHandler.bind(this, index)}
                        />
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
