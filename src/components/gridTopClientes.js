import React, {Component, PropTypes} from 'react';
import { AgGridReact } from "ag-grid-react";

import customRenders from "./../data/customRenders.js";

class GridTopClientes extends Component {
    constructor (props) {
        super(props);

        this.state = {
            columnDefs : [
                {
                    headerName : 'Horas',
                    field : 'ingresado',
                    width : 100,
                    sort : 'desc',
                    cellStyle : {"text-align" : "right"},
                    cellRenderer: customRenders.numberCellRenderer
                },
                {
                    headerName : 'Cliente',
                    field : 'cliente',
                    width : 200
                },
                {
                    headerName : '%',
                    width : 100,
                    field : 'porcentaje',
                    cellStyle : {"text-align" : "right"},
                    cellRenderer: customRenders.numberCellRenderer
                }
            ]
        };
    }
    render() {
        return (
             <div style={{height: (this.props.data.length + 2) * 30, width: 405, fontSize : "15px"}} className="ag-fresh">
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.props.data}
                    enableSorting= {false}
                    rowHeight="30"
                />
            </div>
        );
    }
}

export default GridTopClientes;