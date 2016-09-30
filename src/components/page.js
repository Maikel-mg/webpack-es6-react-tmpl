import React, {Component} from 'react';

import Navegacion from './navegacion';

class Page extends Component {
    render() {
        return (
              <div className="pageResumenMensual">
                    <div className="pageHeader row">
                        <div className="col-md-11">
                            <h2><i className="fa fa-${this.props.icon}"></i>{this.props.title}</h2>
                        </div>
                    </div>
                    <div className="gridResumenMensual row">
                        <div className="col-md-12" style={{"marginTop": "15px"}}>
                              {this.props.children}
                        </div>
                    </div> 
                </div>
        );
    }
}

export default Page;