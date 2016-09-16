import React, {Component} from "react";
import {Router, Route, browserHistory} from 'react-router';

import Layout from './layout';
import PageTopClientes from './pageTopClientes';
import PageResumenMensual from './pageResumenMensual';
import PageComparativaPresupuesto from './PageComparativaPresupuesto';

class App extends Component {
    
    render() {
        return (
             <Router history={browserHistory}>
                <Route path={"/"} component={Layout} >
                    <Route path={"ResumenMensual"} component={PageResumenMensual} />
                    <Route path={"TopClientes"} component={PageTopClientes} />
                    <Route path={"Comparativa"} component={PageComparativaPresupuesto} />
                </Route>
             </Router>
        );
    }
}

export default App;  