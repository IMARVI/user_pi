import React, { Component } from "react";

import Notificacion from '../../components/notificacion'
import imagen from '../../recursos/imagenes/adx-1.svg'
import './user-notifications.css'


class UserNotifications extends Component {
    constructor() {
        super();
        this.state = {
            datosUs: {
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
            }
        };
    }

    addEmpresaHandler = (num) => {
        const aux = [...this.state.datosUs.empresas]
        aux[num].estatus = true
        aux[num].done = true
        // Removemos la seleccion
        aux.splice(num, 1)
        this.setState({ empresas: aux })
    }

    eliminarEmpresaHandler = (num) => {
        const aux = [...this.state.datosUs.empresas]
        aux[num].estatus = false
        aux[num].done = true
        // Removemos la seleccion
        aux.splice(num, 1)
        this.setState({ empresas: aux })
    }

    render() {
        return (
            <div>
                {
                    this.state.datosUs.empresas.map((empresa, index) => {
                    return <Notificacion
                        key={index.toString()}
                        logo={empresa.logo}
                        nombre={empresa.nombre}
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
export default UserNotifications;