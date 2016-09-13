import React, {Component} from "react";
import ReactDOM from 'react-dom';

import GridResumenMensual from './gridResumenMensual';

import Api from './../data/api';
import dataResumenMensual from "./../data/resumenMensual.js";


class App extends Component {
    constructor(props){
        super(props);
        var api = new Api();

        this.state = {
            clientes : dataResumenMensual,
            mesesConResultado : 7,
            mesesAProyectar : 5
        };
    }

    render() {
        return (
            <div className="appContainer">
              <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                    </div>
                    <ul className="nav navbar-nav">
                        <li className="active"><a href="#">Resumen Mensual</a></li>
                        <li><a href="#">Top 10 Clientes</a></li>
                    </ul>
                </div>
            </nav>
                <div id="appContainer" className="container-fluid">
                    <div className="row">
                        <div className="col-md-12" style={{"marginTop": "15px"}}>
                            <GridResumenMensual ref="gridResumenMensual" dataResumenMensual={this.state.clientes} />
                        </div>
                    </div> 
                </div>
            </div> 
            
        );
    }
}

export default App;  