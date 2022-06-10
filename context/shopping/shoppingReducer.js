import {
    ADD_TO_CART,
    REMOVE_ALL_FROM_CART,
    CLEAR_CART,
    REMOVE_ONE_FROM_CART,
    AGREGAR_PRODUCTO_CARRO_ERROR,
    ADD_ONE_TO_CART,
    GET_TOTAL
} from 'types';



export default function shoppingReducer(state= initialState, action) {
    switch (action.type) {
      case ADD_TO_CART: {
        return (action.payload.itemInCart!=null)
          ? 
          {
              ...state,
              cart: state.cart.map((item) =>
                item.item2.id === action.payload.newItem.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
                  // item
              ),
              itemInCart:"",
              
            }
            
          : {
              
              ...state,
              cart: [...state.cart, {item2:action.payload.newItem, quantity: 1 }],
              // cart: [...state.cart, {item:action.payload.newItem, quantity: 1 }],
              // cart: [...state.cart, {item:action.payload.newItem}],

            };
            console.log(cart);
      }
      case REMOVE_ONE_FROM_CART: {
        
        return (action.payload.quantity > 1)
          ? {
              ...state,
              cart: state.cart.map((item) =>
              item.item2.id === action.payload.item2.id
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
                  // : console.log("hey")
                  // item
              ),
            }
          : {
              ...state,
              cart: state.cart.filter((item) => item.item2.id !== action.payload.item2.id),
            };
      }
      case REMOVE_ALL_FROM_CART: {
        return {
          ...state,
          cart: state.cart.filter((item) => item.item2.id !== action.payload),
          // cart: state.cart.filter(item.item2.id !== action.payload.item2.id),
        };
      }
      // case REMOVE_ALL_FROM_CART: {
      //   return {
      //     ...state,
      //     cart: [...state.cart, {item2:action.payload.newItem, quantity: 1 }],
      //     // cart: state.cart.filter(item.item2.id !== action.payload.item2.id),
      //   };
      // }
      case CLEAR_CART:{
        return shoppingInitialState;
      }

      case ADD_ONE_TO_CART:
        return {
          ...state,
          cart: state.cart.map((item) =>
              item.item2.id === action.payload
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
            )
          // cart: state.cart.filter(item.item2.id !== action.payload.item2.id),
        };

        case GET_TOTAL:
          return{
            ...state,
            totalItems:action.payload.AmountQuantity,
            CantidadTotal:action.payload.AmountTotal
          }
      default:
        return state;
    }
    
  }