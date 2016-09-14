import React, {Component} from "react";

import GridResumenMensual from './gridResumenMensual';

class PageResumenMensual extends Component {
    render() {
        return (
        <div className="pageResumenMensual">
            <div className="row">
                    <div className="col-md-11" style={{"marginTop": "15px"}}>
                        <h2>INFORME HORAS-CLIENTE</h2>
                    </div>
            </div>
            <div className="gridResumenMensual row">
                <div className="col-md-12" style={{"marginTop": "15px"}}>
                    <GridResumenMensual ref="gridResumenMensual" dataResumenMensual={this.props.data} />
                </div>
            </div> 
        </div>
        );
    }
}

export default PageResumenMensual;