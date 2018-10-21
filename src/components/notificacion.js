import React from 'react';
import "./notificacion.css";
import {Grid, Row, Button} from 'react-bootstrap'

const notificacion = (props) => {
  if (!props.done){
    return (
      <div className='bloque'>
        <Grid>
          <Row>
              <div className='logo'>
                <img alt="" src={props.logo} height="60px" width="60px" />
              </div>
            
              <div className='datosEmpresa'>
                <p>{props.nombre}</p>
                <Button onClick={props.click} bsStyle="warning">Agregar</Button>
                <Button onClick={props.eliminar} bsStyle="danger">Eliminar</Button>
              </div>
          </Row>
        </Grid>
      </div>
    )
  }else{
    return(
      <div></div>
    )
  }
}

export default notificacion;