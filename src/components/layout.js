import React, {Component} from 'react';

import Navegacion from './navegacion';

import dataHelper from './../data/dataHelper';

const MESES_CON_RESULTADO = 7;
const MESES_A_PROYECTAR = 5;

class Layout extends Component {
    constructor(props){
        super(props);

        this.state = {
            clientes : []
        };

        console.log('TOTALES', dataHelper.datosProyeccion(dataHelper.procesarDatos(MESES_CON_RESULTADO, MESES_A_PROYECTAR)));
    }
    componentDidMount () {
        this.setState({
            clientes : dataHelper.procesarDatos(MESES_CON_RESULTADO, MESES_A_PROYECTAR)
        });
    }

    getChildContext() {
        return {
            data: this.state.clientes
        };
    }
    

    render() {
        return (
             <div className="appContainer">
                <Navegacion /> 
                <div className="container-fluid">
                    {this.props.children}
                </div>
            </div> 
        );
    }
}

Layout.childContextTypes = {
    data: React.PropTypes.array
};

export default Layout;