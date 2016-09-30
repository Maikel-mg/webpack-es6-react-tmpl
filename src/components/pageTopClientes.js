import React, {Component, PropTypes} from 'react';

import GridTopClientes from './gridTopClientes';
import GraficoTop10Clientes from './graficoTop10Clientes';

class PageTopClientes extends Component {
     constructor(){
        super();

        this.state = {
            datos : []
        };
    }
    componentWillMount () {
        fetch("http://localhost:60771/api/estadisticas/TopClientes/2016/10")
            .then((response) => {
            return response.json()
        })
        .then((TopClientes) => {
            console.log('TOPCLIENTES ', TopClientes);
            this.setState({
                datos : TopClientes
            });
        })
        .catch((error) => {
            console.log('ERROR', error)
        });
    }
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
                        <GridTopClientes ref="gridTopClientes" data={this.state.datos} />
                    </div>
                    <div className="col-md-8 col-md-offset-1" style={{"marginTop": "15px"}}>
                        <GraficoTop10Clientes ref="graficoTop10Clientes" data={this.state.datos} />
                    </div>
                </div>                  
            </div>
        );
    }
}

export default PageTopClientes;

