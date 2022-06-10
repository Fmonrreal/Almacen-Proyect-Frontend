import React, { Fragment, useEffect,useContext,useState } from 'react';
// import Producto from './Stock';
import Producto_Stock from './Producto_Stock';
import ReactPaginate from "react-paginate";
import StockContext from 'context/stock/stockContext';
import SucursalContext from 'context/sucursal/sucursalContext';
import Dropdown_right from './Dropdown_right';

const Paginate_Productos_Stock = (props) => {
    const stockContext = useContext(StockContext);
    const {obtenerProductosAction,filtrarProductosAction,productos,error,loading,clearProductState,status,cambiarEstadoAction} = stockContext;
    
    const sucursalContext = useContext(SucursalContext);
    const {sucursal_seleccionada} = sucursalContext;
    
    const [pageNumber, setPageNumber] = useState(0);
    const [name, guardarNombreBus] = useState('');
    const [statusFilter, guardarStatusFilter] = useState(0);

    let id_sucursales = sucursal_seleccionada.id_sucursales

    useEffect( ()=> {
        if(name===''){
            // obtenerProductosAction({statusFilter,id_sucursales})
            obtenerProductosAction({statusFilter,id_sucursales})
        }else{
            filtrarProductosAction({name,statusFilter,id_sucursales})
        } 
    }, [name,statusFilter,cambiarEstadoAction]);

    // const handleModalOnChange2 = (value) => {
    //     guardarstatusFilter(value)
    //   }

    const usersPerPage = 2;
    const pagesVisited = pageNumber * usersPerPage;
    // obtenerProductosAction();
    let longitudproductos = 0;
  
    const displayUsers = productos
      .slice(pagesVisited, pagesVisited + usersPerPage)
      .map(producto => (
            <Producto_Stock
                    key={producto.n_id_articulos}
                    producto={producto}
                    // handleModalOnChange={props.handleModalOnChange}
            />
            
        ));
    
  
    const pageCount = Math.ceil(productos.length / usersPerPage);
    // const pageCount = Math.ceil(longitudproductos / usersPerPage);
  
    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };
  
    return (
        <div className='row'>
           <div className='col-12'>
                <div className="container login-container">
                        <div className="row">
                            <div className="col-md-9 login-form-1">
                                    <div className="form-group">
                                        <button></button>
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
                            <div className="col-md-3">
                                    <Dropdown_right
                                            guardarStatusFilter={guardarStatusFilter}
                                    />
                            </div>
                        </div>
                    </div>

            

                { error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p> : null }
                
                { loading ? <p className="text-center">Cargando....</p> : null }

                <div className="App">
                    <table className="table table-striped">
                                <thead className="bg-primary table-dark">
                                        <tr>
                                            <th scope="col">Articulo</th>
                                            <th scope="col">Minimo</th>
                                            <th scope="col">Maximo</th>
                                            <th scope="col">Cantidad</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                </thead>
                                <tbody>
                                    {displayUsers}
                                </tbody>
                    </table>
                            <ReactPaginate
                                    previousLabel={"Previous"}
                                    nextLabel={"Next"}
                                    pageCount={pageCount}
                                    onPageChange={changePage}
                                    containerClassName={"paginationBttns"}
                                    previousLinkClassName={"previousBttn"}
                                    nextLinkClassName={"nextBttn"}
                                    disabledClassName={"paginationDisabled"}
                                    activeClassName={"paginationActive"}
                                    />
                </div>
            </div>
            
       </div>
    );

}
 
export default Paginate_Productos_Stock;