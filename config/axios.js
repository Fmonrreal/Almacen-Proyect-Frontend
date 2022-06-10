import axios from 'axios';

const clienteAxios = axios.create({
    baseURL : process.env.REACT_APP_BACKEND_URL
    // baseURL : 'https://api.cloudinary.com/v1_1/dpfm70owp/image/upload'
});

export default clienteAxios;