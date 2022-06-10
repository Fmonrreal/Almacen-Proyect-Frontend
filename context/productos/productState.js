import productReducer from './productReducer';
import productContext from './productContext';
import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR, 
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR,
    PRODUCTO_SELECCIONADO_ERROR,
    PRODUCTO_SELECCIONADO_EXITO,
    AGREGAR_ARTICULO,
    LIMPIAR_PRODUCTOS,
    AGREGAR_ARTICULO_EXITO,
    AGREGAR_ARTICULO_ERROR,
    COMENZAR_DESCARGA_ARTICULOS,
    DESCARGA_ARTICULOS_EXITO,
    DESCARGA_ARTICULOS_ERROR,
    OBTENER_ARTICULO_ELIMINAR,
    ARTICULO_ELIMINADO_EXITO,
    ARTICULO_ELIMINADO_ERROR,
    OBTENER_ARTICULO_EDITAR,
    COMENZAR_EDICION_ARTICULO,
    ARTICULO_EDITADO_EXITO,
    ARTICULO_EDITADO_ERROR,
    FILTRAR_ARTICULOS_EXITO,
    FILTRAR_ARTICULOS_ERROR,
    OBTENER_ARTICULO_SELECCIONADO,
    ARTICULO_SELECCIONADO_EXITO,
    ARTICULO_SELECCIONADO_ERROR,
    LIMPIAR_ARTICULOS,
    DATOS_BUSQUEDA
} from 'types';
import clienteAxios from 'config/axios';
import Swal from 'sweetalert2';
import {useReducer} from 'react';



const ProductState = props => {
    const initialState = {
        productos: [],
        error: null,
        loading: false, 
        productoeliminar: null,
        productoeditar: null,
        productoSeleccionado: null,
        articulos:[],
        articuloSeleccionado: null,
        name:"",
        id_supplier:0,
        productos_provedor: [],
    }

const [state,dispatch] = useReducer(productReducer,initialState)

// Crear nuevos productos
const crearNuevoProductoAction = async producto => {
        // dispatch( agregarProducto() );

        try {
            // insertar en la API
            console.log(producto);
            await clienteAxios.post('/products', producto);

            // Si todo sale bien, actualizar el state
           dispatch({
                type: AGREGAR_PRODUCTO_EXITO,
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
                type: AGREGAR_PRODUCTO_ERROR,
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
//     type: AGREGAR_PRODUCTO_EXITO,
//     payload: producto
// })

// // si hubo un error
// const agregarProductoError = estado => ({
//     type: AGREGAR_PRODUCTO_ERROR,
//     payload: estado
// });


// Función que descarga los productos de la base de datos
const obtenerProductosAction = async () => {
        // console.log("se_ejecucta_desde_obtenerProductosAction")
        // dispatch({
        //     type: COMENZAR_DESCARGA_PRODUCTOS,
        //     payload: true
        // });

        try {
            const respuesta = await clienteAxios.get('/products');
            dispatch({
                type: DESCARGA_PRODUCTOS_EXITO,
                payload: respuesta.data
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: DESCARGA_PRODUCTOS_ERROR, 
                payload: true
            })
        }
    
}

// const descargarProductos = () => ({
//     type: COMENZAR_DESCARGA_PRODUCTOS,
//     payload: true
// });

// const descargaProductosExitosa = productos => ({
//     type: DESCARGA_PRODUCTOS_EXITO,
//     payload: productos
// })
// const descargaProductosError = () => ({
//     type: DESCARGA_PRODUCTOS_ERROR, 
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
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});
const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
})
const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
});

// Colocar producto en edición
const obtenerProductoEditar= async producto => {
    // return (dispatch) => {
        dispatch( {
            type: OBTENER_PRODUCTO_EDITAR,
            payload: producto
        } );
    // 
}

const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

// Edita un registro en la api y state
const editarProductoAction= async (id,producto) => {
    // return async (dispatch) => {
        // dispatch( editarProducto() );

        try {
            console.log(id.id)
            console.log(producto)
            await clienteAxios.put(`/products/edit/${id.id}`, producto);   
            dispatch({
                type: PRODUCTO_EDITADO_EXITO,
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
                type: PRODUCTO_EDITADO_ERROR,
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
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
});

const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
})

