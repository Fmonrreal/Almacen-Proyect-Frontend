import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
 } from "types";

export default (state,action) => {
    switch(action.type){
        case LOGIN_EXITOSO:
            localStorage.setItem('accessToken', action.payload.accessToken);
            return {
                ...state,
                autenticado: true,
                mensaje: null,
                cargando: false,
                usuario: action.payload.name
            }
        case OBTENER_USUARIO: 
        return {
            ...state,
            autenticado: true,
            usuario: action.payload, 
            cargando: false
        }
        case CERRAR_SESION:
        case LOGIN_ERROR:
            localStorage.removeItem('accessToken');
            return {
                ...state,
                token: null,
                usuario: null,
                autenticado: null,
                mensaje: action.payload, 
                cargando: false
            }
        default:
            return state;
    }
}