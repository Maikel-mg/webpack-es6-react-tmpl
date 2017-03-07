import React, {Component} from 'react';
import {Treebeard, decorators} from 'react-treebeard';

import { ContextMenu, Menu, MenuItem } from "@blueprintjs/core";

const styles =  {
    tree: {
        base: {
            listStyle: 'none',
            backgroundColor: '#FFF',
            margin: 0,
            padding: 0,
            color: '#000',
            fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
            fontSize: '13px'
        },
        node: {
            base: {
                position: 'relative'
            },
            link: {
                cursor: 'pointer',
                position: 'relative',
                padding: '0px 5px',
                display: 'block'
            },
            activeLink: {
                fontWeight : 'bold'
            },
            toggle: {
                base: {
                    position: 'relative',
                    display: 'inline-block',
                    verticalAlign: 'top',
                    marginLeft: '-5px',
                    height: '0px',
                    width: '0px'
                },
                wrapper: {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    margin: '-7px 0 0 -7px',
                    height: '14px'
                },
                height: 0,
                width: 0,
                arrow: {
                    fill: '#000',
                    strokeWidth: 0
                }
            },
            header: {
                base: {
                    display: 'inline-block',
                    verticalAlign: 'top',
                    color: '#000'
                },
                connector: {
                    width: '2px',
                    height: '12px',
                    borderLeft: 'solid 2px black',
                    borderBottom: 'solid 2px black',
                    position: 'absolute',
                    top: '0px',
                    left: '-21px'
                },
                title: {
                    lineHeight: '24px',
                    verticalAlign: 'middle'
                }
            },
            subtree: {
                listStyle: 'none',
                paddingLeft: '19px'
            },
            loading: {
                color: '#F00'
            }
        }
    }
};

const datosTree = [
        {
            name: 'Elecnor',
            tipo : 'Cliente',
            children: [
                { 
                    name: 'GIAS', 
                    tipo : 'Proyecto'
                },
                { 
                    name: 'VIAS', 
                    tipo : 'Proyecto' 
                },
                { 
                    name: 'Analítica', 
                    tipo : 'Proyecto' 
                },
                { 
                    name: 'Inventarios', 
                    tipo : 'Proyecto' 
                }
            ]
        },
      
        {
            name: 'Lantik',
            tipo : 'Cliente',
            children: [
                { 
                    name: 'Marisa',
                    tipo : 'Proyecto'
                },
                { 
                    name: 'Roberto',
                    tipo : 'Proyecto' 
                }
            ]
        },
        {
            name: 'Vicrila',
            tipo : 'Cliente',
            children: []
        },
    ];

decorators.Header = (props) => {
        const MenuCliente = (
            <Menu>
                <MenuItem text="Save" />
                <MenuItem text="Delete" />
            </Menu>
        );

        const style = props.style;
        let iconType = '';
        let iconColor = '';
        switch (props.node.tipo) {
            case 'Cliente' :
                iconType = 'user';
                iconColor = '#4caf50';
                break;
            case 'Proyecto' :
                iconType = 'suitcase';
                break;
            default :
                iconType = 'folder';
                break;
        }
        const iconClass = `fa fa-${iconType}`;
        const iconStyle = { marginRight: '5px', color: iconColor};
        let numeroProyectos = '';
        if (props.node.tipo == 'Cliente' && props.node.children && props.node.children.length)  {
            numeroProyectos = '(' + props.node.children.length + ')';
        };

        return (
            <div style={style.base}>
                <div style={style.title} >
                    <i className={iconClass} style={iconStyle}/>
                    {props.node.name} 
                </div>
            </div>
        );
    };



class TreeviewClientes extends Component {

    constructor (props) {
        super(props);
        this.state = {
            data : []
        };

        this.onToggle = this.onToggle.bind(this);
    }

    componentWillReceiveProps (props) {
        this.setState({
            data : props.datos.map(this.mapData)
        });
    }


    mapData (e) {
        let nodo = {
            id : e.id,
            name : e.nombre,
            tipo : 'Cliente',
            children : []
        } 
        
        if(e.Proyectos && e.Proyectos.length > 0) {

            nodo.children = e.Proyectos.map(p => {
                return {
                    id : p.id,
                    name : p.nombre,
                    tipo : 'Proyecto' 
                }   
            }); 
        }

        return nodo; 
    }

    setData (data) {
         this.setState({
             data : data
         });
    }

    onToggle(node, toggled) {
        if (this.state.cursor) {
            this.state.cursor.active = false;
        }
        node.active = true;

        if (node.children) { 
            node.toggled = toggled; 
        }

        this.setState({ cursor: node });

        if (this.props.onNodeSelected) {
            this.props.onNodeSelected(node);
        }
    }

    render () {
        return (
            <Treebeard 
                data={this.state.data}
                onToggle={this.onToggle}
                style = {styles}
                decorators = {decorators}
            />
        );
    }
}

module.exports = TreeviewClientes;