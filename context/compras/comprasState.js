import comprasReducer from './comprasReducer';
import comprasContext from './comprasContext';
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
    SOLICITUD_DESDE_STOCK
} from 'types'
import clienteAxios from 'config/axios';
import Swal from 'sweetalert2';
import {useReducer} from 'react';

const ComprasState = props => {

const comprasInitialState = {
//   cart: [{item2:{artprov_id_articulos_provedores:4,artgen_nombre:"prueba", artgen_descripcion: "pdt", artprov_precio_compra: 100,artprov_id_supplier:1},quantity: 2}],
  cart: [],
//   cart: [],
  itemInCart:null,
  newItem:"",
  item:"",
  error: null,
  loading: false,
  totalItems:null,
  CantidadTotal:null,
  proveedor:null,
  nombreProducto:null,
  SolicitudDesdeStock:false,
  cartInput: []
};



const [state,dispatch] = useReducer(comprasReducer,comprasInitialState)

const AgregarProductoCarrito = async producto => {
    // dispatch( agregarProducto() );

    try {
        
        let newItem = producto
      

        let itemInCart = state.cart.find((item) => item.item2.artprov_id_articulos_provedores === newItem.artprov_id_articulos_provedores);
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
    let itemToDelete = state.cart.find((item) => item.item2.artprov_id_articulos_provedores === producto.item2.artprov_id_articulos_provedores);
    dispatch({
        type: REMOVE_ONE_FROM_CART,
        payload: itemToDelete
    });

}

const EliminarTodosLosProductos = async artprov_id_articulos_provedores => {
    let itemToDelete2 = artprov_id_articulos_provedores;
    console.log(itemToDelete2)
    dispatch({
        type: REMOVE_ALL_FROM_CART,
        payload: itemToDelete2
    });

}

const AgregarUnProducto = async artprov_id_articulos_provedores => {
    dispatch({
        type: ADD_ONE_TO_CART,
        payload: artprov_id_articulos_provedores
    });

}

const ObtenerTotales = async => {
    let AmountQuantity= 0
    let AmountTotal = 0

    state.cart.map((item) =>
        (AmountQuantity += item.quantity,
        AmountTotal += item.quantity * item.item2.artprov_precio_compra)
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
      

        let itemInCart = state.cart.find((item) => item.item2.artprov_id_articulos_provedores === newItem.artprov_id_articulos_provedores);
        console.log(cantidad);

        dispatch({
            type: ADD_MANY_TO_CART,
            payload: {itemInCart,newItem,cantidad}
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

const GuardarIdCompra = async fecha => {
    // dispatch( agregarProducto() );

    try {
        // insertar en la API
        console.log(fecha);
        await clienteAxios.post('/pedidos/save', fecha);

        // Si todo sale bien, actualizar el state
    //    dispatch({
    //         type: AGREGAR_PRODUCTO_EXITO,
    //         payload: producto
    //    });

        // Alerta
        Swal.fire(
            'Correcto', 
            'El id en compras se agregó correctamente',
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

const GuardarCompra = async (fecha,articulos,id_sucursales,total) => {
    // dispatch( agregarProducto() );

    try {
        // insertar en la API
        // console.log(fecha);
        const idx = await clienteAxios.post('/pedidos/save', {fecha,id_sucursales,id_usuarios:1,total,recibido:0});
        console.log("idx es igual",idx);
        let x;
        
        let mapeo = articulos.map(async item13 =>(
                x ={ ...item13,id_pedidos:idx.data.id_pedidos,recibido:0},
                console.log("x es igual",x),
                await clienteAxios.post('/detalles_pedidos', x )
                ),
        );


    
       dispatch({
            type: CLEAR_CART,
            // payload: comprasInitialState
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

const SeleccionarProvedor = async provedor => {
    dispatch({
        type: SELECCIONAR_PROVEDOR,
        payload: provedor
    });

}

const SolicitudStock = async (producto,estado )=> {
    dispatch({
        type: SOLICITUD_DESDE_STOCK,
        payload: {producto,estado}
    });

}

const LimpiarCarrito = async  => {
    dispatch({
        type: CLEAR_CART,
    });

}

const GuardarVenta = async (fecha,articulos,id_sucursales,id_clientes,cantidad) => {
    // dispatch( agregarProducto() );

    try {
        // insertar en la API
        // console.log(fecha);
        const idx = await clienteAxios.post('/ventas/save', {fecha,id_sucursales,id_clientes,id_usuarios:1});
        console.log("idx es igual",idx);
        let x;
        
        let mapeo = articulos.map(async item13 =>(
                x ={ ...item13,id_ventas:idx.data.id_ventas},
                console.log("x es igual",x),
                await clienteAxios.post('/detalles_ventas', x ),
                await clienteAxios.put(`/almacen/editQuantity/${item13.id_articulos_provedores}`,{cantidad:item13.cantidad})
                ),
        );

        
    
       dispatch({
            type: CLEAR_CART,
            // payload: comprasInitialState
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

const GuardarTransferencia = async (articulos,sucursal_inicial,sucursal_final) => {
    // dispatch( agregarProducto() );

    try {

        // const idx = await clienteAxios.post('/ventas/save', {fecha,id_sucursales,id_clientes,id_usuarios:1});
        // console.log("idx es igual",idx);
        let x;
        
        let mapeo = articulos.map(async item13 =>(
                // x ={ ...item13,id_ventas:idx.data.id_ventas},
                // console.log("x es igual",x),
                // await clienteAxios.post('/detalles_ventas', x ),
                await clienteAxios.put(`/almacen/transferQuantity/${item13.id_articulos_provedores}`,{cantidad:item13.cantidad,sucursal_inicial,sucursal_final})
                ),
        );

        
    
       dispatch({
            type: CLEAR_CART,
            // payload: comprasInitialState
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

return(
    <comprasContext.Provider
       value={{
           products:state.products,
           cart:state.cart,
           error:state.error,
           loading:state.loading,
           itemInCart:state.itemInCart,
           newItem:state.newItem,
           totalItems:state.totalItems,
           CantidadTotal:state.CantidadTotal,
           proveedor:state.proveedor,
           nombreProducto:state.nombreProducto,
           SolicitudDesdeStock:state.SolicitudDesdeStock,
           cartInput:state.cartInput,
           AgregarProductoCarrito,
           EliminarUnProducto,
           EliminarTodosLosProductos,
           AgregarUnProducto,
           ObtenerTotales,
           AgregarArticulosCarrito,
           SeleccionarProvedor,
           GuardarIdCompra,
           GuardarCompra,
           SolicitudStock,
           LimpiarCarrito,
           GuardarVenta,
           GuardarTransferencia
       }}
    >{props.children}

    </comprasContext.Provider>
)
}

export default ComprasState;