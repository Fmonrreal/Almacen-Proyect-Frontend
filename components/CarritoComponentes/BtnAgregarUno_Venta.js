import React,{useContext} from 'react';
import ComprasContext from 'context/compras/comprasContext';
import ProductContext from 'context/productos/productContext';
import Swal from 'sweetalert2';

const BtnAgregarUno_Venta = ({articulo}) => {

    const comprasContext = useContext(ComprasContext)
    const {AgregarProductoCarrito,cart} = comprasContext;

    const productContext = useContext(ProductContext);
    const {articuloSeleccionado} = productContext;

    const x = cart.find(product => product.item2.artprov_id_articulos_provedores == articulo.artprov_id_articulos_provedores)

    const AgregarItem = (articulo) => {
        if(x == null){
            if(articulo.sum != 0){
                AgregarProductoCarrito(articulo)
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error',
                    text: 'Error, no hay mas articulos de este provedor, Es necesario solicitar mas'
                })
            }
        }else{
            if(1 <= articuloSeleccionado.sum - x.quantity){
                AgregarProductoCarrito(articulo)
            }else{
                Swal.fire({
                            icon: 'error',
                            title: 'Hubo un error',
                            text: 'Error, no hay mas articulos de este provedor, Es necesario solicitar mas'
                        })
            }
        }
}


    return ( 
        <button 
            type="button"
            // onClick={ () => redireccionarEdicion(producto) }
            className="btn btn-outline-primary mr-2"
            onClick={()=>AgregarItem(articulo)}>
        Agregar
        </button>
     );
}
 
export default BtnAgregarUno_Venta;