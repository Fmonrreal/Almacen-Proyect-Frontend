import React,{useContext} from 'react';
// import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import ProductContext from 'context/productos/productContext';
import shoppingContext from 'context/shopping/shoppingContext';


// Redux
// import { useDispatch } from 'react-redux';
// import { borrarProductoAction, obtenerProductoEditar } from '../actions/productoActions';

const Producto = ({producto}) => {

    const productContext = useContext(ProductContext);
    const {productoActual,filtrarProductosAction,productos,error,loading} = productContext;
    
    const ShoppingContext = useContext(shoppingContext)
    const {AgregarProductoCarrito} = ShoppingContext;

    const { name, precio, id } = producto;

    const router = useRouter()

    
    const addToCart = (id) => {
        //console.log(id);
        dispatch({ type: TYPES.ADD_TO_CART, payload: id });
      };
   

    const seleccionProducto = id => {
        // console.log(id)
        productoActual(id); // Fijar un producto
    }

    return ( 
        <div >
                {/* <div className='cuadros'> */}
                <div className='cuadros' onClick={ () => seleccionProducto(id) }>
                    <span>{name}</span>
                    <span className="font-weight-bold"> $ {precio} </span>
                    <button 
                        type="button"
                        // onClick={ () => redireccionarEdicion(producto) }
                        className="btn btn-outline-primary mr-2"
                        onClick={()=>AgregarProductoCarrito(producto)}>
                    Agregar
                    </button>
                </div>
        </div>
        
     );
}
 
export default Producto;