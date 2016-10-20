import React, {Component} from 'react';
import { Modal, Form, FormControl, Checkbox, ControlLabel, FormGroup, Col, Button, Popover, Tooltip, OverlayTrigger } from 'react-bootstrap';

    class dialogCliente extends Component {
        constructor(params) {
            super(params);


            this.state = {
                showModal: false,
                data : {
                    cliente : '',
                    telefono : '',
                    activo : true
                }
            };
        }

        close() {
            this.setState({ showModal: false });
        }

        save() {

            var data = {
                nombre : this.refs.cliente.value,
                telefono : this.refs.telefono.value,
                activo : false
            };
            this.props.onSave(data);
            this.setState({ showModal: false });
        }

        open(data) {
            if(data) {
                this.setState({ showModal: true , data : data});
            } 
            else {
                this.setState({ showModal: true });
            }
        
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
                    <Modal.Title>Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                Cliente
                            </Col>
                            <Col sm={10}>
                                <input ref="cliente" className="form-control" type="text " placeholder="Cliente" defaultValue={this.state.data.cliente} />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalPassword">
                            <Col componentClass={ControlLabel} sm={2}>
                                Telefono
                            </Col>
                            <Col sm={10}>
                                <input ref="telefono" className="form-control"  type="text" placeholder="Telefono" defaultValue={this.state.data.telefono}/>
                            </Col>
                        </FormGroup>
                         <FormGroup controlId="formHorizontalPassword">
                            <Col componentClass={ControlLabel} sm={2}>
                                Activo
                            </Col>
                            <Col sm={10}>
                                <Checkbox value={this.state.data.activo}/>
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

    onChange () {
        console.log('onChange', this.refs.cliente.value);

        this.setState({
            data : {
                cliente : this.refs.cliente.value 
            }
        });

    }
}

export default dialogCliente;