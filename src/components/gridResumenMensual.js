import React, {Component} from "react";
import { AgGridReact } from "ag-grid-react";

import numeral from "numeral";

class gridResumenMensual extends Component {
    constructor(props) {
        super(props);
        this.onGridReady = this.onGridReady.bind(this);

        this.state = {
            mesesConResultado : 7,
            mesesAProyectar : 12-7,

            rowSelection : 'multiple',
            enableFilter : true,
            enableSorting : true,
            enableColResize : true,
            quickFilterText: null,
            showGrid: true,
            showToolPanel: false,
            columnDefs: [
                {
                    headerName: "GENERAL", 
                    children : [
                        {   
                            headerName: "Cliente", 
                            field: "cliente", 
                            width: 150, 
                            pinned: 'left',
                            filter : "text", 
                            cellStyle : this.clienteStyle 
                        },
                        {
                            headerName: "Notas",   
                            field: "descripcion", 
                            width: 150, 
                            pinned: 'left', 
                            filter : "text"
                        },
                    ]
                },
                {
                    headerName: "PRESUPUESTADO",
                    children : [
                        {
                            headerName: "2016", 
                            field: "presupuestado",
                            width: 100, 
                            pinned: 'left', 
                            filter : "number", 
                            cellStyle : {
                                "text-align" : "right"
                            }, 
                            cellRenderer: this.numberCellRenderer 
                        },
                        {
                            headerName: "2015", 
                            columnGroupShow: 'open', 
                            width: 100, 
                            pinned: 'left', 
                            filter : "number",
                            cellStyle : {
                                "text-align" : "right"
                            }, 
                            cellRenderer: this.numberCellRenderer 
                        },
                        {
                            headerName: "2014",
                            columnGroupShow: 'open', 
                            width: 100, 
                            pinned: 'left', 
                            filter : "number", 
                            cellStyle : {
                                "text-align" : "right"
                            }, 
                            cellRenderer: this.numberCellRenderer 
                        },
                        {
                            headerName: "2013",
                            columnGroupShow: 'open', 
                            width: 100, 
                            pinned: 'left', 
                            filter : "number",
                            cellStyle : {
                                "text-align" : "right"
                            }, 
                            cellRenderer: this.numberCellRenderer 
                        },
                        {
                            headerName: "2012",
                            columnGroupShow: 'open', 
                            width: 100, 
                            pinned: 'left', 
                            filter : "number", 
                            cellStyle : {
                                "text-align" : "right"
                            }, 
                            cellRenderer: this.numberCellRenderer },
                    ]
                },
                {
                    headerName: "INGRESADO",
                    children : [
                        {
                            headerName: "Actual",
                            headerTooltip:"Ingresado hasta el momento",
                            field : "ingresadoTotal", 
                            filter : "number", 
                            width: 80, 
                            pinned: 'left',  
                            cellStyle : {"text-align" : "right"}, 
                            cellRenderer: this.numberCellRenderer },
                        {
                            headerName: "Media Mensual", 
                            headerTooltip:"Ingreso Medio Mensual",
                            field : "ingresadoMediaMensual", 
                            filter : "number", 
                            width: 80, 
                            pinned: 'left', 
                            cellStyle : {"text-align" : "right" }, 
                            cellRenderer: this.numberCellRenderer 
                        },
                    ]
                },
                {
                    headerName: "CALCULOS", 
                    children : [
                        {
                            headerName: "Proyeccion", 
                            field : "proyeccion",
                            filter : "number", 
                            width: 100, 
                            pinned: 'left',  
                            cellStyle : {"text-align" : "right"}, 
                            cellRenderer: this.numberCellRenderer 
                        },
                        {
                            colId : 'DesvIngPre', 
                            field : 'desviacionIngresadoPresupuestado',
                            headerName: "Desviación Ingresado/Presupuestado", 
                            filter : "number", 
                            width: 100, 
                            pinned: 'left',  
                            cellStyle : this.desviacionIngresadoStyle, 
                            cellRenderer: this.numberCellRenderer 
                        },
                        {
                            colId : 'DesvProPre', 
                            field : 'desviacionProyeccionPresupuestado',
                            headerName: "Desviación Proyeccion/Presupuesto",  
                            filter : "number", 
                            width: 100, 
                            pinned: 'left', 
                            cellStyle : this.desviacionProyeccionStyle, 
                            cellRenderer: this.numberCellRenderer 
                        },
                    ]
                },
                {
                    headerName: "MESES", 
                    children : [
                        {headerName: "ENE", field: "ingresado.enero", width: 75, cellStyle : {"text-align" : "right"}, cellRenderer: this.numberCellRenderer },
                        {headerName: "FEB", field: "ingresado.febrero", width: 75, cellStyle : {"text-align" : "right"}, cellRenderer: this.numberCellRenderer },
                        {headerName: "MAR", field: "ingresado.marzo", width: 75, cellStyle : {"text-align" : "right"}, cellRenderer: this.numberCellRenderer },
                        {headerName: "ABR", field: "ingresado.abril", width: 75, cellStyle : {"text-align" : "right"}, cellRenderer: this.numberCellRenderer },
                        {headerName: "MAY", field: "ingresado.mayo", width: 75, cellStyle : {"text-align" : "right"}, cellRenderer: this.numberCellRenderer },
                        {headerName: "JUN", field: "ingresado.junio", width: 75, cellStyle : {"text-align" : "right"}, cellRenderer: this.numberCellRenderer },
                        {headerName: "JUL", field: "ingresado.julio", width: 75, editable: true,  cellStyle : {"text-align" : "right"}, cellRenderer: this.numberCellRenderer },
                        {headerName: "AGO", field: "ingresado.agosto", width: 75, cellStyle : {"text-align" : "right"}, cellRenderer: this.numberCellRenderer },
                        {headerName: "SEP", field: "ingresado.septiembre", width: 75, cellStyle : {"text-align" : "right"}, cellRenderer: this.numberCellRenderer },
                        {headerName: "OCT", field: "ingresado.octubre", width: 75, cellStyle : {"text-align" : "right"}, cellRenderer: this.numberCellRenderer },
                        {headerName: "NOV", field: "ingresado.noviembre", width: 75, cellStyle : {"text-align" : "right"}, cellRenderer: this.numberCellRenderer },
                        {headerName: "DIC", field: "ingresado.diciembre", width: 75, cellStyle : {"text-align" : "right"}, cellRenderer: this.numberCellRenderer },
                    ]
                }
            ],
            rowData: props.dataResumenMensual,
            floatingBottomRowData : this.getBottomData(props.dataResumenMensual)
        };        
    }

