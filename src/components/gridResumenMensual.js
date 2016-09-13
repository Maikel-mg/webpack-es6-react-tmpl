import React, {Component} from "react";
import { AgGridReact } from "ag-grid-react";

import numeral from "numeral";

class gridResumenMensual extends Component {
    constructor(props) {
        super(props);

        console.log(props);

        this.modoAvanzado = this.modoAvanzado.bind(this);
        this.onGridReady = this.onGridReady.bind(this);

        this.calculateIngresoMedioMensual = this.calculateIngresoMedioMensual.bind(this);
        this.calculateProyeccion = this.calculateProyeccion.bind(this);
        this.calculateDesviacionProyectadoPresupuesto = this.calculateDesviacionProyectadoPresupuesto.bind(this);
        this.desviacionProyeccionStyle = this.desviacionProyeccionStyle.bind(this);
        this.clienteStyle = this.clienteStyle.bind(this);
        this.autoSize = this.autoSize.bind(this);

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
                        {headerName: "Cliente", field: "cliente", width: 150, pinned: 'left', filter : "text", cellStyle : this.clienteStyle },
                        {headerName: "Notas",   field: "descripcion", width: 150, pinned: 'left', filter : "text"},
                    ]
                },
                {
                    headerName: "PRESUPUESTADO",
                    children : [
                        {headerName: "2016", field: "presupuestado", width: 100, pinned: 'left', filter : "number", cellStyle : {"text-align" : "right"}, cellRenderer: this.numberCellRenderer },
                        {headerName: "2015", columnGroupShow: 'open', width: 100, pinned: 'left', filter : "number", cellStyle : {"text-align" : "right"}, cellRenderer: this.numberCellRenderer },
                        {headerName: "2014",columnGroupShow: 'open', width: 100, pinned: 'left', filter : "number", cellStyle : {"text-align" : "right"}, cellRenderer: this.numberCellRenderer },
                        {headerName: "2013",columnGroupShow: 'open', width: 100, pinned: 'left', filter : "number", cellStyle : {"text-align" : "right"}, cellRenderer: this.numberCellRenderer },
                        {headerName: "2012",columnGroupShow: 'open', width: 100, pinned: 'left', filter : "number", cellStyle : {"text-align" : "right"}, cellRenderer: this.numberCellRenderer },
                    ]
                },
                {
                    headerName: "INGRESADO",
                    children : [
                        {headerName: "Actual", headerTooltip:"Ingresado hasta el momento", filter : "number", width: 80, pinned: 'left',  valueGetter: this.calculateIngresado, cellStyle : {"text-align" : "right"}, cellRenderer: this.numberCellRenderer },
                        {headerName: "Media Mensual", headerTooltip:"Ingreso Medio Mensual", filter : "number", width: 80, pinned: 'left', cellStyle : {"text-align" : "right" },  valueGetter: this.calculateIngresoMedioMensual,  cellRenderer: this.numberCellRenderer },
                    ]
                },
                {
                    headerName: "CALCULOS", 
                    children : [
                        {headerName: "Proyeccion", filter : "number", width: 100, pinned: 'left',  valueGetter: this.calculateProyeccion, cellStyle : {"text-align" : "right"}, cellRenderer: this.numberCellRenderer },
                        {colId : 'DesvIngPre', headerName: "Desviación Ingresado/Presupuestado", filter : "number", width: 100, pinned: 'left',  valueGetter: this.calculateDesviacionIngresoPresupuesto, cellStyle : this.desviacionIngresadoStyle, cellRenderer: this.numberCellRenderer },
                        {colId : 'DesvProPre', headerName: "Desviación Proyeccion/Presupuesto",  filter : "number", width: 100, pinned: 'left',  valueGetter: this.calculateDesviacionProyectadoPresupuesto, cellStyle : this.desviacionProyeccionStyle, cellRenderer: this.numberCellRenderer },
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

    numberCellRenderer (params) {
        if (params.value === 0) {
            return "--";
        } else {
            return numeral(params.value).format("0,0.00");
        }
    }

    
    calculateDesviacionIngresoPresupuesto (row) {
        let arrayMeses = Object.keys(row.data.ingresado).map((k) => row.data.ingresado[k]);
        let sumaIngresado =  arrayMeses.reduce((a, b) => a + b, 0);
        return numeral(sumaIngresado - row.data.presupuestado).format('0.0,00');
    }
    calculateDesviacionProyectadoPresupuesto (row) {
       let proyeccion = this.calculateProyeccion(row);

       return numeral(proyeccion - row.data.presupuestado).format('0.0,00');
    }
    calculateIngresado (row) {
        let arrayMeses = Object.keys(row.data.ingresado).map((k) => row.data.ingresado[k]);
        let sumaIngresado =  arrayMeses.reduce((a, b) => a + b, 0);

        return numeral(sumaIngresado).format('0.0,00');
    }
    calculateIngresoMedioMensual (row) {
        let arrayMeses = Object.keys(row.data.ingresado).map((k) => row.data.ingresado[k]);
        let sumaIngresado =  arrayMeses.reduce((a, b) => a + b, 0);

        if(sumaIngresado > 0) {
            return numeral(sumaIngresado / this.state.mesesConResultado).format('0.0,00');
        } else {
            return numeral(0).format('0.0,00'); 
        }
    }
    calculateProyeccion (row){
        let arrayMeses = Object.keys(row.data.ingresado).map((k) => row.data.ingresado[k]);
        let sumaIngresado =  arrayMeses.reduce((a, b) => a + b, 0);

        if (this.state.mesesConResultado <= 6) {
            return sumaIngresado + (sumaIngresado / this.state.mesesConResultado) * ( this.state.mesesAProyectar - 1)
        } else if (this.state.mesesConResultado === 7) { 
            return sumaIngresado + (sumaIngresado / 6.5) * ( this.state.mesesAProyectar - 0.5) // en base 12
        } else if (this.state.mesesConResultado > 7) { 
            return sumaIngresado + (sumaIngresado / 7) * ( this.state.mesesAProyectar)
        } 
    }
    getBottomData (data) {
        let newData = [{
            presupuestado : data.map(function (fila) { return fila.presupuestado; }).reduce((a, b) => a + b, 0),
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
     clienteStyle (params) {
        let proyectado = this.calculateProyeccion(params);

        if (proyectado - params.data.presupuestado < 0) {
            return {color: 'red'};
        }
    }
    desviacionIngresadoStyle (params) {
        let arrayMeses = Object.keys(params.data.ingresado).map((k) => params.data.ingresado[k]);
        let sumaIngresado =  arrayMeses.reduce((a, b) => a + b, 0);

        if (sumaIngresado - params.data.presupuestado > 0) {
            return {textAlign : "right", backgroundColor: '#def7de'};
        } else if (sumaIngresado - params.data.presupuestado < 0) {
            return {textAlign : "right", backgroundColor: '#f7dede'};
        } else {
            return {textAlign : "right"};
        }  
    }
    desviacionProyeccionStyle (params) {
        let proyectado = this.calculateProyeccion(params);

        if (proyectado - params.data.presupuestado > 0) {
            return {textAlign : "right", backgroundColor: '#def7de'};
        } else if (proyectado - params.data.presupuestado < 0) {
            return {textAlign : "right", backgroundColor: '#f7dede'};
        } else {
            return {textAlign : "right"};
        }  
    }
    autoSize () {
        var allColumnIds = [];
        var _this = this;
        this.state.columnDefs.forEach( function(columnDef) {
            columnDef.children.forEach( function(columnDef2) {
                _this.columnApi.autoSizeColumn(columnDef2);
            });
        });
    }
    modoAvanzado () {
        console.log('modoAvanzado', this);
        this.columnApi.setColumnVisible('DesvIngPre', false);
        this.columnApi.setColumnVisible('DesvProPre', false);
    }
    render() {
        return (
            <div style={{height: '80%', fontSize : "13px"}} className="ag-fresh">
                <AgGridReact
                    onGridReady = {this.onGridReady}
                    rowSelection = {this.state.rowSelection}
                    showToolPanel={this.state.showToolPanel}
                    quickFilterText={this.state.quickFilterText}
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}
                    floatingBottomRowData={this.state.floatingBottomRowData}
                    enableColResize = {this.state.enableColResize}
                    enableSorting= {this.state.enableSorting}
                    enableFilter = {this.state.enableFilter}
                    rowHeight="20"
                />
            </div>
        );
    }
    onGridReady(params) {
        console.log('onGridReady', this);
        this.api = params.api;
        this.columnApi = params.columnApi;
    }
}

export default gridResumenMensual;