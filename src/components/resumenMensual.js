import React, {Component} from "react";
import ReactDOM from 'react-dom';

import GridResumenMensual from './gridResumenMensual';


class App extends Component {
    constructor(props){
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div id="appContainer" className="container-fluid">
                <div className="row">
                    <div className="col-md-12" style={{"marginTop": "15px"}}>
                        <GridResumenMensual ref="gridResumenMensual" />
                    </div>
                </div> 
            </div>
        );
    }
}

export default App;