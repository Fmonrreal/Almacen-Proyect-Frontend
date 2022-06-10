import {
    ADD_TO_CART,
    REMOVE_ALL_FROM_CART,
    CLEAR_CART,
    REMOVE_ONE_FROM_CART,
    AGREGAR_PRODUCTO_CARRO_ERROR,
    ADD_ONE_TO_CART,
    GET_TOTAL,
    SELECCIONAR_PROVEDOR,
    ADD_MANY_TO_CART,
    AGREGAR_ORDEN_ID_ERROR,
    SOLICITUD_DESDE_STOCK,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR
} from 'types';



export default function traspasoReducer(state= initialState, action) {
    switch (action.type) {
      case REMOVE_ONE_FROM_CART: {
        
        return (action.payload.restantes > 1)
          ? {
              ...state,
              cart: state.cart.map((item) =>
              item.id_articulos_provedores === action.payload.id_articulos_provedores
                  ? { ...item, restantes: item.restantes - 1 }
                  : item
                  // : console.log("hey")
                  // item
              ),
            }
          : {
              ...state,
              cart: state.cart.filter((item) => item.id_articulos_provedores !== action.payload.id_articulos_provedores),
            };
      }
      case REMOVE_ALL_FROM_CART: {
        return {
          ...state,
          cart: state.cart.filter((item) => item.id_articulos_provedores !== action.payload),
        };
      }
      // case REMOVE_ALL_FROM_CART: {
      //   return {
      //     ...state,
      //     cart: [...state.cart, {item2:action.payload.newItem, cantidad: 1 }],
      //     // cart: state.cart.filter(item.item2.id !== action.payload.item2.id),
      //   };
      // }
      case CLEAR_CART:
        return {
          ...state,
          cart:[],
          art:[]
        };
      

      case ADD_ONE_TO_CART:
        return {
          ...state,
          cart: state.cart.map((item) =>
              item.id_articulos_provedores === action.payload
                  ? { ...item, restantes: item.restantes + 1 }
                  : item
            )
        };

      case GET_TOTAL:
        return{
          ...state,
          totalItems:action.payload.AmountQuantity,
          CantidadTotal:action.payload.AmountTotal
        }
      case ADD_MANY_TO_CART: 
        return (Number(action.payload.cantidad) >= 1)
        ?
        {
          ...state,
          cart: state.cart.map((item) =>
            item.id_articulos_provedores === action.payload.newItem.id_articulos_provedores
            ?{...item,restantes: Number(action.payload.cantidad)}
            : item
        )
        }
        :
        {
          ...state,
          cart: state.cart.filter((item) => item.id_articulos_provedores !== action.payload.newItem.id_articulos_provedores),
        };

        case DESCARGA_PRODUCTOS_EXITO:
          return {
              ...state,
              loading: false,
              error: null,
              art: action.payload,
              cart: action.payload
          }
        case DESCARGA_PRODUCTOS_ERROR:
          return {
              ...state,
              loading: false,
              error: action.payload
          }
      default:
        return state;
    }
    
  }