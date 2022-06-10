import React,{useContext} from 'react';
// import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import TrapasoContext from 'context/traspaso/traspasoContext';


const ProductoInput = ({producto}) => {
    const trapasoContext = useContext(TrapasoContext);
    const {AgregarUnProducto,EliminarUnProducto,EliminarTodosLosProductos,error,loading,AgregarArticulosCarrito} = trapasoContext;
    const { precio_compra,id_pedidos,id_articulos_provedores,nombre,cantidad,pendientes,restantes} = producto;

    const router = useRouter()

    // Confirmar si desea eliminarlo
    // const confirmarEliminarProducto = artprov_id_articulos_provedores => {

    //     // preguntar al usuario
    //     Swal.fire({
    //         title: '¿Estas seguro?',
    //         text: "Un producto que quieres eliminar",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Si, eliminar!!',
    //         cancelButtonText: 'Cancelar'
    //     }).then((result) => {
    //         if (result.value) {
    //             // pasarlo al action
    //             dispatch( borrarProductoAction(artprov_id_articulos_provedores) );
    //         }
    //     });
    // }

    // función que redirige de forma programada
    // const redireccionarEdicion = artprov_id_articulos_provedores => {
    //     obtenerProductoEditar(artprov_id_articulos_provedores);
    //     router.push('/updateProducto');
    // }

    // const seleccionProducto = artprov_id_articulos_provedores => {
    //     console.log(artprov_id_articulos_provedores)
    //     productoActual(artprov_id_articulos_provedores); // Fijar un producto
    // }

    // console.log("producto es igual a", producto)
    // const y = Number(producto.item2.sum)
    const y = Number(pendientes)

    const InputArticulos =(value) => {
        if(Number(value)<=Number(pendientes)){
            AgregarArticulosCarrito(producto,value); // Fijar un producto
        }
    }

    return ( 
        // <tr onClick={ () => seleccionProducto(id) }>
        <tr>
            <td><span className="font-weight-bold"> {nombre} </span></td>
            <td><span className="font-weight-bold"> {precio_compra} </span></td>
            {/* <td><span className="font-weight-bold"> {restantes} </span></td> */}
            <td><input id="numero" type="number" min="0" pattern="^[0-9]+" onChange={e => InputArticulos(e.target.value)} value={restantes} className="blackchar"/></td>
            <td><span className="font-weight-bold"> $ {precio_compra*restantes}</span></td>
            <td className="acciones">
                { y > restantes ?
                    <button 
                    type="button"
                    onClick={ () => AgregarUnProducto(id_articulos_provedores) }
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
                    onClick={() => EliminarTodosLosProductos(id_articulos_provedores)}
                >Eliminar </button>
            </td>
        </tr>
     );
}
 
export default ProductoInput;