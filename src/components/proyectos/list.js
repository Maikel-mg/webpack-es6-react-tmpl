import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

class ListaProyectos extends Component {
    onListItemClick () {
        console.log('onListItemClick', arguments);
        console.log('onListItemClick', this);
    }

    render () {
        var listElements = this.props.datos.map( x => {

            console.log(x)
            return <li className="list-group-item" onClick={() => { console.log('onCLikc', arguments) }}>{x.name}</li> 
        }); 
        return (
            <div className="container-fluid">
                <div ref="headerContainer" className="row">
                    <div className="col-md-12">
                        <span>{this.props.titulo} ({this.props.datos.length})</span>    
                    </div>   
                </div>
                <div ref="filterWrapper" className="row filter">
                    <div className="col-md-12">
                        <input type="text" ref="filter" className="form-control" />
                    </div>   
                </div>
                <div ref="listData" className="row data">
                    <div className="col-md-12"> 
                        <ul className="list-group">
                            {listElements}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = ListaProyectos;
