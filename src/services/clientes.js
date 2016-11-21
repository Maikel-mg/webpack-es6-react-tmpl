import Axios from 'axios';

const API_ENDPOINT = 'http://localhost:60771/api';

class ClientesService {
    getClientes() {
        let response = Axios.get(`${API_ENDPOINT}/Clientes`);

        return response;
    }
    getClientesConProyectos() {
        let response = Axios.get(`${API_ENDPOINT}/Clientes/ClientesConProyectos?include=maikel`);

        return response;
    }
    createCliente(data) {

        console.log('AXIOS' , Axios.create());        
        let response = Axios.post(`${API_ENDPOINT}/Clientes`, data);

        return response;
    }
    updateCliente(data) {
        let response = Axios.put(`${API_ENDPOINT}/Clientes/${data.id}`, data);

        return response;
    }
    deleteCliente(data) {
        let response = Axios.delete(`${API_ENDPOINT}/Clientes/${data.id}`);

        return response;
    }
}

export default new ClientesService();