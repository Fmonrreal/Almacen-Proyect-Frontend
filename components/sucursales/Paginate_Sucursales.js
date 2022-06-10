import React, { Fragment, useEffect,useContext,useState,useCallback } from 'react';
// import Producto from './Stock';
import ReactPaginate from "react-paginate";
import StockContext from 'context/stock/stockContext';
import SucursalContext from 'context/sucursal/sucursalContext';
import Sucursal_Row from './Sucursal_Row';

const Paginate_Sucursales = (props) => {
    const sucursalContext = useContext(SucursalContext);
    const {obtenerSucursalesAction,filtrarSucursalesAction,sucursales_Busq,error,loading,borrarSucursalAction} = sucursalContext;
    
    const [pageNumber, setPageNumber] = useState(0);
    const [name, guardarNombreBus] = useState('');
    const [statusFilter, guardarStatusFilter] = useState(0);


    // const innerFunction = useCallback(() =>
    //         obtenerSucursalesAction()
    // ),[name,sucursales_Busq])

    // useEffect( ()=> {
    //     if(name===''){
    //         innerFunction();
    //     }else{
    //         filtrarSucursalesAction({name})
    //     } 
    // }, [innerFunction]);

    useEffect( ()=> {
        if(name===''){
            obtenerSucursalesAction()
        }else{
            filtrarSucursalesAction({name})
        } 
    }, [name,sucursales_Busq,borrarSucursalAction]);

    const usersPerPage = 2;
    const pagesVisited = pageNumber * usersPerPage;
  
    const displayUsers = sucursales_Busq
      .slice(pagesVisited, pagesVisited + usersPerPage)
      .map(sucursal => (
            <Sucursal_Row
                    key={sucursal.id_sucursales}
                    sucursal={sucursal}
            />
            
        ));
    
  
    const pageCount = Math.ceil(sucursales_Busq.length / usersPerPage);
  
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
                            </div>
                        </div>
                    </div>

            

                { error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p> : null }
                
                { loading ? <p className="text-center">Cargando....</p> : null }

                <div className="App">
                    <table className="table table-striped">
                                <thead className="bg-primary table-dark">
                                        <tr>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Direccion</th>
                                            <th scope="col">telefono</th>
                                            <th scope="col">acciones</th>
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
 
export default Paginate_Sucursales;