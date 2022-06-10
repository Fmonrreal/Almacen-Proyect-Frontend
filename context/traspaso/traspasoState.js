import traspasoReducer from './traspasoReducer';
import traspasoContext from './traspasoContext';
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
} from 'types'
import clienteAxios from 'config/axios';
import Swal from 'sweetalert2';
import {useReducer} from 'react';

const TraspasoState = props => {

const traspasoInitialState = {
//   cart: [{item2:{artprov_id_articulos_provedores:4,artgen_nombre:"prueba", artgen_descripcion: "pdt", artprov_precio_compra: 100,artprov_id_supplier:1},quantity: 2}],
  cart: [],
  art: [],
  error: null,
  loading: false,
  totalItems:null,
  CantidadTotal:null,
};



const [state,dispatch] = useReducer(traspasoReducer,traspasoInitialState)

// const AgregarProductoCarrito = async producto => {

//     try {
        
//         let newItem = producto
      
//         let itemInCart = state.cart.find((item) => item.id_articulos_provedores === newItem.id_articulos_provedores);
//         console.log(itemInCart);

//         dispatch({
//             type: ADD_TO_CART,
//             payload: {itemInCart,newItem}
//             // ,newItem
//         });

//         // Alerta
//         Swal.fire(
//             'Correcto', 
//             'El producto se agregó correctamente',
//             'success'
//         );

//     } catch (error) {
//         console.log(error);
//         // si hay un error cambiar el state
//         dispatch({
//             type: AGREGAR_PRODUCTO_CARRO_ERROR,
//             payload: true
//         });

//         // alerta de error
//         Swal.fire({
//             icon: 'error',
//             title: 'Hubo un error',
//             text: 'Hubo un error, intenta de nuevo'
//         })
//     }
// }

const CargarProductosIdVenta = async (id_pedidos) => {
    console.log("id_pedidos2",id_pedidos)

    try {
    
    const isComplete = await clienteAxios.post('/pedidos/getOne',{id_pedidos});

    if(isComplete.data.recibido == false){

    try {
        const respuesta = await clienteAxios.post('/detalles_pedidos/products',{id_pedidos});
        console.log("respuesta",respuesta)
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
} catch (error) {
    console.log(error);
    Swal.fire({
        icon: 'error',
        title: 'Hubo un error',
        text: 'Hubo un error, no hay compra con ese id'
    })
}
}

const EliminarUnProducto = async producto => {
    let itemToDelete = state.cart.find((item) => item.id_articulos_provedores === producto.id_articulos_provedores);
    dispatch({
        type: REMOVE_ONE_FROM_CART,
        payload: itemToDelete
    });

}

const EliminarTodosLosProductos = async id_articulos_provedores => {
    let itemToDelete2 = id_articulos_provedores;
    console.log(itemToDelete2)
    dispatch({
        type: REMOVE_ALL_FROM_CART,
        payload: itemToDelete2
    });

}

const AgregarUnProducto = async id_articulos_provedores => {
    dispatch({
        type: ADD_ONE_TO_CART,
        payload: id_articulos_provedores
    });
}

const ObtenerTotales = async => {
    let AmountQuantity= 0
    let AmountTotal = 0

    state.cart.map((item) =>
        (AmountQuantity += item.restantes,
        AmountTotal += item.restantes * item.precio_compra)
    )


    dispatch({
        type: GET_TOTAL,
        payload: {AmountQuantity,AmountTotal}
    });

}

const AgregarArticulosCarrito = async (producto,cantidad) => {
    // dispatch( agregarProducto() );

    try {
        
        let newItem = producto
      

        let itemInCart = state.cart.find((item) => item.id_articulos_provedores === newItem.id_articulos_provedores);
        console.log(cantidad);

        dispatch({
            type: ADD_MANY_TO_CART,
            payload: {itemInCart,newItem,cantidad}
            // ,newItem
        });

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


const GuardarCompra = async () => {

    try {
        const idx = await clienteAxios.post('/pedidos/save', {fecha,id_sucursales,id_usuarios:1});
        console.log("idx es igual",idx);
        let x;
        
        let mapeo = articulos.map(async item13 =>(
                x ={ ...item13,id_pedidos:idx.data.id_pedidos},
                console.log("x es igual",x),
                await clienteAxios.post('/detalles_pedidos', x )
                ),
        );


    
       dispatch({
            type: CLEAR_CART,
            // payload: traspasoInitialState
       });

        // Alerta
        Swal.fire(
            'Correcto', 
            'Se guardo la compra correctamente',
            'success'
        );

    } catch (error) {
        console.log(error);
        // si hay un error cambiar el state
        dispatch({
            type: AGREGAR_ORDEN_ID_ERROR,
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

const LimpiarCarrito = async  => {
    dispatch({
        type: CLEAR_CART,
    });
}

const GuardarInput = async (cart,id_sucursales) => {

    try {
        const idx = await clienteAxios.post('/almacen/AddQuantity', {cart,id_sucursales});
        const idy = await clienteAxios.put('/detalles_pedidos/update', {cart});

        if(idy.data.complete_pedido == 1){
            await clienteAxios.put(`/pedidos/edit/${idy.data.id_pedidos}`, {recibido:true});
        }
    
       dispatch({
            type: CLEAR_CART,
            // payload: traspasoInitialState
       });

        // Alerta
        Swal.fire(
            'Correcto', 
            'Se agrego el pedido a almacen',
            'success'
        );

    } catch (error) {
        console.log(error);
        // si hay un error cambiar el state
        dispatch({
            type: AGREGAR_ORDEN_ID_ERROR,
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

// const GuardarVenta = async (fecha,articulos,id_sucursales,id_clientes,cantidad) => {
//     // dispatch( agregarProducto() );

//     try {
//         // insertar en la API
//         // console.log(fecha);
//         const idx = await clienteAxios.post('/ventas/save', {fecha,id_sucursales,id_clientes,id_usuarios:1});
//         console.log("idx es igual",idx);
//         let x;
        
//         let mapeo = articulos.map(async item13 =>(
//                 x ={ ...item13,id_ventas:idx.data.id_ventas},
//                 console.log("x es igual",x),
//                 await clienteAxios.post('/detalles_ventas', x ),
//                 await clienteAxios.put(`/almacen/editQuantity/${item13.id_articulos_provedores}`,{cantidad:item13.cantidad})
//                 ),
//         );

        
    
//        dispatch({
//             type: CLEAR_CART,
//             // payload: traspasoInitialState
//        });

//         // Alerta
//         Swal.fire(
//             'Correcto', 
//             'Se guardo la compra correctamente',
//             'success'
//         );

//     } catch (error) {
//         console.log(error);
//         // si hay un error cambiar el state
//         dispatch({
//             type: AGREGAR_ORDEN_ID_ERROR,
//             payload: true
//         });

//         // alerta de error
//         Swal.fire({
//             icon: 'error',
//             title: 'Hubo un error',
//             text: 'Hubo un error, intenta de nuevo'
//         })
//     }
// }

return(
    <traspasoContext.Provider
       value={{
           cart:state.cart,
           error:state.error,
           loading:state.loading,
           totalItems:state.totalItems,
           CantidadTotal:state.CantidadTotal,
        //    AgregarProductoCarrito,
            CargarProductosIdVenta,
           EliminarUnProducto,
           EliminarTodosLosProductos,
           AgregarUnProducto,
           ObtenerTotales,
           AgregarArticulosCarrito,
           GuardarCompra,
           LimpiarCarrito,
           GuardarInput
        //    GuardarVenta
       }}
    >{props.children}

    </traspasoContext.Provider>
)
}

export default TraspasoState;