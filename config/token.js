import clienteAxios from './axios';

const tokenAuth = token => {
    if(token){
        clienteAxios.defaults.headers.common['xtoken'] = token;
    }else{
        delete clienteAxios.defaults.headers.common['xtoken'];
    }
}

export default tokenAuth;