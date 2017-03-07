import React, { Component } from 'react';
import { AgGridReact } from "ag-grid-react";

import TreeViewClientes from './clientes/treeview.js'
import DialogCliente from './clientes/dialog.js';
import DialogProyectos from './dialogoProyectos.js';

import ClientesServicio from './../services/clientes.js'
import ProyectosServicio from './../services/proyectos.js'


class PageRealizaciones extends Component {
    constructor() {
        super();

        this.getRealizaciones = this.getRealizaciones.bind(this);

        this.state = {
            sidebarVisible: false,
            columnDefs: [
                {
                    headerName: 'ID',
                    field: 'id',
                    width: 100,
                    hide: true
                },
                {
                    headerName: 'idCliente',
                    field: 'idCliente',
                    filter: 'text',
                    width: 100,
                    hide: true

                },
                {
                    headerName: 'idProyecto',
                    field: 'idProyecto',
                    filter: 'text',
                    width: 100,
                    hide: true
                },
                {
                    headerName: 'Cliente',
                    field: 'cliente',
                    filter: 'text',
                    width: 250,
                    suppressNavigable: true,
                    sort: 'asc'
                },
                {
                    headerName: 'Proyecto',
                    field: 'proyecto',
                    filter: 'text',
                    width: 250,
                    suppressNavigable: true,
                    sort: 'asc'
                },
                {
                    headerName: 'Realizaciones',
                    field: 'horas',
                    filter: 'number',
                    editable: true,
                    width: 200
                }
            ],
            datos: [],
            clientes: []
        };
    }

    render() {
        var sidebarClases = "",
            contentClases = "";

        if (this.state.sidebarVisible) {
            sidebarClases = "col-md-2";
            contentClases = "col-md-10";
        } else {
            sidebarClases = "col-md-2 hide";
            contentClases = "col-md-12";
        }
        return (
            <div className="pageResumenMensual">
                <div className="pageHeader row">
                    <div className="col-md-7">
                        <h2 className="pull-left"><i className="fa fa-table"></i>Realizaciones</h2>
                        <input type="button" className="btn btn-sm btn-info" value="Ver Clientes" onClick={this.onBtnVerClientesClik.bind(this)} style={{ marginTop: '10px' }} />
                    </div>
                    <div className="col-md-2">
                        <input type="button" className="btn btn-sm btn-success" value="Crear Cliente" onClick={this.onBtnAñadirClienteClick.bind(this)} style={{ marginTop: '10px' }} />
                        <input type="button" className="btn btn-sm btn-success" value="Crear Proyecto" onClick={this.onBtnAñadirProyectoClick.bind(this)} style={{ marginTop: '10px' }} />
                    </div>
                    <div className="col-md-1">
                        <input type="text" ref="año" className="form-control input-sm" placeholder="AÑO" style={{ marginTop: '10px' }} />
                    </div>
                    <div className="col-md-1">
                        <input type="text" ref="mes" className="form-control input-sm" placeholder="MES" style={{ marginTop: '10px' }} />
                    </div>
                    <div className="col-md-1">
                        <input type="button" className="btn btn-sm btn-success" value="Cargar" onClick={this.onBtnCargarClik.bind(this)} style={{ marginTop: '10px' }} />
                    </div>

                </div>
                <div className="gridResumenMensual row ">

                    <div id="clientesSideBar" className={sidebarClases} style={{ "padding": "0px", height: '600px', }}>
                        <div style={{ "padding": "0px", height: '600px', "overflowY": 'scroll' }}>
                            <TreeViewClientes ref="treeClientes" datos={this.state.clientes} />
                        </div>
                    </div>
                    <div id="gridRealizaciones" className={contentClases} style={{ "padding": "0px" }}>
                        <div className="ag-fresh ag-ipartek" style={{ width: '100%', height: '600px', "margin": "0px", "padding": "0px", fontSize: "13px" }}>
                            <AgGridReact
                                ref="gridRealizaciones"
                                onGridReady={this.onGridReady.bind(this)}
                                columnDefs={this.state.columnDefs}
                                onCellValueChanged={this.onCellValueChanged.bind(this)}
                                rowData={this.state.datos}
                                rowHeight="24"
                                enableFilter={true}
                                editType="fullRow"
                                />
                        </div>
                    </div>
                </div>

                <DialogCliente ref="dialogoCliente" onSave={this.createCliente.bind(this)} /> 
                <DialogProyectos ref="dialogoProyecto" onSave={this.createProyecto.bind(this)}  /> 
            </div>
        );
    }

