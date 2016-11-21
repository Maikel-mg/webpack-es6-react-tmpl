import Axios from 'axios';


const API_ENDPOINT = 'http://localhost:60771/api/estadisticas';

class EstaditicasService {
    resumenMensual(año) {
        let response = undefined;
        
        if(año) {
            response = Axios.get(`${API_ENDPOINT}/ResumenMensual/${año}`);
        } else {
            response = Axios.get(`${API_ENDPOINT}/ResumenMensual`);
        }

        return response;
    }

    topClientes (año) {
        return Axios.get(`${API_ENDPOINT}/TopClientes/${año}/10`);
    }

    comparativaProyeccionPresupuesto (año) {
        return Axios.get(`${API_ENDPOINT}/ComparativaIngresadoProyeccion/${año}`);
    }
}

export default new EstaditicasService();