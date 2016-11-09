import React, {Component, PropTypes} from "react";

import GridResumenMensual from './gridResumenMensual';
import EstadisticasService from './../services/estadisticas.js';

class PageResumenMensual extends Component {
    constructor(){
        super();
        
        console.log('EstadisticasService', EstadisticasService);

        this.state = {
            datos : []
        };
    }
    componentWillMount () {
        EstadisticasService
            .resumenMensual(2016)
            .then((ResumenMensual) => {
                console.log(ResumenMensual);
                this.setState({
                    datos : ResumenMensual.data
                });
            })
            .catch((error) => {
                console.log('ERROR', error)
            });
    }



    render() {
        if (this.state.datos.length > 0) {
            return (
                <div className="pageResumenMensual">
                    <div className="pageHeader row">
                        <div className="col-md-11">
                            <h2><i className="fa fa-table"></i>Resumen Mensual</h2>
                        </div>
                    </div>
                    <div className="gridResumenMensual row">
                        <div className="col-md-12" style={{"marginTop": "15px"}}>
                            <GridResumenMensual ref="gridResumenMensual" dataResumenMensual={this.state.datos} />
                        </div>
                    </div> 
                </div>
            );
        } else {
            return (
                <div className="pageResumenMensual">
                    <div className="pageHeader row">
                        <div className="col-md-11">
                            <h2><i className="fa fa-table"></i>Resumen Mensual</h2>
                        </div>
                    </div>
                    <div className="gridResumenMensual row">
                        <div className="col-md-12" style={{"marginTop": "15px"}}>
                           <h2 className="text-center"><i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i> Cargando Datos Resumen Mensual</h2>
                        </div>
                    </div> 
                </div>
            );
        }
    }
}

export default PageResumenMensual;