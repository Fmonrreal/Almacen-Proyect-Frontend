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



export default function provedorReducer(state= initialState, action) {
    switch (action.type) {
      case DESCARGA_PROVEDORES_ERROR:
      case PROVEDOR_SELECCIONADO_ERROR:
      case DESCARGA_PROVEDORES_STOCK_ERROR:
      case PROVEDOR_EDITADO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
      case DESCARGA_PROVEDORES_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                provedores: action.payload
            }
      case  PROVEDOR_SELECCIONADO_EXITO:
        return {
            ...state,
            provedorSeleccionado: action.payload
        }
      case PROVEDOR_ACTIONS_EXITO:
        return {
            ...state,
            provedor_action: action.payload
        }
      
      case PROVEDOR_EDITADO_EXITO:
        return {
            ...state,
            provedor_action: null
        }
    
      default:
        return state;
    }
    
  }