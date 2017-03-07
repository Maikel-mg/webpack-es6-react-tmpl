import React, {Component} from 'react';
import { AgGridReact } from "ag-grid-react";


import ListaProyectos from './../proyectos/list';

class Detail extends Component {
    constructor(props) {
        super(props);

        

    }

    render () {
        let columns = [
            {
                headerName : 'ID',
                field : 'id',
                width : 100,
                hide : true 
            },
            {
                headerName : 'Proyecto',
                field : 'name',
                filter : 'text',
                width : 200, 
                filterParams: {newRowsAction: 'keep'},
                sort: 'asc'
            }
        ];
        let columnsEditables = [
            {
                headerName : 'ID',
                field : 'id',
                width : 100,
                hide : true 
            },
            {
                headerName : 'Proyecto',
                field : 'name',
                filter : 'text',
                width : 200, 
                filterParams: {newRowsAction: 'keep'},
                sort: 'asc'
            }
        ];

        if (this.props && this.props.datos) {
            return (
                <div className="container-fluid" >
                    <div className="row" style={{"padding": "0px 0px 0px 15px"}}>
                        <div className="col-md-12">
                            <h3>{this.props.datos.name}</h3>
                        </div>    
                    </div>
                    <div className="row" style={{"padding": "0px"}}>
                        <div className="col-md-3" style={{height : '300px', "padding": "0px"}}>
                            <ListaProyectos titulo="Proyectos" datos={this.props.datos.children}/>
                        </div>
                        <div className="col-md-9 ag-fresh ag-ipartek" style={{height : '400px', "padding": "0px 0px 0px -2px"}}>
                            <AgGridReact
                                ref = "gridDatosEditables"
                                columnDefs={columnsEditables}
                                rowData={[]}
                                rowHeight="30"
                                enableFilter = {true}
                            />
                        </div>
                    </div>
                    
                </div>
            );
        } else {
            return (
                <div className="container">
                    <h3>SELECCIONA UN CLIENTE PARA VER SUS DATOS</h3>
                </div>
            );
        }
        
    }
}

module.exports = Detail;