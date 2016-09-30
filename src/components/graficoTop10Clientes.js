import React, {Component, PropTypes} from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'; 

class GraficoTop10Clientes extends Component {
    render() {
        return (
            <div className="grafico">
                <div className="grafico-content">
                    <BarChart width={1000} height={500} data={this.props.data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <XAxis dataKey="cliente"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="2 2"/>
                        <Tooltip/>
                        <Bar dataKey="ingresado" fill="#4caf50" label/>
                    </BarChart>
                </div>
            </div>
        );
    }
}

GraficoTop10Clientes.propTypes = {
     data : PropTypes.array.isRequired
};



export default GraficoTop10Clientes;