import stockReducer from './stockReducer';
import stockContext from './stockContext';
import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTOS_STOCK_EXITO,
    AGREGAR_PRODUCTOS_STOCK_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS_STOCK,
    DESCARGA_PRODUCTOS_STOCK_EXITO,
    DESCARGA_PRODUCTOS_STOCK_ERROR, 
    OBTENER_PRODUCTOS_STOCK_ELIMINAR,
    PRODUCTOS_STOCK_ELIMINADO_EXITO,
    PRODUCTOS_STOCK_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_STOCK_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTOS_STOCK_EDITADO_EXITO,
    PRODUCTOS_STOCK_EDITADO_ERROR,
    PRODUCTO_STOCK_SELECCIONADO_ERROR,
    PRODUCTO_STOCK_SELECCIONADO_EXITO,
    LIMPIAR_PRODUCTOS_STOCK,
    CAMBIAR_STATUS_STOCK,
    CAMBIO_MODAL,
    DESCARGA_PRODUCTOS_PROVEDOR_STOCK_EXITO,
    EDITAR_PRODUCTO_PROVEDOR
} from 'types';
import clienteAxios from 'config/axios';
import Swal from 'sweetalert2';
import {useReducer} from 'react';



const StockState = props => {
    const initialState = {
        productos: [],
        error: null,
        loading: false, 
        productoeliminar: null,
        productoeditar: "",
        productoSeleccionado: null,
        status: null,
        modal:false,
        articulosProvedor:[],
        articuloProvedorEditar:null
    }

const [state,dispatch] = useReducer(stockReducer,initialState)

// Crear nuevos productos
const crearNuevoProductoAction = async producto => {
        // dispatch( agregarProducto() );

        try {
            // insertar en la API
            // console.log(producto);
            await clienteAxios.post('/products', producto);

            // Si todo sale bien, actualizar el state
           dispatch({
                type: AGREGAR_PRODUCTOS_STOCK_EXITO,
                payload: producto
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
                type: AGREGAR_PRODUCTOS_STOCK_ERROR,
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


// const agregarProducto = () => ({
//     type: AGREGAR_PRODUCTO,
//     payload: true
// });

// // si el producto se guarda en la base de datos
// const agregarProductoExito = producto => ({
//     type: AGREGAR_PRODUCTOS_STOCK_EXITO,
//     payload: producto
// })

// // si hubo un error
// const agregarProductoError = estado => ({
//     type: AGREGAR_PRODUCTOS_STOCK_ERROR,
//     payload: estado
// });


// Función que descarga los productos de la base de datos
const obtenerProductosAction = async datos => {
        // dispatch({
        //     type: COMENZAR_DESCARGA_PRODUCTOS_STOCK,
        //     payload: true
        // });

        try {
            const respuesta = await clienteAxios.post('/articulos/quiz2',datos);
            dispatch({
                type: DESCARGA_PRODUCTOS_STOCK_EXITO,
                payload: respuesta.data
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: DESCARGA_PRODUCTOS_STOCK_ERROR, 
                payload: true
            })
        }
    
}

// const descargarProductos = () => ({
//     type: COMENZAR_DESCARGA_PRODUCTOS_STOCK,
//     payload: true
// });

// const descargaProductosExitosa = productos => ({
//     type: DESCARGA_PRODUCTOS_STOCK_EXITO,
//     payload: productos
// })
// const descargaProductosError = () => ({
//     type: DESCARGA_PRODUCTOS_STOCK_ERROR, 
//     payload: true
// });

// Selecciona y elimina el producto
function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id) );

        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch( eliminarProductoExito() );

            // Si se elimina, mostrar alerta
            Swal.fire(
                'Eliminado',
                'El producto se eliminó correctamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            dispatch( eliminarProductoError() );
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTOS_STOCK_ELIMINAR,
    payload: id
});
const eliminarProductoExito = () => ({
    type: PRODUCTOS_STOCK_ELIMINADO_EXITO
})
const eliminarProductoError = () => ({
    type: PRODUCTOS_STOCK_ELIMINADO_ERROR,
    payload: true
});

// Colocar producto en edición
const obtenerArticuloEditar = producto => {
    // return (dispatch) => {
        dispatch( {
            type: OBTENER_PRODUCTO_STOCK_EDITAR,
            payload: producto
        } );
    // 
}

const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTOS_STOCK_EDITAR,
    payload: producto
})

