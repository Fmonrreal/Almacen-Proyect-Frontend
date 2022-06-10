import React, { Fragment, useEffect,useContext,useState } from 'react';
// import Producto from './Stock';
import ReactPaginate from "react-paginate";
import StockContext from 'context/stock/stockContext';
import ProvedorContext from 'context/provedor/provedorContext';
import Provedor_Row from './Provedor_Row';

const Paginate_Provedores = (props) => {
    const provedorContext = useContext(ProvedorContext);
    // const {obtenerSucursalesAction,filtrarSucursalesAction,sucursales_Busq,error,loading,borrarSucursalAction} = provedorContext;
    const {obtenerprovedoresAction,borrarProvedorAction,provedores,error,loading} = provedorContext;
    
    const [pageNumber, setPageNumber] = useState(0);
    const [razon, guardarNombreBus] = useState('');
    // const [statusFilter, guardarStatusFilter] = useState(0);

    useEffect( ()=> {
        obtenerprovedoresAction({razon}) 
    }, [razon,borrarProvedorAction]);

    const usersPerPage = 2;
    const pagesVisited = pageNumber * usersPerPage;
  
    const displayUsers = provedores
      .slice(pagesVisited, pagesVisited + usersPerPage)
      .map(provedor => (
            <Provedor_Row
                    key={provedor.id_provedores}
                    provedor={provedor}
            />
            
        ));
    
  
    const pageCount = Math.ceil(provedores.length / usersPerPage);
  
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
                                            placeholder="Coloca el razon para busqueda"
                                            name="razon"
                                            value={razon}
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
                                            <th scope="col">Razon</th>
                                            <th scope="col">RFC</th>
                                            <th scope="col">Direccion</th>
                                            <th scope="col">sku</th>
                                            <th scope="col">Acciones</th>
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
 
export default Paginate_Provedores;