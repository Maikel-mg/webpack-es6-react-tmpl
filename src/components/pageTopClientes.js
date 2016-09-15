import React, {Component, PropTypes} from 'react';

import GridTopClientes from './gridTopClientes';
import GraficoTop10Clientes from './graficoTop10Clientes';

import dataHelper from './../data/dataHelper';

class PageTopClientes extends Component {
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
                    <div className="col-md-2 col-md-offset-1" style={{"marginTop": "15px"}}>
                        <GridTopClientes ref="gridTopClientes" data={dataHelper.getTopClientes(this.context.data, 10)} />
                    </div>
                    <div className="col-md-8 col-md-offset-1" style={{"marginTop": "15px"}}>
                        <GraficoTop10Clientes ref="graficoTop10Clientes" data={dataHelper.getTopClientes(this.context.data, 10)} />
                    </div>
                </div>                  
            </div>
        );
    }
}

PageTopClientes.contextTypes = {
    data : PropTypes.array.isRequired
};

export default PageTopClientes;

