import shoppingReducer from './shoppingReducer';
import shoppingContext from './shoppingContext';
import {
    ADD_TO_CART,
    REMOVE_ALL_FROM_CART,
    CLEAR_CART,
    REMOVE_ONE_FROM_CART,
    AGREGAR_PRODUCTO_CARRO_ERROR,
    ADD_ONE_TO_CART,
    GET_TOTAL
} from 'types'
import clienteAxios from 'config/axios';
import Swal from 'sweetalert2';
import {useReducer} from 'react';

const ShoppingState = props => {

const shoppingInitialState = {
  cart: [{item2:{ id: 2, name: "casco", precio: 100},quantity: 2}],
//   cart: [],
  itemInCart:null,
  newItem:"",
  item:"",
  error: null,
    loading: false,
    totalItems:null,
    CantidadTotal:null
};



const [state,dispatch] = useReducer(shoppingReducer,shoppingInitialState)

const AgregarProductoCarrito = async producto => {
    // dispatch( agregarProducto() );

    try {
        
        let newItem = producto
      

        let itemInCart = state.cart.find((item) => item.item2.id === newItem.id);
        console.log(itemInCart);

        dispatch({
            type: ADD_TO_CART,
            payload: {itemInCart,newItem}
            // ,newItem
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
            type: AGREGAR_PRODUCTO_CARRO_ERROR,
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

const EliminarUnProducto = async producto => {
    let itemToDelete = state.cart.find((item) => item.item2.id === producto.item2.id);
    dispatch({
        type: REMOVE_ONE_FROM_CART,
        payload: itemToDelete
    });

}

const EliminarTodosLosProductos = async id => {
    let itemToDelete2 = id;
    console.log(itemToDelete2)
    dispatch({
        type: REMOVE_ALL_FROM_CART,
        payload: itemToDelete2
    });

}

const AgregarUnProducto = async id => {
    dispatch({
        type: ADD_ONE_TO_CART,
        payload: id
    });

}

const ObtenerTotales = async => {
    let AmountQuantity= 0
    let AmountTotal = 0

    state.cart.map((item) =>
        (AmountQuantity += item.quantity,
        AmountTotal += item.quantity * item.item2.precio)
    )


    dispatch({
        type: GET_TOTAL,
        payload: {AmountQuantity,AmountTotal}
    });

}

return(
    <shoppingContext.Provider
       value={{
           products:state.products,
           cart:state.cart,
           error:state.error,
           loading:state.loading,
           itemInCart:state.itemInCart,
           newItem:state.newItem,
           totalItems:state.totalItems,
            CantidadTotal:state.CantidadTotal,
           AgregarProductoCarrito,
           EliminarUnProducto,
           EliminarTodosLosProductos,
           AgregarUnProducto,
           ObtenerTotales
       }}
    >{props.children}

    </shoppingContext.Provider>
)
}

export default ShoppingState;