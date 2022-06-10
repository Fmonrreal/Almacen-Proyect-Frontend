import sucursalReducer from './sucursalReducer';
import sucursalContext from './sucursalContext';
import {
    SUCURSAL_SELECCIONADA_EXITO,
    SUCURSAL_SELECCIONADA_ERROR,
    AGREGAR_SUCURSAL,
    ELIMINAR_SUCURSAL,
    DESCARGA_SUCURSALES_STOCK_EXITO,
    DESCARGA_SUCURSALES_STOCK_ERROR,
    SUCURSAL_TRANSFERIR_EXITO,
    DESCARGA_SUCURSALES_FILTER_EXITO,
    SUCURSAL_ACTIONS_EXITO,
    SUCURSAL_EDITADA_EXITO,
    SUCURSAL_EDITADA_ERROR
} from 'types'
import clienteAxios from 'config/axios';
import Swal from 'sweetalert2';
import {useReducer} from 'react';

const SucursalState = props => {

const sucursalInitialState = {
    sucursales:[],
    sucursales_Busq:[],
    // sucursal_seleccionada: null,
    sucursal_seleccionada: {
        id_sucursales: 1,
        nombre: "Saltillo",
        direccion: "calle 1",
        telefono: "844436464"
    },
    sucursal_destino: null,
    sucursal_actions:null,
    error: null,
    loading: false,
};



const [state,dispatch] = useReducer(sucursalReducer,sucursalInitialState)

const obtenerSucursalesAction = async () => {

    try {
        const respuesta = await clienteAxios.get('/sucursales');
        dispatch({
            type: DESCARGA_SUCURSALES_STOCK_EXITO,
            payload: respuesta.data
        })
    } catch (error) {
        dispatch({
            type: DESCARGA_SUCURSALES_STOCK_ERROR, 
            payload: true
        })
    }
}

const sucursalActual = async (sucursal_sel) => {
    try {
        dispatch({
            type: SUCURSAL_SELECCIONADA_EXITO,
            payload: sucursal_sel
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: SUCURSAL_SELECCIONADA_ERROR, 
            payload: true
        })
    }
}

const sucursalATransferir = async (sucursal_tras) => {
    try {
        dispatch({
            type: SUCURSAL_TRANSFERIR_EXITO,
            payload: sucursal_tras
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: SUCURSAL_SELECCIONADA_ERROR, 
            payload: true
        })
    }
}

const crearNuevaSucursal = async sucursal => {
    // dispatch( agregarProducto() );

    try {
        // insertar en la API
        const respuesta = await clienteAxios.post('/sucursales', sucursal);

        // Si todo sale bien, actualizar el state
    //    dispatch({
    //         type: CLIENTE_SELECCIONADO_EXITO,
    //         payload: respuesta.data
    //    });
        
        console.log(respuesta)
        // Alerta
        Swal.fire(
            'Correcto', 
            'La sucursal se agregó correctamente',
            'success'
        );

    } catch (error) {
        console.log(error);
        // si hay un error cambiar el state
        dispatch({
            type: SUCURSAL_SELECCIONADA_ERROR,
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

const filtrarSucursalesAction = async (name) => {

    try {
        const respuesta = await clienteAxios.post('/sucursales/find',name);
        dispatch({
            type: DESCARGA_SUCURSALES_FILTER_EXITO,
            payload: respuesta.data
        })
    } catch (error) {
        dispatch({
            type: DESCARGA_SUCURSALES_STOCK_ERROR, 
            payload: true
        })
    }
}

const SucursalSelAction = async sucursal => {

    try {
        dispatch({
            type: SUCURSAL_ACTIONS_EXITO,
            payload: sucursal
        })
    } catch (error) {
        dispatch({
            type: DESCARGA_SUCURSALES_STOCK_ERROR, 
            payload: true
        })
    }
}

const editarSucursalAction = async (id_sucursales,datos) => {

        try {
            await clienteAxios.put(`/sucursales/edit/${id_sucursales}`, datos);   
            dispatch({
                type: SUCURSAL_EDITADA_EXITO,
           });

            // Alerta
            Swal.fire(
                'Correcto', 
                'La sucursal se edito correctamente',
                'success'
            );
        } catch (error) {
            console.log(error);
            // si hay un error cambiar el state
            dispatch({
                type: SUCURSAL_EDITADA_ERROR,
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

const borrarSucursalAction = async (id_sucursales) => {

    try {
        await clienteAxios.delete(`/sucursales/borrar/${id_sucursales}`);   

        // Alerta
        Swal.fire(
            'Correcto', 
            'La sucursal se elimino correctamente',
            'success'
        );
    } catch (error) {
        console.log(error);
        // si hay un error cambiar el state
        dispatch({
            type: SUCURSAL_EDITADA_ERROR,
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
    <sucursalContext.Provider
       value={{
        // initialState,   
           sucursales:state.sucursales,
           sucursales_Busq:state.sucursales_Busq,
           sucursal_seleccionada:state.sucursal_seleccionada,
           sucursal_destino:state.sucursal_destino,
           sucursal_actions:state.sucursal_actions,
           error:state.error,
           loading:state.loading,
           obtenerSucursalesAction,
           sucursalActual,
           sucursalATransferir,
           crearNuevaSucursal,
           filtrarSucursalesAction,
           SucursalSelAction,
           editarSucursalAction,
           borrarSucursalAction
       }}
    >{props.children}

    </sucursalContext.Provider>
)

}

export default SucursalState;