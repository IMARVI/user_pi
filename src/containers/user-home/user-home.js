import React, { Component } from "react";
import Empresa from '../../components/empresa'
import imagen from '../../recursos/imagenes/adx-1.svg'
import { connect } from 'react-redux'
import axios from 'axios'


class UserHome extends Component {
    constructor() {
        super();
        this.state = {
            accepted: [],
            rejected: [],
            waiting: [],
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

        };
    }

    cargarEmpresas() {
      axios.get('http://el-equipo-perro.mybluemix.net/client/' + this.props.usr + '/companies')
        .then(response => {
          console.log(response)
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
              empresas: emp
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

    componentDidMount() {
      //Aqui mandamos a cargar el estado desde redux
      this.cargarEmpresas()
    }

    //Realiza el cambio de estado de una empresa
    switchEstadoHandler = (num) => {
        var isApproved = !this.state.empresas[num].estatus

        axios.post('http://el-equipo-perro.mybluemix.net/client/aprove/company', {
          client: this.props.usr,
          company: this.state.empresas[num].company,
          aprove: isApproved
        })
        .then(response => {
          console.log("Funciona!")
        })
        .catch(error => {
          console.log("Algo ocurrio actualizando el estado de la compañia")
          console.error(error);
        });

        const aux = [...this.state.empresas]
        aux[num].estatus = !this.state.empresas[num].estatus
        this.setState({empresas : aux})

    }

    render() {
        return (
            <div>
                {this.state.empresas.map((empresa, index) => {
                    return <Empresa
                    key = {index.toString()}
                    logo={imagen}
                    nombre={empresa.company}
                    fi={empresa.created}
                    fv={empresa.fv}
                    estatus={empresa.estatus}
                    click = {this.switchEstadoHandler.bind(this,index)}/>
                })}
            </div>
        );
    }
}

//Con este metodo mandamos a llamar los valores que hay en redux
const mapStateToProps = state => {
  return {
    usr: state.user,
    logged: state.logged
  };
};


export default connect(mapStateToProps)(UserHome);