    render() {
        return (
            <div style={{height: '80%', fontSize : "12px"}} className="ag-fresh">
                <AgGridReact
                    onGridReady = {this.onGridReady}
                    rowSelection = {this.state.rowSelection}
                    showToolPanel={this.state.showToolPanel}
                    quickFilterText={this.state.quickFilterText}
                    columnDefs={this.state.columnDefs}
                    rowData={this.props.dataResumenMensual}
                    floatingBottomRowData={this.getBottomData(this.props.dataResumenMensual)}
                    enableColResize = {this.state.enableColResize}
                    enableSorting= {this.state.enableSorting}
                    enableFilter = {this.state.enableFilter}
                    rowHeight="20"
                />
            </div>
        );
    }
    // EVENTOS
    onGridReady(params) {
        this.api = params.api;
        this.columnApi = params.columnApi;
    }
    //FUNCIONES 
    getBottomData (data) {
        let newData = [{
            presupuestado : data.map(function (fila) { return fila.presupuestado; }).reduce((a, b) => a + b, 0),
            ingresadoTotal : data.map(function (fila) { return fila.ingresadoTotal; }).reduce((a, b) => a + b, 0),
            ingresadoMediaMensual : data.map(function (fila) { return fila.ingresadoMediaMensual; }).reduce((a, b) => a + b, 0),
            proyeccion : data.map(function (fila) { return fila.proyeccion; }).reduce((a, b) => a + b, 0),
            desviacionIngresadoPresupuestado : data.map(function (fila) { return fila.desviacionIngresadoPresupuestado; }).reduce((a, b) => a + b, 0),
            desviacionProyeccionPresupuestado : data.map(function (fila) { return fila.desviacionProyeccionPresupuestado; }).reduce((a, b) => a + b, 0),
            ingresado : {
                enero : data.map(function (fila) { return fila.ingresado.enero; }).reduce((a, b) => a + b, 0),
                febrero : data.map(function (fila) { return fila.ingresado.febrero; }).reduce((a, b) => a + b, 0),
                marzo : data.map(function (fila) { return fila.ingresado.marzo; }).reduce((a, b) => a + b, 0),
                abril : data.map(function (fila) { return fila.ingresado.abril; }).reduce((a, b) => a + b, 0),
                mayo : data.map(function (fila) { return fila.ingresado.mayo; }).reduce((a, b) => a + b, 0),
                junio : data.map(function (fila) { return fila.ingresado.junio; }).reduce((a, b) => a + b, 0),
                julio : data.map(function (fila) { return fila.ingresado.julio; }).reduce((a, b) => a + b, 0),
                agosto : data.map(function (fila) { return fila.ingresado.agosto; }).reduce((a, b) => a + b, 0),
                septiembre : data.map(function (fila) { return fila.ingresado.septiembre; }).reduce((a, b) => a + b, 0),
                octubre : data.map(function (fila) { return fila.ingresado.octubre; }).reduce((a, b) => a + b, 0),
                noviembre : data.map(function (fila) { return fila.ingresado.noviembre; }).reduce((a, b) => a + b, 0),
                diciembre : data.map(function (fila) { return fila.ingresado.diciembre; }).reduce((a, b) => a + b, 0)
            }
        }];

        return newData;
    }
    // ESTILOS Y RENDERERS DEL GRID
    clienteStyle (params) {
        if (params.data.proyeccion - params.data.presupuestado < 0) {
            return {color: "red"};
        }
    }
    desviacionIngresadoStyle (params) {
        if (params.data.desviacionIngresadoPresupuestado > 0) {
            return {textAlign : "right", backgroundColor: '#def7de'};
        } else if (params.data.desviacionIngresadoPresupuestado < 0) {
            return {textAlign : "right", backgroundColor: '#f7dede'};
        } else {
            return {textAlign : "right"};
        }  
    }
    desviacionProyeccionStyle (params) {
        if (params.data.desviacionProyeccionPresupuestado > 0) {
            return {textAlign : "right", backgroundColor: '#def7de'};
        } else if (params.data.desviacionProyeccionPresupuestado < 0) {
            return {textAlign : "right", backgroundColor: '#f7dede'};
        } else {
            return {textAlign : "right"};
        }  
    }
    numberCellRenderer (params) {
        if (params.value === 0) {
            return "--";
        } else {
            return numeral(params.value).format("0,0.00");
        }
    }
}

export default gridResumenMensual;