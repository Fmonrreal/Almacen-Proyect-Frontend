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
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR,
    FILTRAR_PRODUCTOS_EXITO,
    FILTRAR_PRODUCTOS_ERROR,
    PRODUCTO_SELECCIONADO_ERROR,
    PRODUCTO_SELECCIONADO_EXITO,
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

// cada reducer tiene su propio state
// const initialState = {
//     productos: [],
//     error: null,
//     loading: false, 
//     productoeliminar: null,
//     productoeditar: null
// }

export default function(state = initialState, action) {
    switch(action.type) {
        case COMENZAR_DESCARGA_PRODUCTOS:
        case AGREGAR_PRODUCTO: 
            return {
                ...state,
                loading: action.payload
            }
        case AGREGAR_PRODUCTO_EXITO:
            return {
                ...state,
                loading: false,
                productos: [...state.productos, action.payload]
            }
        case AGREGAR_PRODUCTO_ERROR:
        case DESCARGA_PRODUCTOS_ERROR:
        case PRODUCTO_ELIMINADO_ERROR:
        case PRODUCTO_EDITADO_ERROR:
        case FILTRAR_PRODUCTOS_ERROR:
        case PRODUCTO_SELECCIONADO_ERROR:
        case DESCARGA_ARTICULOS_ERROR:
        case ARTICULO_SELECCIONADO_ERROR:

            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DESCARGA_PRODUCTOS_EXITO:
        case FILTRAR_PRODUCTOS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                productos: action.payload
            }
        case OBTENER_PRODUCTO_ELIMINAR:
            return {
                ...state,
                productoeliminar: action.payload
            }
        case PRODUCTO_ELIMINADO_EXITO:
            return {
                ...state,
                productos: state.productos.filter( producto => producto.id !== state.productoeliminar ),
                productoeliminar: null
            }
        case  OBTENER_PRODUCTO_EDITAR:
            return {
                ...state,
                productoeditar: action.payload
            }
        case PRODUCTO_EDITADO_EXITO:
            return {
                ...state,
                productoeditar: null,
                productos: state.productos.map( producto => 
                    producto.id === action.payload.id ? producto = action.payload : producto
                )
            }
        case  PRODUCTO_SELECCIONADO_EXITO:
            return {
                ...state,
                productoSeleccionado: action.payload
            }
        case LIMPIAR_PRODUCTOS:
                return {
                    ...state,
                    productoSeleccionado: "",
                    productos:[]
                }
        case DESCARGA_ARTICULOS_EXITO:
        case FILTRAR_ARTICULOS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                articulos: action.payload
            }
        case  ARTICULO_SELECCIONADO_EXITO:
            return {
                ...state,
                articuloSeleccionado: action.payload
            }
        case LIMPIAR_ARTICULOS:
            return {
                ...state,
                articuloSeleccionado: null,
                articulos:[]
            }
        case DATOS_BUSQUEDA:
            return {
                ...state,
                // name: action.payload.name,
                id_supplier:action.payload
            }
        default:
            return state;
    }
}
