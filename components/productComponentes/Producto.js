import React,{useContext} from 'react';
// import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import ProductContext from 'context/productos/productContext';


// Redux
// import { useDispatch } from 'react-redux';
// import { borrarProductoAction, obtenerProductoEditar } from '../actions/productoActions';

const Producto = ({producto}) => {
    const productContext = useContext(ProductContext);
    const {borrarProductoAction,productoActual,obtenerProductoEditar} = productContext;
    const { name, precio, id } = producto;

    const router = useRouter()

    // const dispatch = useDispatch();
    // const history = useHistory(); // habilitar history para redirección

    // Confirmar si desea eliminarlo
    const confirmarEliminarProducto = id => {

        // preguntar al usuario
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Un producto que se elimina no se puede recuperar",
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
        <tr onClick={ () => seleccionProducto(id) }>
            <td>{name}</td>
            <td><span className="font-weight-bold"> $ {precio} </span></td>
            <td className="acciones">
                <button 
                    type="button"
                    onClick={ () => redireccionarEdicion(producto) }
                    className="btn btn-outline-primary mr-2">
                    Editar
                </button>
                <button 
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => confirmarEliminarProducto(id)}
                >Eliminar </button>
            </td>
        </tr>
     );
}
 
export default Producto;