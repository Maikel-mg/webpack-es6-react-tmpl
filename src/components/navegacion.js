import React, {Component} from 'react';

class Navegacion extends Component {
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <ul className="nav navbar-nav">
                        <li className="active"><a href="#">Resumen Mensual</a></li>
                        <li><a href="#">Top 10 Clientes</a></li>
                    </ul>
                </div>
            </nav> 
        );
    }
}

export default Navegacion;