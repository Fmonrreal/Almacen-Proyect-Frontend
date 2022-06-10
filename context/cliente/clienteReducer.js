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



export default function clienteReducer(state= initialState, action) {
    switch (action.type) {
      case DESCARGA_CLIENTES_ERROR:
      case CLIENTE_SELECCIONADO_ERROR:
      case DESCARGA_CLIENTES_STOCK_ERROR:
      case CLIENTE_EDITADO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
      case DESCARGA_CLIENTES_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                clientes: action.payload
            }
      case  CLIENTE_SELECCIONADO_EXITO:
        return {
            ...state,
            clienteSeleccionado: action.payload
        }
      case CLIENTE_ACTIONS_EXITO:
        return {
            ...state,
            cliente_action: action.payload
        }
      
      case CLIENTE_EDITADO_EXITO:
        return {
            ...state,
            cliente_action: null
        }
    
      default:
        return state;
    }
    
  }