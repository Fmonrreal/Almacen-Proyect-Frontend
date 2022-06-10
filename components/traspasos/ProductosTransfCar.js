import React, { Fragment, useEffect,useContext,useState } from 'react';
import ComprasContext from 'context/compras/comprasContext';
import ProductContext from 'context/productos/productContext';
import ProductoTransf from  './ProductoTransf'

// Redux
// import { useSelector, useDispatch } from 'react-redux';
// import { obtenerProductosAction } from '../actions/productoActions';

const ProductosTransfCar = () => {

    const comprasContext = useContext(ComprasContext);
    const {cart,error,loading} = comprasContext;

    const productContext = useContext(ProductContext);
    const {LimpiarArticulosAction,cambiarValores,filtrarArticulosAction,name,id_supplier} = productContext;

    useEffect( ()=> {

        if(cart.length == 0){
            // setid_supplier(0),
            LimpiarArticulosAction()
        } 
        
    }, [cart]);


    return ( 
       <div className='row'>
           <div className='col-12'>

                { error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p> : null }
                
                { loading ? <p className="text-center">Cargando....</p> : null }

                <table summary="Articulos en esta compra" className="tabledim1">
                    <thead>
                        <tr>
                            <th scope="col">Articulo</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Subtotal</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className='productos'>
                        { cart.length === 0 ? 'No hay productos' : (
                            cart.map(producto => (
                                <ProductoTransf
                                        key={producto.item2.artprov_id_articulos_provedores}
                                        producto={producto}
                                />
                            ))
                        ) }
                    </tbody>
                </table>
            </div>
       </div>
     );
}
 
export default ProductosTransfCar;