const filtrarProductosAction = async name => {
    // console.log("se_ejecucta_desde_obtenerProductosAction")
    // dispatch({
    //     type: COMENZAR_DESCARGA_PRODUCTOS,
    //     payload: true
    // });

    try {
        console.log(name)
        const respuesta = await clienteAxios.post('/products/find',name);
        dispatch({
            type: DESCARGA_PRODUCTOS_EXITO,
            payload: respuesta.data
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: DESCARGA_PRODUCTOS_ERROR, 
            payload: true
        })
    }
}

const productoActual = async id => {
    try {
        const respuesta = await clienteAxios.get(`/products/${id}`);
        dispatch({
            type: PRODUCTO_SELECCIONADO_EXITO,
            payload: respuesta.data
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: PRODUCTO_SELECCIONADO_ERROR, 
            payload: true
        })
    }
}

const clearProductState = async () => {
    dispatch({
        type: LIMPIAR_PRODUCTOS
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
                type: PRODUCTO_EDITADO_EXITO,
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
                type: PRODUCTO_EDITADO_ERROR,
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

const filtrarArticulosAction = async datos => {
    try {
        console.log(datos)
        const respuesta = await clienteAxios.post('/articulos_provedores/quiz4/find',datos);
        dispatch({
            type: DESCARGA_ARTICULOS_EXITO,
            payload: respuesta.data
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: DESCARGA_ARTICULOS_ERROR, 
            payload: true
        })
    }
}
// const filtrarArticulosAction = async name => {
//     try {
//         console.log(name)
//         const respuesta = await clienteAxios.post('/articulos_provedores/quiz/find',name);
//         dispatch({
//             type: DESCARGA_ARTICULOS_EXITO,
//             payload: respuesta.data
//         })
//     } catch (error) {
//         console.log(error);
//         dispatch({
//             type: DESCARGA_ARTICULOS_ERROR, 
//             payload: true
//         })
//     }
// }

const ArticuloActual = async datos => {
    try {
        console.log("datos");
        console.log(datos);
        const respuesta = await clienteAxios.post(`/articulos_provedores/quiz/find`,datos);
        dispatch({
            type: ARTICULO_SELECCIONADO_EXITO,
            payload: respuesta.data
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: ARTICULO_SELECCIONADO_ERROR, 
            payload: true
        })
    }
}

const LimpiarArticulosAction = async id => {
        dispatch({
            type: LIMPIAR_ARTICULOS,
        })
}

const cambiarValores = async datos => {
    dispatch({
        type: DATOS_BUSQUEDA,
        payload: datos
    })
}

// Edita un registro en la api y state
const editarArticuloAction= async (id,producto) => {
    // return async (dispatch) => {
        // dispatch( editarProducto() );

        try {
            // console.log(id.id)
            // console.log(producto)
            await clienteAxios.put(`/articulos/edit/${id}`, producto);   
        //     dispatch({
        //         type: PRODUCTO_EDITADO_EXITO,
        //         payload: producto
        //    });

            // Alerta
            Swal.fire(
                'Correcto', 
                'El articulos se edito correctamente',
                'success'
            );
        } catch (error) {
            console.log(error);
            // si hay un error cambiar el state
            dispatch({
                type: PRODUCTO_EDITADO_ERROR,
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

const editarArticuloPorProvedorAction= async (id,producto) => {

        try {
            // console.log(id.id)
            console.log('hey')
            console.log(producto)
            await clienteAxios.put(`/articulos_provedores/edit/${id}`, producto);   
            Swal.fire(
                'Correcto', 
                'El articulos por provedor se edito correctamente',
                'success'
            );
        } catch (error) {
            console.log(error);
            // si hay un error cambiar el state
            dispatch({
                type: PRODUCTO_EDITADO_ERROR,
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
    <productContext.Provider
       value={{
        // initialState,   
           productos:state.productos,
           error:state.error,
           loading:state.loading,
           productoeditar:state.productoeditar,
           productoSeleccionado:state.productoSeleccionado,
           articulos:state.articulos,
           articuloSeleccionado:state.articuloSeleccionado,
           name:state.name,
           id_supplier:state.id_supplier,
           obtenerProductosAction,
           crearNuevoProductoAction,
           borrarProductoAction,
           obtenerProductoEditar,
           filtrarProductosAction,
           editarProductoAction,
           productoActual,
           clearProductState,
           cargarImagenProductoAction,
           filtrarArticulosAction,
           ArticuloActual,
           LimpiarArticulosAction,
           cambiarValores,
           editarArticuloAction,
           editarArticuloPorProvedorAction
       }}
    >{props.children}

    </productContext.Provider>
)

}

export default ProductState;