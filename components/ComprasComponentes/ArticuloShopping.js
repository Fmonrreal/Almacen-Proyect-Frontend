import React,{useContext} from 'react';
// import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import ProductContext from 'context/productos/productContext';
import ComprasContext from 'context/compras/comprasContext';


// Redux
// import { useDispatch } from 'react-redux';
// import { borrarProductoAction, obtenerProductoEditar } from '../actions/productoActions';

const ArticuloShopping = ({articulo}) => {

    const productContext = useContext(ProductContext);
    const {ArticuloActual,filtrarArticulosAction,articulos,error,loading} = productContext;
    
    const comprasContext = useContext(ComprasContext)
    const {AgregarProductoCarrito} = comprasContext;

    const { artgen_nombre,artprov_descripcion,artprov_precio_compra, artprov_id_articulos_provedores,artgen_productImage,sum,artprov_id_supplier,surc_id_sucursales } = articulo;

    const router = useRouter()

    
    // const addToCart = (id) => {
    //     //console.log(id);
    //     dispatch({ type: TYPES.ADD_TO_CART, payload: id });
    //   };
   

    const seleccionProducto = id => {
        // console.log(id)
        // console.log(id)
        const id_articulos_provedores = id
        const id_sucursales = surc_id_sucursales;
        ArticuloActual({id_articulos_provedores,id_sucursales}); // Fijar un producto
    }

    return ( 
        <div >
                <div className='cuadros' onClick={ () => seleccionProducto(artprov_id_articulos_provedores) }>
                {/* <div className='cuadros'> */}
                    <div className='row'>
                        <div className="col-4">
                        { artgen_productImage == null ? null :
                             <img 
                             src={`${artgen_productImage}`}
                
                             alt="new"
                             />
                        }
                       
                        </div>
                        <div className="col-8">
                            <span>{artgen_nombre}</span>
                            <span>{artprov_descripcion}</span>
                            <div>
                                <span>En inventario</span>
                                <span className="font-weight-bold"> {sum} </span>
                                <span>Precio</span>
                                <span className="font-weight-bold"> $ {artprov_precio_compra} </span>
                            </div>
                            
                            <button 
                                type="button"
                                // onClick={ () => redireccionarEdicion(producto) }
                                className="btn btn-outline-primary mr-2"
                                onClick={()=>AgregarProductoCarrito(articulo)}>
                            Agregar
                            </button>
                        </div>
                    </div>
                </div>
        </div>
        
     );
}
 
export default ArticuloShopping;