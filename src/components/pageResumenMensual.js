import React, {Component, PropTypes} from "react";

import GridResumenMensual from './gridResumenMensual';

class PageResumenMensual extends Component {
    render() {
        return (
        <div className="pageResumenMensual">
            <div className="pageHeader row">
                <div className="col-md-11">
                    <h2><i className="fa fa-table"></i>Resumen Mensual</h2>
                </div>
            </div>
            <div className="gridResumenMensual row">
                <div className="col-md-12" style={{"marginTop": "15px"}}>
                    <GridResumenMensual ref="gridResumenMensual" dataResumenMensual={this.context.data} />
                </div>
            </div> 
        </div>
        );
    }
}

PageResumenMensual.contextTypes = {
    data : PropTypes.array.isRequired
};

export default PageResumenMensual;