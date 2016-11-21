import React, {Component, PropTypes} from "react";
import { AgGridReact } from "ag-grid-react";

import axios from 'axios';
import { ContextMenu, MenuItem, ContextMenuLayer } from "react-contextmenu"; 

import DialogCliente from './clientes/dialog.js';
import TreeClientes from './clientes/treeview.js';
import DetailClientes from './clientes/detail.js';
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
                        <div className="col-md-9">
                            <h2><i className="fa fa-table"></i>Maestro de clientes</h2>
                        </div>
                        <div className="col-md-1">
                            <input type="button" className="btn btn-sm btn-success" value="Añadir Cliente" style={{marginTop : '10px'}} onClick={this.onBtnAñadirClick.bind(this)} />
                        </div>
                    </div>
                    <div className="treeview row">
                        <div className="col-md-2" style={{ "marginTop" : "15px" , height : '500px', overflow : 'auto', fontSize :' 10px'}}>
                            <TreeClientes ref="treeviewClientes" data={this.state.datos} onNodeSelected={this.onTreeClientesNodeSelected.bind(this)}/>
                        </div>
                        <div className="col-md-10">
                            <DetailClientes ref="detailClientes"  datos={this.state.clienteSeleccionado}/>
                        </div>
                    </div>
                    <div className="gridResumenMensual row hide">
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

    onTreeClientesNodeSelected (nodo) {
        console.log('Tenemos el nodo' , nodo);
        this.setState({
            clienteSeleccionado : nodo 
        });
    }
    
    componentDidMount () {
        this.getClientesConProyectos();
    }
    
    onRowValueChanged (params) {
        console.log('onRowValueChanged', params);
    }

    onBtnAñadirClick () {
        this.refs.dialogoCliente.open();
    }

    getClientes () {
        ClientesServicio
        .getClientes()
        .then(this.refreshData.bind(this))
        .catch(this.logError.bind(this));
    }

    getClientesConProyectos () {
        ClientesServicio
        .getClientesConProyectos()
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
        //console.log('Refresh', response);
        this.setState({
            datos: response.data
        });
        //this.refs.treeviewClientes.setData(response.data);
        //this.refs.treeviewClientes.setState({data : response.data});
    }

    logError (error) {
        console.log('ERROR IN REQUEST', error);
    }
}

export default PageMaestroClientes;