import React, {Component} from 'react';

import Navegacion from './navegacion';

class Layout extends Component {
    constructor(props){
        super(props);

        this.state = {
            clientes : []
        };
    }

    render() {
        return (
             <div className="appContainer">
                <Navegacion /> 
                <div className="container-fluid">
                    {this.props.children}
                </div>
            </div> 
        );
    }
}

export default Layout;