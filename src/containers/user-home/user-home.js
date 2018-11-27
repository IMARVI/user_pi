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
            ]

        };
    }

    cargarEmpresas() {
      axios.get('https://el-equipo-perro.mybluemix.net/client/' + this.props.usr + '/companies')
        .then(response => {
          console.log(response)
          if (response.status === 200) {

            let ac = response.data.payload.approved
            let re = response.data.payload.rejected
            let wa = response.data.payload.waiting

            var i;
            var emp = [];

            if(ac != null){
              for(i = 0; i < ac.length; i++){
                ac[i].estatus = true;
                emp.push(ac[i]);
              }
            }

            if(re != null){
              for(i = 0; i < re.length; i++){
                re[i].estatus = false;
                emp.push(re[i]);
              }
            }



            this.setState({
              accepted: ac,
              rejected: re,
              waiting: wa,
              empresas: emp
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

        axios.post('https://el-equipo-perro.mybluemix.net/client/aprove/company', {
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
                    return (
                      <div>
                        <Empresa
                        key = {index.toString()}
                        logo={imagen}
                        nombre={empresa.company}
                        fi={empresa.created}
                        fv={empresa.fv}
                        estatus={empresa.estatus}
                        click = {this.switchEstadoHandler.bind(this,index)}/><hr />
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


export default connect(mapStateToProps, mapDispatchToProps)(UserHome);
