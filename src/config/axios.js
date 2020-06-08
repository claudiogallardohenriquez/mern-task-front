import axios from 'axios';

//Para registrar la url base en produccion
const clienteAxios = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});

export default clienteAxios;
