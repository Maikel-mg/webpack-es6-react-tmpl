import Axios from 'axios';

//const API_ENDPOINT = 'http://localhost:60771/api';
const API_ENDPOINT = '/api';
const API_SLUG = 'Proyectos'

class ProyectosService {
    getProyectos() {
        let response = Axios.get(`${API_ENDPOINT}/${API_SLUG}`);

        return response;
    }
    createProyecto(data) {

        console.log('AXIOS' , Axios.create());        
        let response = Axios.post(`${API_ENDPOINT}/${API_SLUG}`, data);

        return response;
    }

    updateProyecto(data) {
        let response = Axios.put(`${API_ENDPOINT}/${API_SLUG}/${data.id}`, data);

        return response;
    }

    deleteProyecto(data) {
        let response = Axios.delete(`${API_ENDPOINT}/${API_SLUG}/${data.id}`);

        return response;
    }
}

export default new ProyectosService();