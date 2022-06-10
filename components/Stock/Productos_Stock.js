import React, { Fragment, useEffect,useContext,useState } from 'react';
// import Producto from './Stock';
import Producto_Stock from './Producto_Stock';
import StockContext from 'context/stock/stockContext';

// Redux
// import { useSelector, useDispatch } from 'react-redux';
// import { obtenerProductosAction } from '../actions/productoActions';

const Productos_Stock = () => {

    const stockContext = useContext(StockContext);
    const {obtenerProductosAction,filtrarProductosAction,productos,error,loading,clearProductState} = stockContext;
    
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


    return ( 
       <div className='row ponerAbajo'>
           <div className='col-12'>
                <h2 className="text-center my-5">Listado de Productos en Stock</h2>
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
                    <thead className="bg-primary table-dark ">
                            <tr>
                                <th scope="col">Articulo</th>
                                <th scope="col">Minimo</th>
                                <th scope="col">Maximo</th>
                                <th scope="col">Cantidad</th>
                            </tr>
                    </thead>
                    <tbody>
                        { productos.length === 0 ? 'No hay productos' : (
                            productos.map(producto => (
                                <Producto_Stock
                                        key={producto.n_id_article}
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
 
export default Productos_Stock;