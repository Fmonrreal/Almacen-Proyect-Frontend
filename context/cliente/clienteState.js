import clienteReducer from './clienteReducer';
import clienteContext from './clienteContext';
import {
CLIENTE_SELECCIONADO_EXITO,
CLIENTE_SELECCIONADO_ERROR,
AGREGAR_CLIENTE,
DESCARGA_CLIENTES_EXITO,
DESCARGA_CLIENTES_ERROR,
CLIENTE_ACTIONS_EXITO,
DESCARGA_CLIENTES_STOCK_ERROR,
CLIENTE_EDITADO_EXITO,
CLIENTE_EDITADO_ERROR,
} from 'types'
import clienteAxios from 'config/axios';
import Swal from 'sweetalert2';
import {useReducer} from 'react';

const ClienteState = props => {

const clienteInitialState = {
    clientes:[],
    clienteSeleccionado:null,
    error: null,
    loading: false,
    cliente_action:null
};

const [state,dispatch] = useReducer(clienteReducer,clienteInitialState)

const obtenerclientesAction = async (nombre) => {

    try {
        const respuesta = await clienteAxios.post('/clientes/find',nombre);
        dispatch({
            type: DESCARGA_CLIENTES_EXITO,
            payload: respuesta.data
        })
    } catch (error) {
        dispatch({
            type: DESCARGA_CLIENTES_ERROR, 
            payload: true
        })
        // Swal.fire({
        //     icon: 'error',
        //     title: 'Hubo un error',
        //     text: 'Hubo un error, intenta de nuevo'
        // })
    }
}

const clienteActual = async (id_clientes) => {
    try {
        const respuesta = await clienteAxios.get(`/clientes/${id_clientes}`);
        dispatch({
            type: CLIENTE_SELECCIONADO_EXITO,
            payload: respuesta.data
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: CLIENTE_SELECCIONADO_ERROR, 
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

const clientesSeleccionadoAction = async (cliente) => {
    try {
        dispatch({
            type: CLIENTE_SELECCIONADO_EXITO,
            payload: cliente
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: CLIENTE_SELECCIONADO_ERROR, 
            payload: true
        })
        Swal.fire({
            icon: 'error',
            title: 'Hubo un error',
            text: 'Hubo un error, intenta de nuevo'
        })
    }
}

const crearNuevoClienteAction = async cliente => {
    // dispatch( agregarProducto() );

    try {
        // insertar en la API
        console.log(cliente);
        const respuesta = await clienteAxios.post('/clientes', cliente);

        // Si todo sale bien, actualizar el state
       dispatch({
            type: CLIENTE_SELECCIONADO_EXITO,
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
            type: CLIENTE_SELECCIONADO_ERROR,
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

const ClienteSelAction = async cliente => {

    try {
        dispatch({
            type: CLIENTE_ACTIONS_EXITO,
            payload: cliente
        })
    } catch (error) {
        dispatch({
            type: DESCARGA_CLIENTES_STOCK_ERROR, 
            payload: true
        })
    }
}

const editarClienteAction = async (id_clientes,datos) => {

        try {
            await clienteAxios.put(`/clientes/edit/${id_clientes}`, datos);   
            dispatch({
                type: CLIENTE_EDITADO_EXITO,
           });

            // Alerta
            Swal.fire(
                'Correcto', 
                'El cliente se edito correctamente',
                'success'
            );
        } catch (error) {
            console.log(error);
            // si hay un error cambiar el state
            dispatch({
                type: CLIENTE_EDITADO_ERROR,
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

const borrarClienteAction = async (id_clientes) => {

    try {
        await clienteAxios.delete(`/clientes/borrar/${id_clientes}`);   

        // Alerta
        Swal.fire(
            'Correcto', 
            'El cliente se elimino correctamente',
            'success'
        );
    } catch (error) {
        console.log(error);
        // si hay un error cambiar el state
        dispatch({
            type: CLIENTE_EDITADO_ERROR,
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
    <clienteContext.Provider
       value={{
        // initialState,   
           clientes:state.clientes,
           clienteSeleccionado:state.clienteSeleccionado,
           cliente_action:state.cliente_action,
           error:state.error,
           loading:state.loading,
           obtenerclientesAction,
           clienteActual,
           clientesSeleccionadoAction,
           crearNuevoClienteAction,
           ClienteSelAction,
           editarClienteAction,
           borrarClienteAction
       }}
    >{props.children}

    </clienteContext.Provider>
)

}

export default ClienteState;