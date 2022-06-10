import React, { Fragment, useEffect,useContext,useState } from 'react';
import Producto from './Producto';
import ProductContext from 'context/productos/productContext';

// Redux
// import { useSelector, useDispatch } from 'react-redux';
// import { obtenerProductosAction } from '../actions/productoActions';

const Productos = () => {

    const productContext = useContext(ProductContext);
    const {obtenerProductosAction,filtrarProductosAction,productos,error,loading,clearProductState} = productContext;
    
    const [name, guardarNombreBus] = useState('');

    


    useEffect( ()=> {

        // Consultar la api
        // const cargarProductos = () => ( obtenerProductosAction() );
        // console.log("se_ejecucta_desde_uSEEEFECT")

        // cargarProductos();
        // eslint-disable-next-line
        if(name===''){
            obtenerProductosAction()
        }else{
            filtrarProductosAction({name})
        } 
    }, [name]);

    // console.log("se_ejecucta_desde_Productos")
    // console.log(productos)
    // console.log(loading)
    // console.log(error)

    // obtener el state
    // const productos = useSelector( state => state.productos.productos );
    // const error = useSelector(state => state.productos.error);
    // const cargando = useSelector(state => state.productos.loading);

    return ( 
       <div className='row ponerAbajo'>
           <div className='col-12'>
                <h2 className="text-center my-5">Listado de Productos</h2>
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
                    </div>

            

                { error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p> : null }
                
                { loading ? <p className="text-center">Cargando....</p> : null }

                <table className="table table-striped">
                    <thead className="bg-primary table-dark">
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Acciones</th>
                            </tr>
                    </thead>
                    <tbody>
                        { productos.length === 0 ? 'No hay productos' : (
                            productos.map(producto => (
                                <Producto
                                        key={producto.id}
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
 
export default Productos;