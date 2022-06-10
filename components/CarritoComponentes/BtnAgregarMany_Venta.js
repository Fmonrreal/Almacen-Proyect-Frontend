import React,{useContext,useState} from 'react';
import ComprasContext from 'context/compras/comprasContext';
import ProductContext from 'context/productos/productContext';
import Swal from 'sweetalert2';

const BtnAgregarMany_Venta = () => {

    const comprasContext = useContext(ComprasContext);
    const {AgregarArticulosCarrito,cart} = comprasContext;

    const productContext = useContext(ProductContext);
    const {articuloSeleccionado} = productContext;

    const [cantidad, setcantidad] = useState(1)

    const x = cart.find(product => product.item2.artprov_id_articulos_provedores == articuloSeleccionado.artprov_id_articulos_provedores)

    // function idProductInCart(fruta) {
    //     return item2.artprov_id_articulos_provedores === 'cerezas';
    // }
    const AgregarItems = () => {
            if(x == null){
                if(articuloSeleccionado.sum != 0){
                    AgregarArticulosCarrito(articuloSeleccionado,cantidad)
                    setcantidad(1)
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un error',
                        text: 'Error, no hay mas articulos de este provedor, Es necesario solicitar mas'
                    })
                }
            }else{
                if(cantidad <= articuloSeleccionado.sum - x.quantity){
                    AgregarArticulosCarrito(articuloSeleccionado,cantidad)
                    setcantidad(1)
                }else{
                    Swal.fire({
                                icon: 'error',
                                title: 'Hubo un error',
                                text: 'Error, no hay mas articulos de este provedor, Es necesario solicitar mas'
                            })
                }
            }
    }

    const inputHandler = (dato) => {
        if(cart == []){
            if (Number(dato)> articuloSeleccionado.sum) {
            // e.preventDefault();
            return;
            }
            setcantidad(dato)
        }else{
            // const x = cart.find(product => product.item2.artprov_id_articulos_provedores == articuloSeleccionado.artprov_id_articulos_provedores)
            if(x == null){
                if (Number(dato)> articuloSeleccionado.sum) {
                    // e.preventDefault();
                    return;
                    }
                    setcantidad(dato)
            }else{
                if (Number(dato)> articuloSeleccionado.sum - x.quantity) {
                    // e.preventDefault();
                    return;
                    }
                    setcantidad(dato)
            }
        }
    };
    
    return ( 
        <div>
            <input id="numero" type="number" min="1" max={`${articuloSeleccionado.sum+1}`} pattern="^[0-9]+" onChange={e => inputHandler(e.target.value)} value={cantidad}>
            {/* <input id="numero" type="number" min="1" max={`${articuloSeleccionado.sum}`} pattern="^[0-9]+" onChange={e => setcantidad(e.target.value)} value={cantidad}> */}
            </input>
            <button 
                type="button"
                // onClick={ () => redireccionarEdicion(producto) }
                className="btn btn-outline-primary mr-2"
                onClick={()=>AgregarItems()}>
                    Agregar
            </button>
        </div>
     );
}
 
export default BtnAgregarMany_Venta;