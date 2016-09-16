import React, {Component, PropTypes} from 'react';

import GraficoComparativa from './graficoComparativa';

import dataHelper from './../data/dataHelper';

class PageComparativaPresupuesto extends Component {
    render() {
        return (
            <div className="pageTopClientes">
                <div className="pageHeader row">
                    <div className="col-md-11">
                        <h2>
                         <i className="fa fa-bar-chart"></i> INFORME TOP 10 CLIENTES POR HORAS INGRESADAS
                         </h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8 col-md-offset-1" style={{"marginTop": "15px"}}>
                        <GraficoComparativa ref="graficoComparativa" data={dataHelper.datosProyeccion(this.context.data)} />
                    </div>
                </div>                  
            </div>
        );
    }
}

PageComparativaPresupuesto.contextTypes = {
    data : PropTypes.array.isRequired
};

export default PageComparativaPresupuesto;