// Edita un registro en la api y state
const editarProductoAction= async (id,producto) => {
    // return async (dispatch) => {
        // dispatch( editarProducto() );

        try {
            await clienteAxios.put(`/products/edit/${id.id}`, producto);   
            dispatch({
                type: PRODUCTOS_STOCK_EDITADO_EXITO,
                payload: producto
           });

            // Alerta
            Swal.fire(
                'Correcto', 
                'El producto se edito correctamente',
                'success'
            );
        } catch (error) {
            console.log(error);
            // si hay un error cambiar el state
            dispatch({
                type: PRODUCTOS_STOCK_EDITADO_ERROR,
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
const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
});

const editarProductoExito = producto => ({
    type: PRODUCTOS_STOCK_EDITADO_EXITO,
    payload: producto
});

const editarProductoError = () => ({
    type: PRODUCTOS_STOCK_EDITADO_ERROR,
    payload: true
})

const filtrarProductosAction = async ab => {
    // dispatch({
    //     type: COMENZAR_DESCARGA_PRODUCTOS_STOCK,
    //     payload: true
    // });

    try {
        const respuesta = await clienteAxios.post('/articulos/quiz2/find',ab);
        dispatch({
            type: DESCARGA_PRODUCTOS_STOCK_EXITO,
            payload: respuesta.data
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: DESCARGA_PRODUCTOS_STOCK_ERROR, 
            payload: true
        })
    }
}

const productoActual = async (n_id_articulos,producto) => {
    try {
        const respuesta = await clienteAxios.post(`/articulos/quiz4/find/${n_id_articulos}`);
        const provedores = respuesta.data
        const arrayx ={producto,provedores}
        dispatch({
            type: PRODUCTO_STOCK_SELECCIONADO_EXITO,
            payload: arrayx
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: PRODUCTO_STOCK_SELECCIONADO_ERROR, 
            payload: true
        })
    }
}

const clearProductState = async () => {
    dispatch({
        type: LIMPIAR_PRODUCTOS_STOCK
    })
};

const cargarImagenProductoAction= async (id,file) => {
    // return async (dispatch) => {
        // dispatch( editarProducto() );

        let config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          }

        try {
            // await clienteAxios.post(`/products/upload/${id.id}`, producto,config);   
            await clienteAxios.put(`/products/upload/${id.id}`, file);   
            dispatch({
                type: PRODUCTOS_STOCK_EDITADO_EXITO,
                payload: producto
           });

            // Alerta
            Swal.fire(
                'Correcto', 
                'El producto se edito correctamente',
                'success'
            );
        } catch (error) {
            console.log(error);
            // si hay un error cambiar el state
            dispatch({
                type: PRODUCTOS_STOCK_EDITADO_ERROR,
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

const cambiarEstadoAction= async (statu) => {
        try {
            // await clienteAxios.post(`/products/upload/${id.id}`, producto,config);      
            dispatch({
                type: CAMBIAR_STATUS_STOCK,
                payload: statu
           });

            // Alerta
            Swal.fire(
                'Correcto', 
                'se cambio status',
                'success'
            );
        } catch (error) {
            console.log(error);
            // si hay un error cambiar el state
            dispatch({
                type: PRODUCTOS_STOCK_EDITADO_ERROR,
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

const LimpiarProductoActual = async () => {
    try {
        dispatch({
            type: PRODUCTO_STOCK_SELECCIONADO_EXITO,
            payload: null
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: PRODUCTO_STOCK_SELECCIONADO_ERROR, 
            payload: true
        })
    }
}

const cambiarModal = async valor => {
    try {
        dispatch({
            type: CAMBIO_MODAL,
            payload: valor
        })
    } catch (error) {
        console.log(error);
        dispatch({
            // type: PRODUCTO_STOCK_SELECCIONADO_ERROR, 
            // payload: true
        })
    }
}

const obtenerProductosProvedorAction = async id_articulos => {

    try {
        const respuesta = await clienteAxios.post('/articulos_provedores/quiz/provider',{id_articulos});
        console.log("hola")
        console.log(respuesta)
        dispatch({
            type: DESCARGA_PRODUCTOS_PROVEDOR_STOCK_EXITO,
            payload: respuesta.data
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: DESCARGA_PRODUCTOS_STOCK_ERROR, 
            payload: true
        })
    }

}

const EditarArticuloProvedorAction = async valor => {
    console.log(valor)
    try {
        dispatch({
            type: EDITAR_PRODUCTO_PROVEDOR,
            payload: valor
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: PRODUCTO_STOCK_SELECCIONADO_ERROR, 
            payload: true
        })
    }
}

return(
    <stockContext.Provider
       value={{
        // initialState,   
           productos:state.productos,
           error:state.error,
           loading:state.loading,
           productoeditar:state.productoeditar,
           productoSeleccionado:state.productoSeleccionado,
            status: state.status,
            modal: state.modal,
            articulosProvedor: state.articulosProvedor,
            articuloProvedorEditar:state.articuloProvedorEditar,
           obtenerProductosAction,
           crearNuevoProductoAction,
           borrarProductoAction,
           filtrarProductosAction,
           editarProductoAction,
           productoActual,
           clearProductState,
           cargarImagenProductoAction,
           cambiarEstadoAction,
           LimpiarProductoActual,
           obtenerArticuloEditar,
           cambiarModal,
           obtenerProductosProvedorAction,
           EditarArticuloProvedorAction
       }}
    >{props.children}

    </stockContext.Provider>
)

}

export default StockState;