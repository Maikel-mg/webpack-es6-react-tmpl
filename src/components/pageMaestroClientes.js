import React, {Component, PropTypes} from "react";
import { AgGridReact } from "ag-grid-react";

import axios from 'axios';
import { ContextMenu, MenuItem, ContextMenuLayer } from "react-contextmenu"; 

import DialogCliente from './dialogCliente.js';
import DialogProyectos from './dialogoProyectos.js';

import ClientesServicio from './../services/clientes.js'



class PageMaestroClientes extends Component {
    constructor(){

        console.log('ClientesServicio', ClientesServicio);

        super();
        this.onGridReady = this.onGridReady.bind(this);
        this.getClientes = this.getClientes.bind(this);
        this.createCliente = this.createCliente.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.logError = this.logError.bind(this);

        this.state = {
             columnDefs : [
                {
                    headerName : 'ID',
                    field : 'id',
                    width : 100,
                    hide : true 
                },
                {
                    headerName : 'Cliente',
                    field : 'nombre',
                    filter : 'text',
                    width : 200, 
                    editable : true,
                    cellEditor : 'text',
                    filterParams: {newRowsAction: 'keep'},
                    sort: 'asc'
                }
            ],
            datos : []
        };
    }
    
    render() {
            return (
                <div className="pageResumenMensual">
                    <div className="pageHeader row">
                        <div className="col-md-10">
                            <h2><i className="fa fa-table"></i>Maestro de clientes</h2>
                        </div>
                        <div className="col-md-2">
                            <input type="button" className="btn btn-success" value="Añadir" style={{marginTop : '10px'}} onClick={this.onBtnAñadirClick.bind(this)} />
                            <input type="button" className="btn btn-info" value="Load" style={{marginTop : '10px'}} onClick={this.getClientes.bind(this)} />
                        </div>
                    </div>
                    <div className="gridResumenMensual row">
                        
                        <div className="col-md-12" style={{"margin": "0px"}}>
                            <div className="ag-fresh" style={{height : '800px'}}>
                                <AgGridReact
                                    ref = "gridClientes"
                                    onGridReady = {this.onGridReady}
                                    onRowValueChanged = {this.onRowValueChanged}
                                    onCellContextMenu = {this.onCellContextMenu}
                                    columnDefs={this.state.columnDefs}
                                    rowData={this.state.datos}
                                    rowHeight="30"
                                    enableFilter = {true}
                                    editType  = "fullRow"
                                />
                            </div>
                        </div>
                    </div>
                    <DialogCliente ref="dialogoCliente" onSave={this.createCliente} /> 
                    <DialogProyectos ref="dialogoProyecto" onSave={this.createCliente} />
                </div>
            );
    }
     // EVENTOS
    onGridReady(params) {
        this.api = params.api;
        this.columnApi = params.columnApi;
    }

    onCellContextMenu (params) {

        params.event.stopPropagation();
        params.event.preventDefault();

        alert('onCellContextMenu');
        console.log('onCellContextMenu', arguments);

    }
    
    componentDidMount () {
        this.getClientes();
    }
    
    onRowValueChanged (params) {
        console.log('onRowValueChanged', params);
    }

    onBtnAñadirClick () {
        this.refs.dialogoProyecto.open();
    }

    getClientes () {
        ClientesServicio
        .getClientes()
        .then(this.refreshData.bind(this))
        .catch(this.logError.bind(this));
    }

    createCliente (data) {
        ClientesServicio
        .createCliente(data)
        .then(this.refreshData.bind(this))
        .catch(this.logError.bind(this));
    }

    refreshData (response) {
        this.setState({
            datos: response.data
        });
    }

    logError (error) {
        console.log('ERROR IN REQUEST', error);
    }
}

export default PageMaestroClientes;