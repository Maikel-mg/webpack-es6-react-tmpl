import React, {Component, PropTypes} from 'react';

import GraficoComparativa from './graficoComparativa';

class PageComparativaPresupuesto extends Component {
     constructor(){
        super();

        this.state = {
            datos : []
        };
    }
    componentWillMount () {
        fetch("http://localhost:60771/api/estadisticas/ComparativaIngresadoProyeccion/2016")
            .then((response) => {
            return response.json()
        })
        .then((Comparativa) => {
            this.setState({
                datos : Comparativa
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
                         <i className="fa fa-bar-chart"></i> COMPARATIVA PRESUPUESTO PROYECCION
                         </h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8 col-md-offset-1" style={{"marginTop": "15px"}}>
                        <GraficoComparativa ref="graficoComparativa" data={this.state.datos} />
                    </div>
                </div>                  
            </div>
        );
    }
}

export default PageComparativaPresupuesto;

