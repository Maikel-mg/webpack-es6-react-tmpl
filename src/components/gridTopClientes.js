import React, {Component, PropTypes} from 'react';
import { AgGridReact } from "ag-grid-react";

import customRenders from "./../data/customRenders.js";

class GridTopClientes extends Component {
    constructor (props) {
        super(props);
        this.porcentajeSobreTotal = this.porcentajeSobreTotal.bind(this);

        this.state = {
            columnDefs : [
                {
                    headerName : 'Horas',
                    field : 'ingresadoTotal',
                    width : 80,
                    sort : 'desc',
                    cellStyle : {"text-align" : "right"},
                    cellRenderer: customRenders.numberCellRenderer
                },
                {
                    headerName : 'Cliente',
                    field : 'cliente',
                    width : 150
                },
                {
                    headerName : '%',
                    width : 50,
                    valueGetter : this.porcentajeSobreTotal,
                    cellStyle : {"text-align" : "right"},
                    cellRenderer: customRenders.percentCellRenderer
                }
            ]
        };
    }
    render() {
        return (
             <div style={{height: (this.props.data.length + 2) * 30, width: 282, fontSize : "15px"}} className="ag-fresh">
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.props.data}
                    enableSorting= {false}
                    rowHeight="30"
                />
            </div>
        );
    }

    porcentajeSobreTotal (row) {
        let sumaHoras = this.calculateTotalHoras(this.props.data);
        let actualSobreTotal = (row.data.ingresadoTotal * 100 / sumaHoras) / 100;
        
        return actualSobreTotal;   
    }
    calculateTotalHoras (datos) {
        return datos.map(function (element) { return element.ingresadoTotal;}).reduce((a, b) => a + b, 0);
    }
    
}

GridTopClientes.propTypes = {
    data : PropTypes.array.isRequired
};

export default GridTopClientes;