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
} from 'types';



export default function sucursalReducer(state= initialState, action) {
    switch (action.type) {
      case DESCARGA_SUCURSALES_STOCK_ERROR:
      case SUCURSAL_SELECCIONADA_ERROR:
      case SUCURSAL_EDITADA_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
      case DESCARGA_SUCURSALES_STOCK_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                sucursales: action.payload,
                sucursales_Busq: action.payload
            }
      case  SUCURSAL_SELECCIONADA_EXITO:
        return {
            ...state,
            sucursal_seleccionada: action.payload
        }
      case  SUCURSAL_TRANSFERIR_EXITO:
        return {
            ...state,
            sucursal_destino: action.payload
        }
      case DESCARGA_SUCURSALES_FILTER_EXITO:
        return {
            ...state,
            loading: false,
            error: null,
            sucursales_Busq: action.payload
        }
      case SUCURSAL_ACTIONS_EXITO:
        return {
            ...state,
            sucursal_actions: action.payload
        }
      
      case SUCURSAL_EDITADA_EXITO:
        return {
            ...state,
            sucursal_actions: null
        }
      
      default:
        return state;
    }
    
  }