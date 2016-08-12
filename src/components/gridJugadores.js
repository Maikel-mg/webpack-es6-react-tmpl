import React, {Component} from "react";

import { AgGridReact } from "ag-grid-react";

class gridJugadores extends Component {
    constructor(props) {
        super(props);

        this.state = {
            enableFilter : true,
            quickFilterText: null,
            showGrid: true,
            showToolPanel: true,
            columnDefs: [
                {headerName: "Posicion", field: "posicion", width: 50},
                {headerName: "Nombre",   field: "nombre", filter : "text", filterParams: {apply: true, newRowsAction: 'keep'}, width: 150},
                {headerName: "Equipo",   field: "equipo", filter : "set", width: 150},
                {headerName: "Valor",    field: "valor",  filter : "number", width: 100},
            ],
            rowData: [
                {
                    posicion : "PT",
                    nombre : "Pacheco",
                    equipo : "Aláves",
                    valor : 1000000
                },
                {
                    posicion : "DF",
                    nombre : "MARCELO",
                    equipo : "Real Madrid",
                    valor : 8000000
                }
            ],
            icons: {
                columnRemoveFromGroup: '<i class="fa fa-remove"/>',
                filter: '<i class="fa fa-filter"/>',
                sortAscending: '<i class="fa fa-long-arrow-down"/>',
                sortDescending: '<i class="fa fa-long-arrow-up"/>',
                groupExpanded: '<i class="fa fa-minus-square-o"/>',
                groupContracted: '<i class="fa fa-plus-square-o"/>',
                columnGroupOpened: '<i class="fa fa-minus-square-o"/>',
                columnGroupClosed: '<i class="fa fa-plus-square-o"/>'
            }
        };        
    }

    render() {
        return (
            <div style={{height: 400, width: 600}} className="ag-fresh">
                <AgGridReact
                    onSelectionChanged = {this.logRows.bind(this)}
                    onGridReady={this.onGridReady.bind(this)}

                    // binding to properties within React State or Props
                    rowSelection = 'multiple'
                    enableFilter = {this.state.enableFilter}

                    showToolPanel={this.state.showToolPanel}
                    quickFilterText={this.state.quickFilterText}
                    icons={this.state.icons}

                    // column definitions and row data are immutable, the grid
                    // will update when these lists change
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}
                    enableColResize = "true"

                    // or provide props the old way with no binding
                    //rowSelection="multiple"
                    enableSorting="true"
                    //enableFilter="true"
                    rowHeight="22"
                />
            </div>
        );
    }
    onGridReady(params) {
        
        this.api = params.api;
        this.columnApi = params.columnApi;

        setInterval(this.logRows.bind(this), 10000);
    }
    logRows (){
        //console.log('SELECTED ROWS', this.api.getSelectedRows())
        //this.api.sizeColumnsToFit();
        
        var sumaValorSeleccionado = 0;
        var selected = this.api.getSelectedRows();
        selected.forEach(function (r) {
            sumaValorSeleccionado = sumaValorSeleccionado + r.valor;
        });

        console.log(sumaValorSeleccionado);
    }
    createRow(){
        var rows = this.state.rowData;
        rows.push({posicion : 'DL', nombre: 'Lucas Perez', equipo : 'Deportivo', valor: 13000000});

        this.setState({ rowData : rows.concat([])});
    }
}

export default gridJugadores;