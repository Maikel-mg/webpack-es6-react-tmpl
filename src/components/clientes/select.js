import React, {Component} from 'react';
import Axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import ClientesServicio from './../../services/clientes.js'

class SelectClientes extends Component{
    constructor () {
        super();
        this.state = {
            multi: false,
			value: {},
        }
    }

	onChange (value) {
		this.setState({
			value: value,
		});
	}
	switchToMulti () {
		this.setState({
			multi: true,
			value: [this.state.value],
		});
	}
	switchToSingle () {
		this.setState({
			multi: false,
			value: this.state.value[0],
		});
	}
	 getClientes () {
        return ClientesServicio
        .getClientes()
        .then( (response) => {
            console.log('CARGA DE CLIENTES', response);
            return response.data;
        })
        .then((data) => {
            return { options : data};
        });
    }
	render () {
		return (
			<div className="section">
				<Select.Async 
                    multi={this.state.multi} 
                    value={this.state.value} 
                    onChange={this.onChange.bind(this)} 
                    valueKey="id" 
                    labelKey="nombre" 
                    loadOptions={this.getClientes} />
			</div>
		);
	}
}

SelectClientes.propTypes = {
    label: React.PropTypes.string
}

module.exports = SelectClientes;