import React, {Component} from "react";
import ReactDOM from 'react-dom';

import GridJugadores from './gridJugadores';
import SumaValores from './sumaValores';

import Api from './../data/api';


class App extends Component {
    constructor(props){
        super(props);
        this.update = this.update.bind(this);

        var api = new Api();

        console.log('API', api.jugadoresPorPosicion('DF'));

        this.state = {
            jugadores : [],
            sumaValores : 12000
        };
    }

    render() {
        return (
            <div id="appContainer">
                <GridJugadores ref="gridJugadores" onUpdate={this.update}/> 
                <SumaValores ref="sumaValores" suma={this.state.sumaValores} />
                <button onClick={this.onClick.bind(this)}>Maikel</button> 
            </div>
        );
    }

    update(sumaValoresSeleccionados) {
        console.log('THIS  ', this);
        console.log('UPDATE .. ', this.state);
    
        this.setState({
            sumaValores : sumaValoresSeleccionados
        });

        this.refs.sumaValores.setState({suma : sumaValoresSeleccionados});

    }

    onClick() {
        this.refs.gridJugadores.createRow();
    }
}

export default App;  