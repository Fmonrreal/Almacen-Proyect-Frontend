import React, { Fragment, useEffect,useContext,useState } from 'react';
import ProductoShopping from './ProductoShopping';
import ProductContext from 'context/productos/productContext';
import ProductoSeleccionado from "components/productComponentes/ProductoSeleccionado";

// Redux
// import { useSelector, useDispatch } from 'react-redux';
// import { obtenerProductosAction } from '../actions/productoActions';

const ProductosShopping = () => {

    const productContext = useContext(ProductContext);
    const {productoSeleccionado,filtrarProductosAction,productos,error,loading,clearProductState} = productContext;
    
    // clearProductState();

    const [name, guardarNombreBus] = useState('');

    let mostrarproductoActual =  false;

    useEffect( ()=> {

        // if(productoActual===""){
        //     mostrarproductoActual = false;
        // }else{
        //     mostrarproductoActual = true;
        // }

    }, [productoSeleccionado]);

    

    return ( 
       <div className='row'>
           <div className='col-12'>
                <div className="container login-container">
                        <div className="row">
                            <div className="col-md-12 login-form-1">
                                    <div className="form-group">
                                        <button 
                                            onClick={() => filtrarProductosAction({name})}>O</button>
                                        <input 
                                            type="text"
                                            className="form-control"
                                            placeholder="Coloca el nombre para busqueda"
                                            name="name"
                                            value={name}
                                            onChange={e => guardarNombreBus(e.target.value)}
                                        />
                                    </div>
                            </div>
                        </div>
                    </div>

            

                
                  
            </div>
            <div className='row'>
                <div className='col'>
                    <div><button onClick={() => guardarNombreBus("casco")}>casco</button></div>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                        { error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p> : null }
                
                         { loading ? <p className="text-center">Cargando....</p> : null }

                        { productos.length === 0 ? 'No hay productos' : (
                            productos.map(producto => (
                                <ProductoShopping
                                        key={producto.id}
                                        producto={producto}
                                />
                            ))
                        ) }
                </div>
                {productoSeleccionado !== "" ?
                    <div className='col'>
                     <ProductoSeleccionado/>
                    </div>
                :null
                }
            </div>
       </div>
     );
}
 
export default ProductosShopping;