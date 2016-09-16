import React, {Component} from 'react';
import {Link} from 'react-router';

class Navegacion extends Component {
    render() {
        let estilos = {
            //"color" : "#888"
            "backgroundColor": "#2196f3"
        };

        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={"/"}>    
                        IPARTEK
                    </Link>
                    <ul className="nav navbar-nav">
                        <li>
                            <Link to={"ResumenMensual"} activeStyle={estilos}>    
                                <strong><i className="fa fa-table"></i> Resumen Mensual</strong>
                            </Link>
                        </li>
                        <li>
                            <Link to={"TopClientes"} activeStyle={estilos}>
                                <strong> <i className="fa fa-bar-chart"></i> Top 10 Clientes</strong>
                            </Link>
                        </li>
                         <li>
                            <Link to={"Comparativa"} activeStyle={estilos}>
                                <strong> <i className="fa fa-bar-chart"></i> Comparativa</strong>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav> 
        );
    }
}

export default Navegacion;