import React, { Fragment, useEffect,useContext,useState } from 'react';
import ShoppingContext from 'context/shopping/shoppingContext';
import ProductoCarrito from './ProductoCarrito';

// Redux
// import { useSelector, useDispatch } from 'react-redux';
// import { obtenerProductosAction } from '../actions/productoActions';

const ProductosCarrito = () => {

    const shoppingContext = useContext(ShoppingContext);
    const {cart,error,loading} = shoppingContext;
    
    const [name, guardarNombreBus] = useState('');

    


    useEffect( ()=> {

        // if(name===''){
        //     obtenerProductosAction()
        // }else{
        //     filtrarProductosAction({name})
        // } 
    }, [cart]);


    return ( 
       <div className='row'>
           <div className='col-12'>
                {/* <h2 className="text-center my-5">Listado de Productos</h2>
                <div className="container login-container">
                        <div className="row">
                            <div className="col-md-12 login-form-1">
                                    <div className="form-group">
                                        <button><i class="bi bi-search"></i></button>
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
                    </div> */}

            

                { error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p> : null }
                
                { loading ? <p className="text-center">Cargando....</p> : null }

                <table summary="Articulos en esta compra" className="tabledim">
                    {/* <thead className="bg-primary table-dark">
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Acciones</th>
                            </tr>
                    </thead> */}
                    <thead>
                        <tr className='encabezado'>
                        <th scope="col">Articulo</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Cant.</th>
                        <th scope="col">Subtotal</th>
                        <th scope="col">Descuento</th>
                        <th scope="col">Importe</th>
                        <th scope="col">Accion</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        { cart.length === 0 ? 'No hay productos' : (
                            cart.map(producto => (
                                <ProductoCarrito
                                        key={cart.id}
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
 
export default ProductosCarrito;