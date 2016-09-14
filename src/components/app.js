import React, {Component} from "react";

import Navegacion from './navegacion';
import PageTopClientes from './pageTopClientes';
import PageResumenMensual from './pageResumenMensual';

import dataHelper from './../data/dataHelper';

const MESES_CON_RESULTADO = 7;
const MESES_A_PROYECTAR = 5;

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            clientes : []
        };
    }
    componentDidMount () {
        this.setState({
            clientes : dataHelper.procesarDatos(MESES_CON_RESULTADO, MESES_A_PROYECTAR)
        });
    }
    render() {
        return (
            <div className="appContainer">
                <Navegacion /> 
                <div className="container-fluid">
                    <PageResumenMensual data={this.state.clientes} />
                    <PageTopClientes data={dataHelper.getTopClientes(this.state.clientes, 10)}/>
                </div>
            </div> 
        );
    }
}

export default App;  