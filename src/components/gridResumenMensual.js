import React, {Component} from "react";
import { AgGridReact } from "ag-grid-react";

import numeral from "numeral";

class gridResumenMensual extends Component {
    constructor(props, context) {
        super(props, context);
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
                            field: "proyecto", 
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
                        }
                    ]
                },
                {
                    headerName: "INGRESADO",
                    children : [
                        {
                            headerName: "Actual",
                            headerTooltip:"Ingresado hasta el momento",
                            field : "ingresado", 
                            filter : "number", 
                            width: 80, 
                            pinned: 'left',  
                            cellStyle : {"text-align" : "right"}, 
                            cellRenderer: this.numberCellRenderer },
                        {
                            headerName: "Media Mensual", 
                            headerTooltip:"Ingreso Medio Mensual",
                            field : "ingresoMedioMensual", 
                            filter : "number", 
                            width: 80, 
                            pinned: 'left', 
                            cellStyle : {"text-align" : "right" }, 
                            cellRenderer: this.numberCellRenderer 
                        },
                        {
                            headerName: "2015", 
                            field : "ingresadoHace1Año",
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
                            field : "ingresadoHace2Año",
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
                            field : "ingresadoHace3Año",
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
                            field : "ingresadoHace4Año",
                            columnGroupShow: 'open', 
                            width: 100, 
                            pinned: 'left', 
                            filter : "number", 
                            cellStyle : {
                                "text-align" : "right"
                            }, 
                            cellRenderer: this.numberCellRenderer 
                        }
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
                            field : 'desviacionProyectadoPresupuestado',
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
                        {headerName: "ENE", field: "enero", width: 75, cellStyle : {"text-align" : "right"}, cellRenderer: this.numberCellRenderer },
                        {headerName: "FEB", field: "febrero", width: 75, cellStyle : {"text-align" : "right"}, cellRenderer: this.numberCellRenderer },
                        {headerName: "MAR", field: "marzo", width: 75, cellStyle : {"text-align" : "right"}, cellRenderer: this.numberCellRenderer },
                        {headerName: "ABR", field: "abril", width: 75, cellStyle : {"text-align" : "right"}, cellRenderer: this.numberCellRenderer },
                        {headerName: "MAY", field: "mayo", width: 75, cellStyle : {"text-align" : "right"}, cellRenderer: this.numberCellRenderer },
                        {headerName: "JUN", field: "junio", width: 75, cellStyle : {"text-align" : "right"}, cellRenderer: this.numberCellRenderer },
                        {headerName: "JUL", field: "julio", width: 75, editable: true,  cellStyle : {"text-align" : "right"}, cellRenderer: this.numberCellRenderer },
                        {headerName: "AGO", field: "agosto", width: 75, cellStyle : {"text-align" : "right"}, cellRenderer: this.numberCellRenderer },
                        {headerName: "SEP", field: "septiembre", width: 75, cellStyle : {"text-align" : "right"}, cellRenderer: this.numberCellRenderer },
                        {headerName: "OCT", field: "octubre", width: 75, cellStyle : {"text-align" : "right"}, cellRenderer: this.numberCellRenderer },
                        {headerName: "NOV", field: "noviembre", width: 75, cellStyle : {"text-align" : "right"}, cellRenderer: this.numberCellRenderer },
                        {headerName: "DIC", field: "diciembre", width: 75, cellStyle : {"text-align" : "right"}, cellRenderer: this.numberCellRenderer },
                    ]
                }
            ],
            floatingBottomRowData : this.getBottomData(props.dataResumenMensual)
        };        
    }

    render() {
        return (
            <div style={{height: '80%', fontSize : "12px"}} className="ag-fresh ag-ipartek">
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
            ingresado : data.map(function (fila) { return fila.ingresado; }).reduce((a, b) => a + b, 0),
            ingresoMedioMensual : data.map(function (fila) { return fila.ingresoMedioMensual; }).reduce((a, b) => a + b, 0),
            proyeccion : data.map(function (fila) { return fila.proyeccion; }).reduce((a, b) => a + b, 0),
            desviacionIngresadoPresupuestado : data.map(function (fila) { return fila.desviacionIngresadoPresupuestado; }).reduce((a, b) => a + b, 0),
            desviacionProyectadoPresupuestado : data.map(function (fila) { return fila.desviacionProyectadoPresupuestado; }).reduce((a, b) => a + b, 0),
        
            enero : data.map(function (fila) { return fila.enero; }).reduce((a, b) => a + b, 0),
            febrero : data.map(function (fila) { return fila.febrero; }).reduce((a, b) => a + b, 0),
            marzo : data.map(function (fila) { return fila.marzo; }).reduce((a, b) => a + b, 0),
            abril : data.map(function (fila) { return fila.abril; }).reduce((a, b) => a + b, 0),
            mayo : data.map(function (fila) { return fila.mayo; }).reduce((a, b) => a + b, 0),
            junio : data.map(function (fila) { return fila.junio; }).reduce((a, b) => a + b, 0),
            julio : data.map(function (fila) { return fila.julio; }).reduce((a, b) => a + b, 0),
            agosto : data.map(function (fila) { return fila.agosto; }).reduce((a, b) => a + b, 0),
            septiembre : data.map(function (fila) { return fila.septiembre; }).reduce((a, b) => a + b, 0),
            octubre : data.map(function (fila) { return fila.octubre; }).reduce((a, b) => a + b, 0),
            noviembre : data.map(function (fila) { return fila.noviembre; }).reduce((a, b) => a + b, 0),
            diciembre : data.map(function (fila) { return fila.diciembre; }).reduce((a, b) => a + b, 0)
            
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
        if (params.data.desviacionProyectadoPresupuestado > 0) {
            return {textAlign : "right", backgroundColor: '#def7de'};
        } else if (params.data.desviacionProyectadoPresupuestado < 0) {
            return {textAlign : "right", backgroundColor: '#f7dede'};
        } else {
            return {textAlign : "right"};
        }  
    }
    numberCellRenderer (params) {
        if (params.value === 0 || params.value === null || params.value === undefined) {
            return "--";
        } else {
            return numeral(params.value).format("0,0.00");
        }
    }
}

export default gridResumenMensual;