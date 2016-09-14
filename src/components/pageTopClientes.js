import React, {Component, PropTypes} from 'react';

import GridTopClientes from './gridTopClientes';
import GraficoTop10Clientes from './graficoTop10Clientes';

class PageTopClientes extends Component {
    render() {
        return (
            <div className="pageTopClientes">
                <div className="row">
                    <div className="col-md-11" style={{"marginTop": "15px"}}>
                        <h2>INFORME TOP 10 CLIENTES POR HORAS INGRESADAS</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2 col-md-offset-1" style={{"marginTop": "15px"}}>
                        <GridTopClientes ref="gridTopClientes" data={this.props.data} />
                    </div>
                    <div className="col-md-8 col-md-offset-1" style={{"marginTop": "15px"}}>
                        <GraficoTop10Clientes ref="graficoTop10Clientes" data={this.props.data} />
                    </div>
                </div>                  
            </div>
        );
    }
}

PageTopClientes.propTypes = {
    data : PropTypes.array.isRequired
};

export default PageTopClientes;