    onGridReady(params) {
        this.api = params.api;
        this.columnApi = params.columnApi;
    }

    componentDidMount() {
        this.getRealizaciones();
        this.getClientesConProyectos();
    }

    getRealizaciones(año, mes) {
        if(año && mes ) {
            ClientesServicio
            .realizaciones(año, mes)
            .then((response) => {
                this.setState({
                    datos: response.data
                });
                console.log('RESPONSE DATA', response);
            })
            .catch(() => {
                console.log('ERRORES', response);
            });
        }
    }

    getProyectos () {
        ProyectosServicio
        .getProyectos()
        .then((response) => {
            console.log('Proyectos', response);
        })
        .catch((response) => {
            console.log('EROR CARGA PROYECTOS', response);
        });
    }

    getClientesConProyectos() {
        ClientesServicio
            .getClientesConProyectos()
            .then((response) => {
                this.setState({
                    clientes: response.data
                });
                console.log('RESPONSE DATA', response);
            })
            .catch(() => {
                console.log('ERRORES', response);
            });
    }


    onBtnVerClientesClik() {
        this.setState({
            sidebarVisible: !this.state.sidebarVisible
        });
    }

    onBtnAñadirClienteClick () {
        this.refs.dialogoCliente.open();
    }

    onBtnAñadirProyectoClick () {
        this.refs.dialogoProyecto.open();
    }

    createCliente (data) {
        ClientesServicio
        .createCliente(data)
        .then(this.getClientesConProyectos.bind(this))
        .catch((response) => {
            console.log('ERRORES', response);
        });
    }

    createProyecto (data) {

        console.log('CREATE PROYECTO', data);
        
        ProyectosServicio
        .createProyecto(data)
        .then(this.getClientesConProyectos.bind(this))
        .catch((response) => {
            console.log('ERRORES', response);
        });
    }



    onBtnCargarClik() {
        console.log('onBtnCargarClik', {
            'año': this.refs.año.value,
            'mes': this.refs.mes.value
        });

        this.getRealizaciones(this.refs.año.value, this.refs.mes.value);
    }

    onRowValueChanged(params) {
        console.log('onRowValueChanged', params);
    }

    onCellValueChanged(params) {
        console.log('onCellValueChanged', params);

        var node = params.node;
        var oldValue = (params.oldValue) ? params.oldValue.toString().trim() : '';
        var newValue = (params.newValue) ? params.newValue.toString().trim() : '';

        if (oldValue !== newValue) {
            var node = params.node;

            if (node.data.id.trim().length === 0) {
                var nuevo = JSON.parse(JSON.stringify(node.data));

                delete nuevo.id;

                ClientesServicio.
                    createRealizacion(node.data)
                    .then((res) => {
                        node.data.id = res.data;
                        node.data.proyecto = node.data.proyecto + ' ----OK'
                        console.log('OK CREATE', res)
                        this.api.refreshRows([node]);
                    }).catch(
                    () => {
                        console.log('ERROR', arguments)
                    });
            } else {
                ClientesServicio.
                    updateRealizacion(node.data)
                    .then((res) => {
                        node.data.proyecto = node.data.proyecto + ' ----OK'
                        console.log('OK UPDATE', res)
                        this.api.refreshRows([node]);
                    }).catch(
                    () => {
                        console.log('ERROR', arguments)
                    });
            }
        }
        else {
            console.log('NO HAY CAMBIOS');
        }



    }


}

export default PageRealizaciones;
