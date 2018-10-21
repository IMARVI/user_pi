import React, { Component } from "react";
import Empresa from '../../components/empresa'
import imagen from '../../recursos/imagenes/adx-1.svg'


class UserHome extends Component {
    constructor() {
        super();
        this.state = {
            datosUs:{
                empresas:[
                    {
                        logo: imagen,
                        nombre: "Starbucks",
                        fi : "10/09/2018",
                        fv : "10/09/2019",
                        estatus : true
                    },
                    {
                        logo: imagen,
                        nombre: "ITESM",
                        fi : "10/09/2018",
                        fv : "10/09/2019",
                        estatus : true
                    },
                    {
                        logo: imagen,
                        nombre: "Netflix",
                        fi : "10/09/2018",
                        fv : "10/09/2019",
                        estatus : false
                    },
                ]
            }
        };
    }

    switchEstadoHandler = (num) => {
        const aux = [...this.state.datosUs.empresas]
        aux[num].estatus = !this.state.datosUs.empresas[num].estatus
        this.setState({empresas : aux})
    }

    render() {
        return (
            <div>
                {this.state.datosUs.empresas.map((empresa, index) => {
                    return <Empresa 
                    key = {index.toString()}
                    logo={empresa.logo} 
                    nombre={empresa.nombre} 
                    fi={empresa.fi} 
                    fv={empresa.fv} 
                    estatus={empresa.estatus}
                    click = {this.switchEstadoHandler.bind(this,index)}/>
                })}
            </div>
        );
    }
}
export default UserHome;