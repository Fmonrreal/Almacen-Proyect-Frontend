import axios from 'axios';

const clienteAxios2 = axios.create({
    // baseURL : process.env.REACT_APP_BACKEND_URL
    baseURL : 'http://127.0.0.1:5000/graphs'
});

export default clienteAxios2;