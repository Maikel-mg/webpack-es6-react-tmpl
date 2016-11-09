import React, {Component} from 'react';
import axios from 'axios';
import { Modal, Form, FormControl, Checkbox, ControlLabel, FormGroup, Col, Button, Popover, Tooltip, OverlayTrigger } from 'react-bootstrap';
import SelectClientes from './clientes/select.js';


class dialogProyectos extends Component {
    constructor(params) {
        super(params);

        this.state = {
            showModal: false,
            data : {
                cliente : '',
                activo : true
            }
        };
    }

    close() {
        this.setState({ showModal: false });
    }

    save() {
        var data = {
            proyecto : this.refs.proyecto.value,
            cliente : this.refs.cliente.state.value.id,
            activo : this.refs.activo.checked
        };

        console.log('DATA SAVE', data)

        // this.props.onSave(data);
        // this.setState({ showModal: false });
    }

    open(data) {
        if(data) {
            this.setState({ showModal: true , data : data});
        } 
        else {
            this.setState({ showModal: true });
        }
    
    }

    getClientes () {
         return axios
        .get('http://localhost:60771/api/Clientes')
        .then( (response) => {
            var options = null;
            console.log('LOADING OPTIONS' , options)
            options =   response.data.map((cliente) => {return {value : cliente.id, label : cliente.nombre} } );
            console.log('LOADING OPTIONS' , options)
            return options;
        })
        .then((data) => {
            return { options : data};
        });
    }

    render() {
        const popover = (
        <Popover id="modal-popover" title="popover">
            very popover. such engagement
        </Popover>
        );
        const tooltip = (
        <Tooltip id="modal-tooltip">
            wow.
        </Tooltip>
        );
        return (
            <div>

                <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Proyecto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                cliente
                            </Col>
                            <Col sm={10}>
                                <SelectClientes ref="cliente"/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                Proyecto
                            </Col>
                            <Col sm={10}>
                                <input ref="proyecto" className="form-control" type="text " placeholder="Proyecto" defaultValue={this.state.data.proyecto} />
                            </Col>
                        </FormGroup>
                         <FormGroup controlId="formHorizontalPassword">
                            <Col componentClass={ControlLabel} sm={2}>
                                Activo
                            </Col>
                            <Col sm={10}>
                                <Checkbox inputRef={(ref) => this.refs.activo = ref} value={this.state.data.activo}/>
                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close.bind(this)}>Cerrar</Button>
                    <Button bsStyle="success" onClick={this.save.bind(this)}>Guardar</Button>
                </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default dialogProyectos;