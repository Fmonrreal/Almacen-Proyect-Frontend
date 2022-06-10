import React,{useContext} from 'react';
// import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import ShoppingContext from 'context/shopping/shoppingContext';


const ProductoCarrito = ({producto}) => {
    const shoppingContext = useContext(ShoppingContext);
    const {cart,error,loading,EliminarUnProducto,EliminarTodosLosProductos,AgregarUnProducto} = shoppingContext;
    const { item2,quantity } = producto;
    const { id,precio,name } = item2;
    let total =  precio*quantity;

    const router = useRouter()

    // const dispatch = useDispatch();
    // const history = useHistory(); // habilitar history para redirección

    // Confirmar si desea eliminarlo
    const confirmarEliminarProducto = id => {

        // preguntar al usuario
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Un producto que quieres eliminar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                // pasarlo al action
                dispatch( borrarProductoAction(id) );
            }
        });
    }

    // función que redirige de forma programada
    const redireccionarEdicion = producto => {
        obtenerProductoEditar(producto);
        router.push('/updateProducto');
    }

    const seleccionProducto = id => {
        console.log(id)
        productoActual(id); // Fijar un producto
    }

    return ( 
        // <tr onClick={ () => seleccionProducto(id) }>
        <tr>
            <td>{name}</td>
            <td><span className="font-weight-bold"> $ {precio} </span></td>
            <td><span className="font-weight-bold"> {quantity} </span></td>
            <td><span className="font-weight-bold"> $ {precio*quantity}</span></td>
            <td><span className="font-weight-bold"> $ 0 </span></td>
            <td><span className="font-weight-bold"> $ 0 </span></td>
            <td className="acciones">
                <button 
                    type="button"
                    onClick={ () => AgregarUnProducto(id) }
                    className="btn btn-outline-primary mr-2">
                     + 
                </button>
                <button 
                    type="button"
                    onClick={ () => EliminarUnProducto(producto) }
                    className="btn btn-outline-primary mr-2">
                     - 
                </button>
                <button 
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => EliminarTodosLosProductos(id)}
                >Eliminar </button>
            </td>
        </tr>
     );
}
 
export default ProductoCarrito;