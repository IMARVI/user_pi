import React from 'react';
import "./empresa.css";
import {Grid, Row, Button} from 'react-bootstrap'
import image from '../logo.svg'

const empresa = (props) => {

  if (props.estatus){
    return (
      <div className='bloque'>
        <Grid>
          <Row>

              <div className='logo'>
                <img alt="" src={props.logo} height="60px" width="60px" />
              </div>

              <div className='datosEmpresa'>
                <p>{props.nombre},
                Inicio: {props.fi}
                </p>
                <Button onClick={props.click} bsStyle="success">Activado</Button>
              </div>

          </Row>
        </Grid>
      </div>
    )
  }
  else
  {
    return (
      <div className='bloque'>
        <Grid>
          <Row>
              <div className='logo'>
                <img alt="" src={props.logo} height="60px" width="60px" />
              </div>
              <div className='datosEmpresa'>
                <p>{props.nombre},
                Inicio: {props.fi}
                </p>
                <Button onClick={props.click} bsStyle="danger">Desactivado</Button>
              </div>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default empresa;
