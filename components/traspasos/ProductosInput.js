import React, { Fragment, useEffect,useContext,useState } from 'react';
import TrapasoContext from 'context/traspaso/traspasoContext';
import ProductoInput from './ProductoInput';

const ProductosInput = () => {

    const trapasoContext = useContext(TrapasoContext);
    const {cart,error,loading} = trapasoContext;

    // useEffect( ()=> {

    //     if(cart.length == 0){
    //         // setid_supplier(0),
    //         LimpiarArticulosAction()
    //     } 
        
    // }, [cart]);


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
                                <ProductoInput
                                        key={producto.id_detalles_pedidos}
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
 
export default ProductosInput;