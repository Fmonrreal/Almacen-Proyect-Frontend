import React,{useContext} from 'react';
// import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import ComprasContext from 'context/compras/comprasContext';


const ProductoTransf = ({producto}) => {
    const comprasContext = useContext(ComprasContext);
    const {cart,error,loading,EliminarUnProducto,EliminarTodosLosProductos,AgregarUnProducto} = comprasContext;
    const { item2,quantity } = producto;
    const { artprov_id_articulos_provedores,artgen_nombre,artprov_precio_compra,artgen_descripcion} = item2;
    let total =  artprov_precio_compra*quantity;

    const router = useRouter()

    // const dispatch = useDispatch();
    // const history = useHistory(); // habilitar history para redirección

    // Confirmar si desea eliminarlo
    const confirmarEliminarProducto = artprov_id_articulos_provedores => {

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
                dispatch( borrarProductoAction(artprov_id_articulos_provedores) );
            }
        });
    }

    // función que redirige de forma programada
    const redireccionarEdicion = artprov_id_articulos_provedores => {
        obtenerProductoEditar(artprov_id_articulos_provedores);
        router.push('/updateProducto');
    }

    const seleccionProducto = artprov_id_articulos_provedores => {
        console.log(artprov_id_articulos_provedores)
        productoActual(artprov_id_articulos_provedores); // Fijar un producto
    }

    console.log("producto es igual a", producto)
    // const x = cart.find(product => product.item2.artprov_id_articulos_provedores == producto.artprov_id_articulos_provedores)
    const y = Number(producto.item2.sum)

    return ( 
        // <tr onClick={ () => seleccionProducto(id) }>
        <tr>
            <td><span className="font-weight-bold"> {artgen_nombre} </span></td>
            <td><span className="font-weight-bold"> {artprov_precio_compra} </span></td>
            <td><span className="font-weight-bold"> {quantity} </span></td>
            <td><span className="font-weight-bold"> $ {artprov_precio_compra*quantity}</span></td>
            <td className="acciones">
                { y > quantity ?
                    <button 
                    type="button"
                    onClick={ () => AgregarUnProducto(artprov_id_articulos_provedores) }
                    className="btn btn-outline-primary mr-2">
                     + 
                    </button>
                 :
                null
                }
                
                <button 
                    type="button"
                    onClick={ () => EliminarUnProducto(producto) }
                    className="btn btn-outline-primary mr-2">
                     - 
                </button>
                <button 
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => EliminarTodosLosProductos(artprov_id_articulos_provedores)}
                >Eliminar </button>
            </td>
        </tr>
     );
}
 
export default ProductoTransf;