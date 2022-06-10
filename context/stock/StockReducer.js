import {
    AGREGAR_PRODUCTO_STOCK,
    AGREGAR_PRODUCTO_STOCK_EXITO,
    AGREGAR_PRODUCTO_STOCK_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS_STOCK,
    DESCARGA_PRODUCTOS_STOCK_EXITO,
    DESCARGA_PRODUCTOS_STOCK_ERROR,
    OBTENER_PRODUCTO_STOCK_ELIMINAR,
    PRODUCTO_STOCK_ELIMINADO_EXITO,
    PRODUCTO_STOCK_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_STOCK_EDITAR,
    PRODUCTO_STOCK_EDITADO_EXITO,
    PRODUCTO_STOCK_EDITADO_ERROR,
    FILTRAR_PRODUCTOS_STOCK_EXITO,
    FILTRAR_PRODUCTOS_STOCK_ERROR,
    PRODUCTO_STOCK_SELECCIONADO_ERROR,
    PRODUCTO_STOCK_SELECCIONADO_EXITO,
    LIMPIAR_PRODUCTOS_STOCK,
    CAMBIAR_STATUS_STOCK,
    CAMBIO_MODAL,
    DESCARGA_PRODUCTOS_PROVEDOR_STOCK_EXITO,
    EDITAR_PRODUCTO_PROVEDOR
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
        case COMENZAR_DESCARGA_PRODUCTOS_STOCK:
        case AGREGAR_PRODUCTO_STOCK: 
            return {
                ...state,
                loading: action.payload
            }
        case AGREGAR_PRODUCTO_STOCK_EXITO:
            return {
                ...state,
                loading: false,
                productos: [...state.productos, action.payload]
            }
        case AGREGAR_PRODUCTO_STOCK_ERROR:
        case DESCARGA_PRODUCTOS_STOCK_ERROR:
        case PRODUCTO_STOCK_ELIMINADO_ERROR:
        case PRODUCTO_STOCK_EDITADO_ERROR:
        case FILTRAR_PRODUCTOS_STOCK_ERROR:
        case PRODUCTO_STOCK_SELECCIONADO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DESCARGA_PRODUCTOS_STOCK_EXITO:
        case FILTRAR_PRODUCTOS_STOCK_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                productos: action.payload
            }
        case OBTENER_PRODUCTO_STOCK_ELIMINAR:
            return {
                ...state,
                productoeliminar: action.payload
            }
        case PRODUCTO_STOCK_ELIMINADO_EXITO:
            return {
                ...state,
                productos: state.productos.filter( producto => producto.id !== state.productoeliminar ),
                productoeliminar: null
            }
        case  OBTENER_PRODUCTO_STOCK_EDITAR:
            return {
                ...state,
                productoeditar: action.payload
            }
        case PRODUCTO_STOCK_EDITADO_EXITO:
            return {
                ...state,
                productoeditar: null,
                productos: state.productos.map( producto => 
                    producto.id === action.payload.id ? producto = action.payload : producto
                )
            }
        case  PRODUCTO_STOCK_SELECCIONADO_EXITO:
            return {
                ...state,
                productoSeleccionado: action.payload
            }
        case LIMPIAR_PRODUCTOS_STOCK:
                return {
                    ...state,
                    productoSeleccionado: "",
                    productos:[]
                }
        case CAMBIAR_STATUS_STOCK:
            return{
                ...state,
                status: action.payload
            }
        case CAMBIO_MODAL:
            return{
                ...state,
                modal: action.payload
            }
        case DESCARGA_PRODUCTOS_PROVEDOR_STOCK_EXITO:
            return{
                ...state,
                articulosProvedor: action.payload
            }
        case EDITAR_PRODUCTO_PROVEDOR:
            return{
                ...state,
                articuloProvedorEditar: action.payload
            }
        default:
            return state;
    }
}
