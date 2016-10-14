import React, {Component, PropTypes} from "react";
import { AgGridReact } from "ag-grid-react";

import customRenders from "./../data/customRenders.js";

function BooleanCellRenderer(params) {
    var checkbox = '<input type="checkbox" disabled="desabled" readonly="readonly" checked="' + ((params.value === true) ? "checked" : "") + '" ></input>';
    return '<span style="cursor: default;">' + checkbox + '</span>';
}

// BooleanCellRenderer.prototype.init = function (params) {
//     // if (params.value === "" || params.value === undefined || params.value === null) {
//     //     this.eGui = '';
//     // } else {
//         // var gender = '<img border="0" width="15" height="10" src="../images/' + params.value.toLowerCase() + '.png">';
//         var checkbox = '<input type="checkbox"></input>';
//         this.eGui = '<span style="cursor: default;">Maikel</span>';
//     //}
// };


function ButtonCellRenderer(params) {
    var checkbox = '<input type="button" value="..." />';
    return '<span style="cursor: default;">' + checkbox + '</span>';
}



// function to act as a class
function NumericCellEditor() {
}

// gets called once before the renderer is used
NumericCellEditor.prototype.init = function (params) {
    // create the cell
     this.eInput = document.createElement('input');
     this.eInput.type = "checkbox";
     this.eInput.checked = (params.value === true ) ? "checked" : "";

    //this.eInput = '<input type="checkbox"></input>';

    console.log('NumericCellEditor' , params);
    console.log('NumericCellEditor input' , this.eInput);

    // var that = this;
    // this.eInput.addEventListener('keypress', function (event) {
    //     if (!isKeyPressedNumeric(event)) {
    //         that.eInput.focus();
    //         if (event.preventDefault) event.preventDefault();
    //     }
    // });

    // // only start edit if key pressed is a number, not a letter
    // var charPressIsNotANumber = params.charPress && ('1234567890'.indexOf(params.charPress) < 0);
    // this.cancelBeforeStart = charPressIsNotANumber;
};

// gets called once when grid ready to insert the element
NumericCellEditor.prototype.getGui = function () {
    return this.eInput;
};

// focus and select can be done after the gui is attached
NumericCellEditor.prototype.afterGuiAttached = function () {
    this.eInput.focus();
};

// returns the new value after editing
NumericCellEditor.prototype.isCancelBeforeStart = function () {
    return this.cancelBeforeStart;
};

// example - will reject the number if it contains the value 007
// - not very practical, but demonstrates the method.
NumericCellEditor.prototype.isCancelAfterEnd = function () {
    var value = this.getValue();
    return 1;
};

// returns the new value after editing
NumericCellEditor.prototype.getValue = function () {
    console.log('getValue' , this.eInput.checked);
    return (this.eInput.checked) ? true : false;
};

// any cleanup we need to be done here
NumericCellEditor.prototype.destroy = function () {
    // but this example is simple, no cleanup, we could  even leave this method out as it's optional
};

// if true, then this editor will appear in a popup 
NumericCellEditor.prototype.isPopup = function () {
    // and we could leave this method out also, false is the default
    return false;
};



class PageMaestroClientes extends Component {
    constructor(){
        super();
        this.onGridReady = this.onGridReady.bind(this);
        this.onAddRow = this.onAddRow.bind(this); 

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
                    cellEditor : 'text'
                    //,filterParams: {newRowsAction: 'keep'}
                },
                {
                    headerName : 'Teléfono',
                    field : 'telefono',
                    filter : 'text',
                    width : 200, 
                    editable : true,
                    cellEditor : 'text'
                },
                {
                    headerName : 'Activo',
                    width : 100,
                    field : 'activo',
                    cellStyle : {"text-align" : "center"},
                    editable : true,
                    cellRenderer :BooleanCellRenderer,
                    cellEditor : NumericCellEditor
                },
                {
                    headerName : '',
                    width : 30,
                    cellStyle : {"text-align" : "center"},
                    cellRenderer : ButtonCellRenderer
                }
            ],
            datos : [ 
                {
                    id : '22928ED2-DFD3-4792-93B6-433FB4022BD6',
                    nombre : 'Asesoria ESEM',
                    telefono : 944456677,
                    activo : true
                },
                {
                    id : 'C20B1CB2-96C8-495A-A94F-E4761CD76909',
                    nombre : 'Agintzari',
                    telefono : 944457788,
                    activo : false
                }
            ]
        };
    }
    
    render() {
            return (
                <div className="pageResumenMensual">
                    <div className="pageHeader row">
                        <div className="col-md-11">
                            <h2><i className="fa fa-table"></i>Maestro de clientes</h2>
                        </div>
                    </div>
                    <div className="gridResumenMensual row">
                        <input type="button" value="Añadir" onClick={this.onAddRow} />   
                        <input type="button" value="Get Data" onClick={this.onGetData.bind(this)} />
                        <div className="col-md-12" style={{"marginTop": "15px"}}>
                            <div className="ag-fresh">
                                <AgGridReact
                                    ref = "gridClientes"
                                    onGridReady = {this.onGridReady}
                                    onCellValueChanged = {this.onCellValueChanged}
                                    onRowValueChanged = {this.onRowValueChanged}
                                    columnDefs={this.state.columnDefs}
                                    rowData={this.state.datos}
                                    rowHeight="30"
                                    enableFilter = {true}
                                    editType  = "fullRow"
                                />
                            </div>
                        </div>
                    </div> 
                </div>
            );
    }
     // EVENTOS
    onGridReady(params) {
        this.api = params.api;
        this.columnApi = params.columnApi;

        //this.onAddRow();

        

        console.log('agGrid REady', params);
        console.log('agGrid REady', this);
        console.log('agGrid REady', this.refs.gridClientes);
    }
    

    onCellValueChanged (params) {
        console.log('onCellValueChanged', params);

        if (params.data.id === null) {
            console.log('Celda nueva sin guardar', params);
            params.node.setData({
                id : '0001',
                nombre : params.data.nombre,
                activo : params.data.activo
            });
            console.log('PARAMS DATA', params.data);

        } else {
            console.log('Celda editada sin guardar', params);
        }
    }

    onRowValueChanged (params) {
        console.log('onRowValueChanged', params);
    }

    onAddRow() {
        var newItem =  {
            id : null,
            nombre : '',
            activo : false
        };

        var rows = this.state.datos;
        rows.push(newItem);

        console.log('onAddRow', this.api.startEditingCell);


        this.setState({ datos : rows.concat([])});
        this.api.setFocusedCell(rows.length-1, 'nombre');
        //this.api.startEditing({});
       

    }
    onGetData () {
        console.log('DATOS', this.state.datos);
    }

}

export default PageMaestroClientes;