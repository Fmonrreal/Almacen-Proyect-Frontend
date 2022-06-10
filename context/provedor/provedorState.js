import provedorReducer from './provedorReducer';
import provedorContext from './provedorContext';
import {
    PROVEDOR_SELECCIONADO_EXITO,
    PROVEDOR_SELECCIONADO_ERROR,
    AGREGAR_PROVEDOR,
    DESCARGA_PROVEDORES_EXITO,
    DESCARGA_PROVEDORES_ERROR,
    PROVEDOR_ACTIONS_EXITO,
    DESCARGA_PROVEDORES_STOCK_ERROR,
    PROVEDOR_EDITADO_EXITO,
    PROVEDOR_EDITADO_ERROR,
} from 'types'
import clienteAxios from 'config/axios';
import Swal from 'sweetalert2';
import {useReducer} from 'react';

const ProvedorState = props => {

const provedorInitialState = {
    provedores:[],
    provedorSeleccionado:null,
    error: null,
    loading: false,
    provedor_action:null
};

const [state,dispatch] = useReducer(provedorReducer,provedorInitialState)

const obtenerprovedoresAction = async (nombre) => {

    try {
        const respuesta = await clienteAxios.post('/provedores/find',nombre);
        dispatch({
            type: DESCARGA_PROVEDORES_EXITO,
            payload: respuesta.data
        })
    } catch (error) {
        dispatch({
            type: DESCARGA_PROVEDORES_ERROR, 
            payload: true
        })
        Swal.fire({
            icon: 'error',
            title: 'Hubo un error',
            text: 'Hubo un error, intenta de nuevo'
        })
    }
}

const provedorActual = async (id_provedores) => {
    try {
        const respuesta = await clienteAxios.get(`/provedores/${id_provedores}`);
        dispatch({
            type: PROVEDOR_SELECCIONADO_EXITO,
            payload: respuesta.data
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: PROVEDOR_SELECCIONADO_ERROR, 
            payload: true
        })
        Swal.fire({
            icon: 'error',
            title: 'Hubo un error',
            // text: respuesta.message
            text: 'Hubo un error, en busqueda por id'
        })
    }
}

const provedoresSeleccionadoAction = async (provedor) => {
    try {
        dispatch({
            type: PROVEDOR_SELECCIONADO_EXITO,
            payload: provedor
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: PROVEDOR_SELECCIONADO_ERROR, 
            payload: true
        })
        Swal.fire({
            icon: 'error',
            title: 'Hubo un error',
            text: 'Hubo un error, intenta de nuevo'
        })
    }
}

const crearNuevoProvedorAction = async provedor => {
    // dispatch( agregarProducto() );

    try {
        // insertar en la API
        console.log(provedor);
        const respuesta = await clienteAxios.post('/provedores', provedor);

        // Si todo sale bien, actualizar el state
       dispatch({
            type: PROVEDOR_SELECCIONADO_EXITO,
            payload: respuesta.data
       });

        // Alerta
        Swal.fire(
            'Correcto', 
            'El producto se agregó correctamente',
            'success'
        );

    } catch (error) {
        console.log(error);
        // si hay un error cambiar el state
        dispatch({
            type: PROVEDOR_SELECCIONADO_ERROR,
            payload: true
        });

        // alerta de error
        Swal.fire({
            icon: 'error',
            title: 'Hubo un error',
            text: 'Hubo un error, intenta de nuevo'
        })
    }
}

const ProvedorSelAction = async provedor => {

    try {
        dispatch({
            type: PROVEDOR_ACTIONS_EXITO,
            payload: provedor
        })
    } catch (error) {
        dispatch({
            type: DESCARGA_PROVEDORES_STOCK_ERROR, 
            payload: true
        })
    }
}

const editarProvedorAction = async (id_provedores,datos) => {

        try {
            await clienteAxios.put(`/provedores/edit/${id_provedores}`, datos);   
            dispatch({
                type: PROVEDOR_EDITADO_EXITO,
           });

            // Alerta
            Swal.fire(
                'Correcto', 
                'El provedor se edito correctamente',
                'success'
            );
        } catch (error) {
            console.log(error);
            // si hay un error cambiar el state
            dispatch({
                type: PROVEDOR_EDITADO_ERROR,
                payload: true
            });

            // alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    
}

const borrarProvedorAction = async (id_provedores) => {

    try {
        await clienteAxios.delete(`/provedores/borrar/${id_provedores}`);   

        // Alerta
        Swal.fire(
            'Correcto', 
            'El provedor se elimino correctamente',
            'success'
        );
    } catch (error) {
        console.log(error);
        // si hay un error cambiar el state
        dispatch({
            type: PROVEDOR_EDITADO_ERROR,
            payload: true
        });

        // alerta de error
        Swal.fire({
            icon: 'error',
            title: 'Hubo un error',
            text: 'Hubo un error, intenta de nuevo'
        })
    }

}


return(
    <provedorContext.Provider
       value={{
        // initialState,   
           provedores:state.provedores,
           provedorSeleccionado:state.provedorSeleccionado,
           provedor_action:state.provedor_action,
           error:state.error,
           loading:state.loading,
           obtenerprovedoresAction,
           provedorActual,
           provedoresSeleccionadoAction,
           crearNuevoProvedorAction,
           ProvedorSelAction,
           editarProvedorAction,
           borrarProvedorAction
       }}
    >{props.children}

    </provedorContext.Provider>
)

}

export default ProvedorState;