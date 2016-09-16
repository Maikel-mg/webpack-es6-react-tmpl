import React, {Component, PropTypes} from 'react';
import {XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line} from 'recharts'; 

class GraficoComparativa extends Component {
    render() {
        return (
            <div className="grafico">
                <div className="grafico-content">
                    <LineChart width="100%" height={500} data={this.props.data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <XAxis dataKey="mes"/>
                        <YAxis />
                        <CartesianGrid strokeDasharray="2 2"/>
                        <Tooltip/>
                        <Legend verticalAlign="top" height={75} />
                        <Line type="monotone" dataKey="presupuesto" stroke="#8884d8" activeDot={{r: 8}}/>
                        <Line type="monotone" dataKey="proyeccion" stroke="#82ca9d"  activeDot={{r: 8}}/>
                    </LineChart>
                </div>
            </div>
        );
    }
}

GraficoComparativa.propTypes = {
     data : PropTypes.array.isRequired
};



export default GraficoComparativa;