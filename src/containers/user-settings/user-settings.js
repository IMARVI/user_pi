import React, { Component } from "react";
import { Image } from 'react-bootstrap'
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import image from '../../recursos/imagenes/profile.png'
import "./user-settings.css"


class UserSettings extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            redirectTo: null,
            datosUs: {
                nombre: "Isaias Martinez V",
                permisos: "Administrador",
                password: "***********",
                login: "10-09-2018"
            }
        };
    }

    render() {
        return (
            <div className="bloque">
                <div className="imagen" >
                    <Image src={image} width='200px' responsive />
                </div>
                <div className="datosUsr">
                    <p>Nombre: {this.state.datosUs.nombre}</p>
                    <p>Permisos: {this.state.datosUs.permisos}</p>
                    <p>Password: {this.state.datosUs.password}</p>
                    <p>Last-login: {this.state.datosUs.login}</p>
                </div>
            </div>
        );
    }
}
export default UserSettings;